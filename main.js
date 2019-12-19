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

//var upload = multer({ dest: '/hitesh-ng5/src/assets/profile/' })
app.set('port', process.env.PORT || 3000);
const bodyParser = require("body-parser");



app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(function (req, res, next) {        
     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');    
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
var admin_product = require('./routes/adminproduct');
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

var productImageStorage = multer.diskStorage({
  destination: function (req, file, callback) {
      callback(null, appRoot.path + "/src/assets/productImages")
  },
  filename: function (req, file, callback) {
      callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})
var upload = multer({
    storage: storage
});
var uploadProductImages = multer({
  storage: productImageStorage
});
/*End of file Upload*/
app.use(express.static(path.join(__dirname, 'dist')));



app.get('/api/home', log.main);
app.post('/api/saveUser', upload.single('profile_pic'), log.saveUser);
app.post('/api/login', log.login);
app.post('/api/getUserDetails', log.getUserDetails);
app.post('/api/unlinkimage', log.unlinkImage);

app.post('/api/admin/adminlogin', admin_login.login);
app.post('/api/admin/user', admin_user.userList);
app.post('/api/admin/getUserDetails', admin_user.getSingleUserDetails);
app.post('/api/admin/updateEmployee', admin_user.updateEmployee);
app.post('/api/admin/deleteEmployee', admin_user.deleteEmployee);
app.post('/api/admin/addEmployee', admin_user.addEmployee);
app.post('/api/admin/deleteSelectedEmployee', admin_user.deleteSelectedEmployee);

app.get('/api/admin/product', admin_product.productList);
app.post('/api/admin/addProduct', uploadProductImages.array('productImage'), admin_product.addProduct);
app.get('/api/admin/getProductDetails/:id', admin_product.getSingleProductDetails);
app.put('/api/admin/updateProduct/', uploadProductImages.array('productImage'), admin_product.updateProduct);
app.delete('/api/admin/deleteProduct/:prodid', admin_product.deleteProduct);
app.post('/api/admin/deleteSelectedProduct', admin_product.deleteSelectedProduct);
app.post('/api/admin/product/unlinkimage', admin_product.unlinkImage);

app.use(function (err, req, res, next) {
  console.log('This is the invalid field ->', err.field);
  next(err);
})
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/hitesh-ng5/index.html'));
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
