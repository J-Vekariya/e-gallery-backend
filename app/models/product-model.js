var db = require('../../config/database');
var dbFunc = require('../../config/db-function');
var path = require('path');
var slashes = require('slashes');

var userModel = {
   getType:getType,
   getSubject:getSubject,
   addProduct:addProduct,
   uploadPhoto:uploadPhoto,
   addCost:addCost,
   getProductData:getProductData,
   getProductList:getProductList
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
    console.log(data);
    
    return new Promise((resolve,reject) => {
    
        var ext = path.extname(product.files.photo.name).toLowerCase();
        var targetPath = path.resolve('\\project//node-mysql//app/photo-store//' + data.user_id +'_'+ data.product_id + ext);
        
        if (ext === '.png' || ext === '.jpg' || ext === '.jpeg')
        {
            product.files.photo.mv(targetPath, function(err) {
                if (err){
                    resolve({
                        "err":err,
                        "errcode":500,
                    });
                }
             
                db.query("UPDATE product SET product_photo_url='"+slashes.add(targetPath)+"' WHERE product_id="+data.product_id+" AND user_id="+data.user_id+"",(error,rows,fields)=>{
                if(error) {
                    dbFunc.connectionRelease;
                    resolve({
                        "error":error,
                        "success":false,
                        "msg":"photo uploaded successfully"
                    });
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

function addCost(costData) {
    console.log(costData);
    return new Promise((resolve,reject) => {
        db.query("UPDATE product SET product_price='"+costData.product_price+"',shipping_from_add1='"+costData.shipping_from_add1+"',shipping_from_add2='"+costData.shipping_from_add2+"',shipping_from_city='"+costData.shipping_from_city+"',shipping_from_province='"+costData.shipping_from_province+"',shipping_from_postalcode='"+costData.shipping_from_postalcode+"',shipping_from_country='"+costData.	shipping_from_country+"' WHERE product_id="+costData.product_id+" AND user_id="+costData.user_id+"",(error,rows,fields)=>{
           if(error) {
               dbFunc.connectionRelease;    
               reject(error);
           } else {
               dbFunc.connectionRelease;
               resolve({
                "success":true,
                "msg":"cost and shipping updated successfully"
              });
           }
         });
       });
}

function getProductData(getData) {
    console.log(getData);
    return new Promise((resolve,reject) => {
        db.query("SELECT * FROM product where user_id='"+getData.user_id+"' AND product_id='"+getData.product_id+"'" ,(error,rows,fields)=>{
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

function getProductList(getList) {
    
    return new Promise((resolve,reject) => {
        
        db.query("SELECT p.product_id,p.product_title,p.product_photo_url,p.product_height,p.product_width,p.product_depth,p.product_status,p.list_date,p.product_price,pt.type_name,st.subject_name FROM product p,product_type pt,subject_type st WHERE p.product_type_id=pt.id AND p.product_subject_id=st.id AND p.user_id="+getList.user_id+"",(error,rows,fields)=>{
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




module.exports = userModel;

