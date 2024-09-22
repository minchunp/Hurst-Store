var express = require('express');
var router = express.Router();
var sendMail = require('../ultils/sendMail');

const orderModel = require('../models/orderModel');

// Check xem người dùng đã có giỏ hàng hay chưa
router.get('/checkCart', async (req, res, next) => {
   try {
      var id_user = req.query.id_user;
      // var status_order = req.query.status_order;
      var data = await orderModel.find({$and: [{"user_id": id_user}, {"status_order": 'cart'}]});
      res.json(data);
   } catch (e) {
      res.json({ status: 0, message: "Không lấy được danh sách!" });
   }
});

// Thêm sản phẩm vào Order
router.post('/addOrder', async (req, res, next) => {
   try {
      var cart = req.body;

      var data = await orderModel.create(cart);
      console.log(data);
      if (data != null) {
         res.json({ status: 1, message: "Success!" });
      } else {
         res.json({ status: 0, message: "Fail!" });
      }
   } catch (e) {
      res.json({ status: 0, message: "Error!" });
   }
});

// Update order
router.post('/updateOrder', async (req, res, next) => {
   try {
      var order = req.body;
      var id = order._id;
      var orderEdit = await orderModel.findById(id);
      if (orderEdit != null) {
         // products
         if (orderEdit.products != order.products) {
            orderEdit.products = order.products;
         } else {
            orderEdit.products = orderEdit.products;
         }

         // date_order
         if (orderEdit.date_order != order.date_order) {
            orderEdit.date_order = order.date_order;
         } else {
            orderEdit.date_order = orderEdit.date_order;
         }

         // total_order
         if (orderEdit.total_order != order.total_order) {
            orderEdit.total_order = order.total_order;
         } else {
            orderEdit.total_order = orderEdit.total_order;
         }

         // status_order
         if (orderEdit.status_order != order.status_order) {
            orderEdit.status_order = order.status_order;
         } else {
            orderEdit.status_order = orderEdit.status_order
         }

         // name_user
         if (orderEdit.name_user != order.name_user) {
            orderEdit.name_user = order.name_user;
         } else {
            orderEdit.name_user = orderEdit.name_user;
         }

         var data = await orderEdit.save();
         if (data != null) {
            res.json({status: 1, message: "Success!"});
         } else {
            res.json({status: 0, message: "Fail!"});
         }
      } else {
         res.json({status: 0, message: "Error!"});
      }
   } catch (e) {
      res.json({status: 0, message: 'Error!'});
   }
});

// Lấy ra toàn bộ danh sách order
router.get('/getOrderLists', async (req, res, next) => {
   try {
      var data = await orderModel.find().sort({date_order: -1});
      res.json(data);
   } catch (e) {
      res.json({status: 0, message: "Error!"});
   }
});

// Lấy ra danh sách order đang trong trạng thái pending(đơn hàng đã đặt)
router.get('/getNewOrderPending', async (req, res, next) => {
   try {
      var data = await orderModel.find({status_order: "order"}).sort({date_order: -1});
      res.json(data);
   } catch (e) {
      res.json({status: 0, message: "Error!"});
   }
});

// Lấy ra danh sách order đang trong trạng thái pending(đơn hàng đã đặt) có giới hạn
router.get('/getNewOrderPendingWithLimit', async (req, res, next) => {
   try {
      var limit = req.query.limit;
      var data = await orderModel.find({status_order: "order"}).sort({date_order: -1}).limit(limit);
      res.json(data);
   } catch (e) {
      res.json({status: 0, message: "Error!"});
   }
});

// Lấy ra order theo id 
router.get('/getOrderById', async (req, res, next) => {
   try {
      var id = req.query.id;
      var data = await orderModel.findOne({"_id": id});
      res.json(data);
   } catch (e) {
      res.json({status: 0, message: "Error!"});
   }
});

// Send mail
router.post("/send-mail", async function (req, res, next) {
   try {
      const inforEmail = req.body;

      const to = inforEmail.email;
      const subject = inforEmail.subject;
      const content = inforEmail.content;
      console.log(inforEmail);


      const mailOptions = {
         from: "HURST <minhtrung010321@gmail.com>",
         to: to,
         subject: subject,
         html: content
      };
      await sendMail.transporter.sendMail(mailOptions);
      res.json({ status: 1, message: "Gửi mail thành công" });
   } catch (err) {
      res.json({ status: 0, message: "Gửi mail thất bại" });
   }
});

module.exports = router;