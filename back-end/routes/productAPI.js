var express = require('express');
var router = express.Router();
var upload = require('../ultils/upload');

var modelProduct = require('../models/productModel');
// Method: GET
// Lấy danh sách sản phẩm có trong database
router.get('/getProductLists', async function (req, res, next) {
   try {
      var data = await modelProduct.find();
      res.json(data);   
   } catch (e) {
      res.json({status: 0, message: "Error!"});
   }
});

// Lấy sản phẩm theo trending_pro
router.get('/getByTrending', async function (req, res, next) {
   try {
      var trending_pro = req.query.trending_pro;
      var data = await modelProduct.find({ "trending_pro": trending_pro });
      res.json(data);
   } catch (e) {
      res.json({status: 0, message: "Error!"});
   }
});

// Lấy chi tiết sản phẩm theo id
router.get('/getById', async function (req, res, next) {
   try {
      var id = req.query.id;
      var data = await modelProduct.findOne({ "_id": id });
      res.json(data);
   } catch (e) {
      res.json({status: 0, message: "Error!"});
   }
});

// Lấy dánh sách sản phẩm theo giá
router.get('/getListByPrice', async function (req, res, next) {
   try {
      var data = await modelProduct.find({}).sort({price_pro: -1}).limit(4);
      res.json(data);
   } catch (e) {
      res.json({status: 0, message: "Error!"});
   }
});

// Thêm sản phẩm
router.post('/addProduct', async function (req, res, next) {
   try {
      var product = req.body;

      var data = await modelProduct.create(product);
      if (data != null) {
         res.json({status: 1, message: "Success!"});
      } else {
         res.json({status: 0, message: "Fail!"});
      }
   } catch (e) {
      res.json({status: 0, message: "Error!"});
   }
});

// Update sản phẩm
router.post('/updateProduct', async function (req, res, next) {
   try {
      var product = req.body;
      var id = product._id;
      var productEdit = await modelProduct.findById(id);
      console.log(productEdit);
      if (productEdit != null) {
         // name_pro
         if (productEdit.name_pro != product.name_pro) {
            productEdit.name_pro = product.name_pro;
         } else {
            productEdit.name_pro = productEdit.name_pro;
         }

         // price_pro
         if (productEdit.price_pro != product.price_pro) {
            productEdit.price_pro = product.price_pro;
         } else {
            productEdit.price_pro = productEdit.price_pro;
         }

         // sale_pro
         if (productEdit.sale_pro != product.sale_pro) {
            productEdit.sale_pro = product.sale_pro;
         } else {
            productEdit.sale_pro = productEdit.sale_pro;
         }

         // image_pro
         if (productEdit.image_pro != product.image_pro) {
            productEdit.image_pro = product.image_pro;
         } else {
            productEdit.image_pro = productEdit.image_pro;
         }

         // trending_pro
         if (productEdit.trending_pro != product.trending_pro) {
            productEdit.trending_pro = product.trending_pro;
         } else {
            productEdit.trending_pro = productEdit.trending_pro;
         }

         // desciption_pro
         if (productEdit.desciption_pro != product.desciption_pro) {
            productEdit.desciption_pro = product.desciption_pro;
         } else {
            productEdit.desciption_pro = productEdit.desciption_pro;
         }

         var data = await productEdit.save();
         if (data != null) {
            res.json({status: 1, message: "Success!"});
         } else {
            res.json({status: 0, message: "Fail!"});
         }
      } else {
         res.json({status: 0, message: "Error!"});
      }
   } catch (e) {
      res.json({status: 0, message: "Error!"});
   }
});

// Xóa sản phẩm
router.post('/deleteProduct', async (req, res, next) => {
   try {
      var product = req.body;
      console.log(product);
      var data = await modelProduct.findByIdAndDelete(product._id);
      if (data != null) {
         res.json({status: 1, message: "Success!"});
      } else {
         res.json({status: 0, message: "Fail!"});
      }
   } catch (e) {
      res.json({status: 0, message: "Error!"});
   }
});

module.exports = router;