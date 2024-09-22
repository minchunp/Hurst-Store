var express = require('express');
var router = express.Router();

const userModel = require('../models/userModel');

// Lấy user qua email và pass
router.get('/getUserByEmailAndPass', async function (req, res, next) {
   var email_user = req.query.email_user;
   var pass_user = req.query.pass_user;
   var data = await userModel.find({$and: [{"email_user": email_user}, {"pass_user": pass_user}]});
   res.json(data);
});

// Lấy ra danh sách user
router.get('/getUserLists', async function (req, res, next) {
   try {
      var data = await userModel.find();
      res.json(data);
   } catch (e) {
      res.json({status: 0, message: "Error!"});
   }
});

// Lấy user qua id
router.get('/getUserById', async function (req, res, next) {
   var id = req.query.id;
   var data = await userModel.findOne({"_id": id});
   res.json(data);
});

// Thêm user vào Database
router.post('/addUser', async function (req, res, next) {
   try {
      var user = req.body;
      console.log(user);

      var data = await userModel.create(user);
      console.log(data);
      if (data != null) {
         res.json({status: 1, message: "Success!"});
      } else {
         res.json({status: 0, message: "Fail!"});
      }
   } catch (e) {
      res.json({status: 0, message: "Error!"});
   }
});

// Update user
router.post('/updateUser', async function (req, res, next) {
   try {
      var user = req.body;
      var id = user._id;
      var userEdit = await userModel.findById(id);
      console.log(userEdit);

      if (userEdit != null) {
         userEdit.name_user = (userEdit.name_user != user.name_user)?user.name_user:userEdit.name_user;
         userEdit.email_user = (userEdit.email_user != user.email_user)?user.email_user:userEdit.email_user;
         userEdit.role_user = (userEdit.role_user != user.role_user)?user.role_user:userEdit.role_user;
         userEdit.pass_user = userEdit.pass_user;

         var data = await userEdit.save();
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

// Xóa user
router.post('/deleteUser', async (req, res, next) => {
   try {
      var user = req.body;
      console.log(user);
      var data = await userModel.findByIdAndDelete(user._id);
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