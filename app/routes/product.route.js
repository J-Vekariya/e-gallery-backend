const productService = require('../services/product.service');
var iValidator = require('../../common/iValidator');
var errorCode = require('../../common/error-code');
var errorMessage = require('../../common/error-methods');
var mail = require('./../../common/mailer.js');
const fileUpload = require('express-fileupload');

function init(router) {
    router.route('/add_product')
        .post(addProduct);
    router.route('/product_type')
        .get(getType);
    router.route('/subject_type')
        .get(getSubject);
    router.route('/uploadPhoto',fileUpload())
        .post(uploadPhoto);
    router.route('/cost')
        .post(addCost);
    router.route('/getProductData')
        .post(getProductData);
    router.route('/getProductList')
        .post(getProductList);
     
    
}

function getType(req,res) {
    productService.getType().then((data) => {
      res.send(data);
    }).catch((err) => {
      mail.mail(err);
      res.send(err);
    });
}

function getSubject(req,res) {
  productService.getSubject().then((data) => {
    res.send(data);
  }).catch((err) => {
    mail.mail(err);
    res.send(err);
  });
}

function addProduct(req,res) {
  var productData=req.body;

  productService.addProduct(productData).then((data) => {
    res.json(data);
  }).catch((err) => {
    mail.mail(err);
    res.json(err);
  });

}

function uploadPhoto(req,res) {
  var photoData = req;
  productService.uploadPhoto(photoData).then((data) => {
    res.json(data);
  }).catch((err) => {
    mail.mail(err);
    res.json(err);
  });
}

function addCost(req,res) {
  var costData = req.body;
  productService.addCost(costData).then((data) => {
    res.json(data);
  }).catch((err) => {
    mail.mail(err);
    res.json(err);
  });
}

function getProductData(req,res) {
  var getData = req.body;
  productService.getProductData(getData).then((data) => {
    res.send(data);
  }).catch((err) => {
    mail.mail(err);
    res.send(err);
  });
}

function getProductList(req,res) {
  var getList = req.body;
  productService.getProductList(getList).then((data) => {
    res.send(data);
  }).catch((err) => {
    mail.mail(err);
    res.send(err);
  });
}


module.exports.init = init;



