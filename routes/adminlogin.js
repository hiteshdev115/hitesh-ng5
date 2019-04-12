
var connection = require('./db.js');
var jwt = require('jsonwebtoken');
var appRoot = require('app-root-path');


exports.login = function(req, res)
{
        console.log('Admin Login in admin login js');
        
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




