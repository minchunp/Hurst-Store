
// findById
router.get('/detailProduct', async function (req, res, next) {
   var id = req.query.id;
   var data = await modelProduct.findById(id);
   res.json(data);
});

// findByIdAndDelete
router.get('/deleteProduct', async function (req, res, next) {
   var id = req.query.id;
   var data = await modelProduct.findByIdAndDelete(id);
   res.json(data);
});

// findByIdAndUpdate
router.get('/updateProduct', async function (req, res, next) {
   var id = req.query.id;
   var data = await modelProduct.findByIdAndUpdate(id, { name: 'Bánh sữa' });
   res.json(data);
});

// findOne
// Tìm tài liệu theo điều kiện, nếu có nhiều tài liệu thoải mãn điều kiện thì 
// sẽ trả về tài liệu đầu tiên thỏa mãn
router.get('/findOneProduct', async function (req, res, next) {
   var price = req.query.price;
   var data = await modelProduct.findOne({ price: { $gte: price } });
   res.json(data);
});

// findOneAndDelete
// Tìm tài liệu theo điều kiện, nếu có nhiều tài liệu thoải mãn điều kiện thì 
// sẽ trả về tài liệu đầu tiên thỏa mãn và xóa nó
router.get('/findOneDeleteProduct', async function (req, res, next) {
   var price = req.query.price;
   var data = await modelProduct.findOneAndDelete({ price: { $gte: price } });
   res.json(data);
});

// findOneAndReplace
router.get('/findOneReplaceProduct', async function (req, res, next) {
   // productReplace = {
   //    id: 10,
   //    name: "Hoho",
   //    price: 40000
   // }
   var price = req.query.price;
   var data = await modelProduct.findOneAndReplace({ price: { $gte: price } }, productReplace);
   res.json(data);
});

// findOneAndUpdate
// Tìm tài liệu phù hợp và cập nhập theo đối số cập nhập
router.get('/findOneUpdateProduct', async function (req, res, next) {
   var price = req.query.price;
   var data = await modelProduct.findOneAndReplace({ price: { $gte: price } }, { name: "Bánh tiêu", price: 3000 });
   res.json(data);
});

// Lấy ra danh sách các sp có giá tiền dưới x đồng
// (trong đó x là tiền người dùng truyền vào API)
// Lấy ra danh sách các sản phẩm trong khoảng từ x đến y
router.get('/search', async function (req, res, next) {
   try {
      // Cách gọi dữ liệu 1:
      // var x = req.query.min;
      // var y = req.query.max;

      // Cách gọi dữ liệu 2:
      var { min, max } = req.query;
      var data = await modelProduct.find({ price: { $lte: max, $gte: min } });
      res.json(data);
   } catch (e) {
      res.json({ status: -1, message: "Không lấy được danh sách!" })
   }
});

// Method: POST
// 1 API có thể tạo ra giống nhau về đường link, nhưng khác nhau về get/post/delete/put thực hiện các nhiệm vụ khác nhau
// Add produt
router.post("/add", async (req, res) => {
   try {
      var { 
         name_pro,
         cate_id,
         price_pro,
         sale_pro,
         image_pro,
         trending_pro,
         description_pro 
      } = req.body;
      var addProduct = { 
         name_pro,
         cate_id,
         price_pro,
         sale_pro,
         image_pro,
         trending_pro,
         description_pro 
      };
      var result = await modelProduct.create(addProduct);
      console.log(result);
      if (result != null) {
         res.json({ status: 1, message: "Success!" });
      } else {
         res.json({ status: 0, message: "Fail!" });
      }
   } catch (e) {
      res.json({ status: -1, message: "Error!" });
   }
})

// Update product
router.post("/update", async (req, res) => {
   try {
      var { id, name, price } = req.body;
      var productEdit = await modelProduct.findById(id);
      if (productEdit != null) {
         productEdit.name = name ? name : productEdit.name;
         productEdit.price = price ? price : productEdit.price;

         var result = await productEdit.save();
         if (result != null) {
            res.json({ status: 1, message: "Success!" });
         } else {
            res.json({ status: 0, message: "Fail!" });
         }
      } else {
         res.json({ status: 0, message: "Error!" });
      }
   } catch (e) {
      res.json({ status: 0, message: "Error!" });
   }
});

// Delete product
router.get('/delete', async (req, res) => {
   try {
      var { id } = req.query;
      var result = await modelProduct.findByIdAndDelete(id);
      if (result != null) {
         res.json({ status: 1, message: "Success!" });
      } else {
         res.json({ status: 0, message: "Error!" });
      }
   } catch (e) {
      res.json({ status: 0, message: "Error catch!" });
   }
});

// Upload image
router.post('/upload', [upload.single('image')],
   async (req, res, next) => {
      try {
         const { file } = req;
         if (!file) {
            return res.json({ status: 0, link: "" });
         } else {
            // Lưu ý đường link: nó chính là địa chỉ IP máy của mình
            // Nếu chạy bằng localhost thì thay dãy số bằng "localhost"
            const url = `http://localhost:3000/images/${file.filename}`;
            return res.json({ status: 1, url: url });
         }
      } catch (error) {
         console.log('Upload image error: ', error);
         return res.json({ status: 0, link: "" });
      }
   });
