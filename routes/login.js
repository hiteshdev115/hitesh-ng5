
var connection = require('./db.js');
var jwt = require('jsonwebtoken');
var appRoot = require('app-root-path');
var fs = require('fs');

exports.main = function(req, res)
{
    //console.log('In Get User Details');
    connection.query('SELECT * FROM user',function(err,rows)     
    {
        var resultData = JSON.stringify({'success': true, 'data': rows});
        res.send(resultData);
    });    
};

exports.saveUser = function(req, res)
{
    console.log("In save user");
    //console.log(req.file.filename);
    
    var input = JSON.parse(JSON.stringify(req.body));
	var header = '';
    var token = '';
    var secretKey = '';
    if(req.headers.authorization){
        var header = req.headers.authorization.split(' ');
        //console.log(req.headers.authorization);
        if(header[1] != '') {
            var token = header[1];
        }        
        
    }
    var secretKey = "hitesh@123";
    //var token = req.headers.authorization;
    //console.log('===>'+secretKey);

  	/*if (!token)
        var resultData = JSON.stringify({'failed': true, 'data': "No token provided."});
        res.send(resultData);
    jwt.verify(token,secretKey,function(err,token){
      if(err)
      {
        console.log(err);
        var resultData = JSON.stringify({'failed': true, 'data': "Fail to authentication"});
        res.send(resultData);
      }
    });*/

    var id = input.id;
    var profile_photo = '';
    if(req.file.filename != ''){
        var profile_photo = req.file.filename;    
    }
    
    //console.log('==='+id);
    //console.log(req);
    var data = {                
                name     : input.name,
                email     : input.email,
                contactno  : input.contactno,
                profile_pic  : profile_photo
            };
            //console.log(data);
    connection.query("UPDATE user set ? WHERE id = ? ",[data,id], function(err, rows)
    {
      if (err) {
      	var resultData = JSON.stringify({'failed': true, 'data': "Something went wrong"});
        res.send(resultData);
      } else {
      	var resultData = JSON.stringify({'success': true, 'data': rows});
        console.log('success');
        res.send(resultData);
      }
      	
      
    });   
};

exports.login = function(req, res)
{
        console.log('Login in main js');
        
        var email = req.body.email;
        var password = req.body.password;
        var queryString = 'SELECT * FROM user where email = '+"'"+email+"'"+' AND password ='+"'"+password+"'";
        
        connection.query(queryString, function(err,rows)
        {    
        	//console.log(rows);
            if (err) {
            	console.log('in Error');
        		var resultData = JSON.stringify({'success': false, 'data': "Problem in fetch data"});
    			res.send(resultData);
        	} else {
        		var token = jwt.sign({ id: rows.id }, "hitesh@123", {
			      expiresIn: 3600 // expires in 24 hours
			    });
        		if(rows.length > 0)
        		{
        			rows[0].token = token;
            		var resultData = JSON.stringify({'success': true, 'data': rows[0]});
    				res.send(resultData);
        		} else {
        			var resultData = JSON.stringify({'success': false, 'data': "No Data available"});
    				res.send(resultData);
        		}
        	}
            
            
        });
};

exports.getUserDetails = function(req, res)
{
    console.log('In Get User Details');
    var email = req.body.email;
    //console.log('Get Email===>'+email);
    //console.log(req);
    var profileString = 'SELECT * FROM user where email = '+"'"+email+"'";
        
    connection.query(profileString, function(err,rows)     
    {
        var resultData = JSON.stringify({'success': true, 'data': rows});
        var token = jwt.sign({ id: rows.id }, "hitesh@123", {
                  expiresIn: 3600 // expires in 24 hours
                });
        console.log(token);

        res.send(resultData);
    });    
};

exports.unlinkImage = function(req, res)
{
    var id = req.body.id;
    var profileString = 'SELECT * FROM user where id = '+"'"+id+"'";
        
    connection.query(profileString, function(err,rows)     
    {
        
        console.log(rows[0].profile_pic);
        if(rows[0].profile_pic != ''){
            fs.unlinkSync(appRoot.path + "/src/assets/profile/"+rows[0].profile_pic);
            var data = {profile_pic  : ''};
            connection.query("UPDATE user set ? WHERE id = ? ",[data,id], function(err, rows)
            {
            });
            var resultData = JSON.stringify({'success': true, 'data': rows});
            res.send(resultData);

        }
        
        
    });
};


