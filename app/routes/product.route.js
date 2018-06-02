const productService = require('../services/product.service');
var iValidator = require('../../common/iValidator');
var errorCode = require('../../common/error-code');
var errorMessage = require('../../common/error-methods');
var mail = require('./../../common/mailer.js');


function init(router) {
    router.route('/add_product')
        .post(addProduct);
    router.route('/product_type')
        .get(getType);
    router.route('/subject_type')
        .get(getSubject);
     
    
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
  
  
  //Validating the input entity
  //  var json_format = iValidator.json_schema(schema.postSchema, productData, "product");
  //  if (json_format.valid == false) {
  //    return res.status(422).send(json_format.errorMessage);
  //  }

  productService.addProduct(productData).then((data) => {
    res.json(data);
  }).catch((err) => {
    mail.mail(err);
    res.json(err);
  });

}


module.exports.init = init;



