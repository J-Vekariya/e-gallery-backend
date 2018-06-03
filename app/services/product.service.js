var productModel = require("../models/product-model.js");


var productService = {
    getType: getType,
    getSubject: getSubject,
    addProduct: addProduct,
    uploadPhoto: uploadPhoto,
    addCost: addCost,
    getProductData:getProductData,
    getProductList:getProductList
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

function uploadPhoto(photoData) {
    return new Promise((resolve,reject) => {
        productModel.uploadPhoto(photoData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}

function addCost(costData) {
    return new Promise((resolve,reject) => {
        productModel.addCost(costData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}

function getProductData(getData) {
    return new Promise((resolve,reject) => {
        productModel.getProductData(getData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    });
}

function getProductList(getList) {
    return new Promise((resolve,reject) => {
        productModel.getProductList(getList).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    });
}



module.exports = productService;

