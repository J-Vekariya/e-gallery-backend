var db = require('../../config/database');
var dbFunc = require('../../config/db-function');
var path = require('path');

var userModel = {
   getType:getType,
   getSubject:getSubject,
   addProduct:addProduct,
   uploadPhoto:uploadPhoto,
}

function getType() {
    return new Promise((resolve,reject) => {
        db.query(`SELECT * FROM product_type`,(error,rows,fields)=>{
            if(!!error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                dbFunc.connectionRelease;
                resolve(rows);
            }
       });
    });
}

function getSubject() {
    return new Promise((resolve,reject) => {
        db.query(`SELECT * FROM subject_type`,(error,rows,fields)=>{
            if(!!error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                dbFunc.connectionRelease;
                resolve(rows);
            }
       });
    });
}

function addProduct(product) {
    
    return new Promise((resolve,reject) => {
        db.query("INSERT INTO product(product_title,product_type_id,product_subject_id,product_signed,product_description,product_tags,product_year_created,product_height,product_width,product_depth,product_weight,user_id)VALUES('"+product.product_title+"','"+product.product_type_id+"','"+product.product_subject_id+"','"+product.product_signed+"','"+product.product_description+"','"+product.product_tags+"','"+product.product_year_created+"','"+product.product_height+"','"+product.product_width+"','"+product.product_depth+"','"+product.product_weight+"','"+product.user_id+"')",(error,rows,fields)=>{
           if(error) {
               dbFunc.connectionRelease;
               reject(error);
           } else {
               dbFunc.connectionRelease;
               resolve({
                "success":true,
                "product_id":rows.insertId
              });
           }
         });
       });
}

function uploadPhoto(product) {
    var data = product.body;
    return new Promise((resolve,reject) => {
    
        var ext = path.extname(product.files.photo.name).toLowerCase();
        var targetPath = path.resolve('\\project\\node-mysql\\app\\photo-store\\' + data.user_id +'_'+ data.product_id + ext);
        console.log(targetPath);
        
        if (ext === '.png' || ext === '.jpg' || ext === '.jpeg')
        {
            product.files.photo.mv(targetPath, function(err) {
                if (err){
                    resolve({
                        "err":err,
                        "errcode":500,
                    });
                }
             
                db.query("UPDATE product SET product_photo_url='"+targetPath+"' WHERE 'product_id'="+data.product_id+" & 'user_id'="+data.user_id+"",(error,rows,fields)=>{
                if(error) {
                    dbFunc.connectionRelease;
                    reject(error);
                } else {
                    dbFunc.connectionRelease;
                    resolve({
                        "success":true,
                        "msg":"photo uploaded successfully"
                    });
                }
         });
              });            
        }
        else
        {
            resolve({
                "err":err,
                "errcode":500,
                "msg":"Only image files are allowed"
            });
            
        }
       
    
        });
    
}




module.exports = userModel;

