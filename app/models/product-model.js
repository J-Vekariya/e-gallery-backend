var db = require('../../config/database');
var dbFunc = require('../../config/db-function');

var userModel = {
   getType:getType,
   getSubject:getSubject,
   addProduct:addProduct,
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
        db.query("INSERT INTO product(product_title,product_type_id,product_subject_id,product_signed,product_description,product_tags,product_year_created,product_height,product_width,product_depth,product_weight)VALUES('"+product.product_title+"','"+product.product_type_id+"','"+product.product_subject_id+"','"+product.product_signed+"','"+product.product_description+"','"+product.product_tags+"','"+product.product_year_created+"','"+product.product_height+"','"+product.product_width+"','"+product.product_depth+"','"+product.product_weight+"')",(error,rows,fields)=>{
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




module.exports = userModel;

