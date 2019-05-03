
var connection = require('./db.js');
var jwt = require('jsonwebtoken');
var appRoot = require('app-root-path');
var fs = require('fs');

exports.productList = function(req, res)
{
        console.log('Admin productlist in admin');
        var queryString = 'SELECT * FROM product';        
        connection.query(queryString, function(err,rows)
        {    
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

exports.addProduct = function(req, res)
{
    console.log("add product action");
    //console.log(req.body);
    
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
    //console.log(req.files.length);
    //console.log(req.files);
    var secretKey = "hitesh@123";    
        
    
    var data = {                
        productName  : req.body.productName,
        description  : req.body.description,
        price : req.body.price        
    };
    
    connection.query("INSERT INTO product SET ?", [data], function(err, result)
    {
        //console.log(err);
      if (err) {
      	var resultData = JSON.stringify({'failed': true, 'data': "Something went wrong"});
        res.send(resultData);
      } else {
        /* For insert multiple product image */
        var imageDataArray = [];
        for(var i = 0; i < req.files.length; i++)
        {
            var imageData = [                
                result.insertId,
                req.files[i].filename   
            ]
            imageDataArray.push(imageData);
        }
        //console.log(imageDataArray);
        var insImage = "INSERT INTO productImage (productId,image) VALUES ?";
        connection.query(insImage, [imageDataArray], function(err, result)
        {});
        /* End of For insert multiple product image */
      	var resultData = JSON.stringify({'success': true, 'data': result});
        //console.log('success');
        res.send(resultData);
      }     	
      
    });   
};


exports.getSingleProductDetails = function(req, res)
{
        console.log('Get Single product details from admin panel');
        
        var id = req.params.id;
        var queryString = 'SELECT * FROM product where id = '+"'"+id+"'";
        //console.log(req);
        connection.query(queryString, function(err,rows)
        {    
            if (err) {
            	console.log('in Error');
        		var resultData = JSON.stringify({'success': false, 'data': "Problem in fetch data"});
    			res.send(resultData);
        	} else {
        		var token = jwt.sign({ id: 000 }, "hitesh@123", {
                    expiresIn: 3600 // expires in 24 hours
                });
                var productImg = 'SELECT * FROM productImage where productid = '+"'"+id+"'";
                connection.query(productImg, function(err,rowimages)
                {
                    if(rowimages.length > 0)
                    {
                        rows[0].token = token;
                        //console.log(token);
                        var resultData = JSON.stringify({'success': true, 'data': rows,'images': rowimages});
                        res.send(resultData);
                    } else if(rows.length > 0){
                        rows[0].token = token;
                        //console.log(token);
                        var resultData = JSON.stringify({'success': true, 'data': rows,'images': ''});
                        res.send(resultData);
                    } else {
                        var resultData = JSON.stringify({'success': false, 'data': "No Data available"});
                        res.send(resultData);
                    }
                });
                
        	}           
            
        });
};

exports.updateProduct = function(req, res)
{
    console.log("update product action");
    //console.log(req.body);
    
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
    
    var id = input.id;  
    var data = {                
                productName  : req.body.productName,
                description  : req.body.description,
                price : req.body.price                
            };
    
    connection.query("UPDATE product set ? WHERE id = ? ",[data,id], function(err, rows)
    {
      if (err) {
      	var resultData = JSON.stringify({'failed': true, 'data': "Something went wrong"});
        res.send(resultData);
      } else {
        /* For insert multiple product image */
        var imageDataArray = [];
        for(var i = 0; i < req.files.length; i++)
        {
            var imageData = [                
                id,
                req.files[i].filename   
            ]
            imageDataArray.push(imageData);
        }
        //console.log(imageDataArray);
        if(imageDataArray.length > 0)
        {
            //exports.unlinkAllImages(id);
            var insImage = "INSERT INTO productImage (productId,image) VALUES ?";
            connection.query(insImage, [imageDataArray], function(err, resultData)
            {});
        }
        /* End of For insert multiple product image */
        var resultData = JSON.stringify({'success': true, 'data': rows});
        res.send(resultData);
      }     	
      
    });   
};

exports.unlinkAllImages = function(id)
{
    console.log("Unlink All");
    var profileString = 'SELECT * FROM productImage where productid = '+"'"+id+"'";   
    connection.query(profileString, function(err,rowsImg)     
    {
        if(rowsImg.length > 0){
            fs.unlinkSync(appRoot.path + "/src/assets/productImages/"+rowsImg[0].image); // remove from folder
            connection.query("DELETE from productImage WHERE productid = ? ",[id], function(err, rows)
            {
                if (err) {
                    return 0;
                }else {
                    return 1;
                }
            });
        } else{
            return 1;
        }
    });
}


exports.deleteProduct = function(req, res)
{
    //var id = req.body.id;
    var id = req.params.prodid;
    var profileString = 'SELECT * FROM product where id = '+"'"+id+"'";
        
    connection.query(profileString, function(err,rows)     
    {
        if (err) {
            console.log('Error');
            var resultData = JSON.stringify({'Failed': false, 'data': "Problem in fetch data"});
            res.send(resultData);
        } else {
            connection.query("DELETE from product WHERE id = ? ",[id], function(err, rows)
            {
                exports.unlinkAllImages(id);
                var resultData = JSON.stringify({'success': true, 'data': ''});
                res.send(resultData);
            });     
        }
        
    });
};

exports.deleteSelectedProduct = function(req, res)
{
    var id = req.body.id;
            
    
    var sqlQ = `DELETE FROM product WHERE id IN (${id})`;
    connection.query(sqlQ, function(err, rows)
    {
        if (err) {
            console.log('Error');
            var resultData = JSON.stringify({'success': false, 'data': "Problem in fetch data"});
            res.send(resultData);
        } else{
            //exports.unlinkAllImages(id);
            var resultData = JSON.stringify({'success': true, 'data': ''});
            res.send(resultData);
        }            
    });
};

exports.unlinkImage = function(req, res)
{
    var id = req.body.id;
    var productString = 'SELECT * FROM productImage where id = '+"'"+id+"'";  
    connection.query(productString, function(err,rows)     
    {
        if(rows.length > 0){
            fs.unlinkSync(appRoot.path + "/src/assets/productImages/"+rows[0].image);
            
            connection.query("DELETE from productImage WHERE id = ? ",[id], function(err, imagerows)
            {
                if (err) {
                    var resultData = JSON.stringify({'failed': true, 'data': ''});
                    res.send(resultData);
                }else {
                    var resultData = JSON.stringify({'success': true, 'data': imagerows});
                    res.send(resultData);
                }
            });
        }
    });
};






