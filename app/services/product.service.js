var productModel = require("../models/product-model.js");


var productService = {
    getType: getType,
    getSubject: getSubject,
    addProduct: addProduct,
    
}


function getType() {
    return new Promise((resolve,reject) => {
        productModel.getType().then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    });
}

function getSubject() {
    return new Promise((resolve,reject) => {
        productModel.getSubject().then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    });
}

function addProduct(productData) {
    return new Promise((resolve,reject) => {
        productModel.addProduct(productData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}



module.exports = productService;

