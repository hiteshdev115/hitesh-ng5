var express = require('express');
var app = express();
var http = require('http');
var fs = require('fs');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

//var passport = require('passport');
var expressSession = require('express-session');
app.use(expressSession({secret: 'hitesh@123',saveUninitialized: true,resave: true}));
//app.use(passport.initialize());
//app.use(passport.session());

var multer = require('multer'); //for upload
var path = require("path"); //for upload
var appRoot = require('app-root-path'); //for get root folder path

//var upload = multer({ dest: '/demo/src/assets/profile/' })
app.set('port', process.env.PORT || 3000);
const bodyParser = require("body-parser");



app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(function (req, res, next) {        
     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');    
     //res.setHeader('Access-Control-Allow-Origin', 'http://www.angulardemo.com');    
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');    
     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');      
     res.setHeader('Access-Control-Allow-Credentials', true);       
     next();  
 });  
 
var mysql = require('mysql');

//var user = require('./routes/user');
var log = require('./routes/login');
var admin_login = require('./routes/adminlogin');
var admin_user = require('./routes/adminuser');
// uncomment after placing your favicon in /public
/*For file Upload*/
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, appRoot.path + "/src/assets/profile")
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
var upload = multer({
    storage: storage
});
/*End of file Upload*/
app.use(express.static(path.join(__dirname, 'dist')));


app.get('/home', log.main);
app.post('/saveUser', upload.single('profile_pic'), log.saveUser);
app.post('/login', log.login);
app.post('/getUserDetails', log.getUserDetails);
app.post('/unlinkimage', log.unlinkImage);

app.post('/admin/adminlogin', admin_login.login);
app.post('/admin/user', admin_user.userList);
app.post('/admin/product', admin_user.productList);
app.post('/admin/getUserDetails', admin_user.getSingleUserDetails);
app.post('/admin/updateEmployee', admin_user.updateEmployee);
app.post('/admin/deleteEmployee', admin_user.deleteEmployee);
app.post('/admin/addEmployee', admin_user.addEmployee);
app.post('/admin/deleteSelectedEmployee', admin_user.deleteSelectedEmployee);



/*app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});*/

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
