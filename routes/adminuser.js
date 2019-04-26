
var connection = require('./db.js');
var jwt = require('jsonwebtoken');
var appRoot = require('app-root-path');


exports.userList = function(req, res)
{
        console.log('Get Userlist from admin panel');
        
        //var email = req.body.email;
        //var password = req.body.password;
        var queryString = 'SELECT * FROM employee';
        
        connection.query(queryString, function(err,rows)
        {    
            //console.log(rows);
            
            if (err) {
            	console.log('in Error');
        		var resultData = JSON.stringify({'success': false, 'data': "Problem in fetch data"});
    			res.send(resultData);
        	} else {
        		var token = jwt.sign({ id: 000 }, "hitesh@123", {
                    expiresIn: 3600 // expires in 24 hours
                  });
        		if(rows.length > 0)
        		{
        			rows[0].token = token;
            		var resultData = JSON.stringify({'success': true, 'data': rows});
    				res.send(resultData);
        		} else {
        			var resultData = JSON.stringify({'success': false, 'data': "No Data available"});
    				res.send(resultData);
        		}
        	}
            
            
        });
};

exports.getSingleUserDetails = function(req, res)
{
        console.log('Get Single User details from admin panel');
        
        //var email = req.body.email;
        //var password = req.body.password;
        var id = req.body.id;
        var queryString = 'SELECT * FROM employee where id = '+"'"+id+"'";
        
        connection.query(queryString, function(err,rows)
        {    
            //console.log(rows);
            
            if (err) {
            	console.log('in Error');
        		var resultData = JSON.stringify({'success': false, 'data': "Problem in fetch data"});
    			res.send(resultData);
        	} else {
        		var token = jwt.sign({ id: 000 }, "hitesh@123", {
                    expiresIn: 3600 // expires in 24 hours
                  });
        		if(rows.length > 0)
        		{
                    rows[0].token = token;
                    //console.log(token);
            		var resultData = JSON.stringify({'success': true, 'data': rows});
    				res.send(resultData);
        		} else {
        			var resultData = JSON.stringify({'success': false, 'data': "No Data available"});
    				res.send(resultData);
        		}
        	}           
            
        });
};

exports.updateEmployee = function(req, res)
{
    console.log("update employee action");
    console.log(req.body);
    
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
    /*if(req.file.filename != ''){
        var profile_photo = req.file.filename;    
    }*/
    
    //console.log('==='+id);
    //console.log(req);
    var data = {                
                employeeName  : req.body.name,
                city  : req.body.city,
                phone : req.body.contactno
                //profile_pic  : profile_photo
            };
    //console.log("=======");
    console.log(data);
    connection.query("UPDATE employee set ? WHERE id = ? ",[data,id], function(err, rows)
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

exports.addEmployee = function(req, res)
{
    console.log("add employee action");
    console.log(req.body);
    
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
        });
    */
    
    //var profile_photo = '';
    /*if(req.file.filename != ''){
        var profile_photo = req.file.filename;    
    }*/
    
    var data = { 
                employeeName  : req.body.name,
                city  : req.body.city,
                phone : req.body.contactno
                //profile_pic  : profile_photo
            };
    //console.log("=======");
    //console.log(data);
    connection.query("INSERT INTO employee SET ?", [data], function(err, result)
    {
        console.log(err);
      if (err) {
      	var resultData = JSON.stringify({'failed': true, 'data': "Something went wrong"});
        res.send(resultData);
      } else {
      	var resultData = JSON.stringify({'success': true, 'data': result});
        console.log('success');
        res.send(resultData);
      }
      	
      
    });   
};

exports.deleteEmployee = function(req, res)
{
    var id = req.body.id;
    var profileString = 'SELECT * FROM employee where id = '+"'"+id+"'";
        
    connection.query(profileString, function(err,rows)     
    {
        console.log('delete function in node ==>'+rows.length);
        if (err | rows.length > 0) {
            var resultData = JSON.stringify({'success': false, 'data': "Problem in fetch data"});
            res.send(resultData);
        } else {
            connection.query("DELETE from employee WHERE id = ? ",[id], function(err, rows)
            {
                var resultData = JSON.stringify({'success': true, 'data': ''});
                res.send(resultData);
            });     
        }
        
    });
};

exports.deleteSelectedEmployee = function(req, res)
{
    var id = req.body.id;
    
    var sqlQ = `DELETE FROM employee WHERE id IN (${id})`;
    connection.query(sqlQ, function(err, rows)
    {
        if (err) {
            var resultData = JSON.stringify({'success': false, 'data': "Problem in fetch data"});
            res.send(resultData);
        } else{
            var resultData = JSON.stringify({'success': true, 'data': ''});
            res.send(resultData);
        }            
    });
};




