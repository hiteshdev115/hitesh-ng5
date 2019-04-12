var mysql      = require('mysql');
var connection = mysql.createConnection({
   host     : 'localhost',
   user     : 'admin',
   password : 'password',
   database : 'demo_angulr5'
 });
 
connection.connect(function(err){
	if(!err) 
	{
	     console.log("Database is connected ... \n\n");  
	} 
	else 
	{
	     console.log("Error connecting database ... \n\n");  
	}
});
module.exports = connection;
//module.exports.localConnect = db;
