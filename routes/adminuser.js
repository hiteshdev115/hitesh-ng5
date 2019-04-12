
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

exports.productList = function(req, res)
{
        console.log('Admin productlist in admin');
        
        var email = req.body.email;
        var password = req.body.password;
        var queryString = 'SELECT * FROM product';
        
        connection.query(queryString, function(err,rows)
        {    
            //console.log(rows);
            if (err) {
                console.log('in Error');
                var resultData = JSON.stringify({'success': false, 'data': "Problem in fetch data"});
                res.send(resultData);
            } else {
                
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




