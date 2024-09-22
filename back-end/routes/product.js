var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    var NSX = "FPT";
    var sanpham = { ten: "custas", gia: 5000 }
    res.render('viewproduct', { name: "Bánh Oshi", gia: 2000, nsx: NSX, sp: sanpham, ds: danhsach });
});
var danhsach = [
    { id: 1, ten: "custas", gia: 5000 },
    { id: 2, ten: "chocopie", gia: 5000 },
    { id: 3, ten: "quế", gia: 5000 }
]

// GET: hiển thị thông tin
// POST: 
// PUT
router.get('/add', function (req, res, next) {
    res.render('addProduct');
});

// localhost:3000/sanpham/add POST
// Xử lý chức năng thêm sản phẩm
//request= yêu cẩu, response= trả về,
router.post('/add', function (req, res, next) {
    var { tenSP, giaSP } = req.body;
    var _id = new Date().getTime();

    danhsach.push({ id: _id, ten: tenSP, gia: giaSP });
    res.redirect('/sanpham');
});

// Sửa
// localhost:3000/sanpham/edit?id=1
router.get('/edit', function (req, res, next) {
    var mapsp = req.query.id;
    var index = danhsach.findIndex(v => v.id == masp);
    res.render('editProduct'), { chitiet: danhsach[index] };
});
router.post('/edit', function (req, res, next) {
    var { tenSP, giaSP } = req.body;
    danhsach.push({ ten: tenSP, gia: giaSP });
    res.redirect('/sanpham');
});
module.exports = router;
router.get('/edit2/:id', function (req, res, next) {
    var mapsp = req.params.id;
    var index = danhsach.findIndex(v => v.id == mapsp);

    res.render('editProduct', { chitiet: danhsach[index] });
});

router.post('/thay-doi-thong-tin', function (req, res, next) {
    var { idSP, tenSP, giaSP } = req.body;
    var index = danhsach.findIndex(v => v.id = idSP);
    danhsach[index].ten = tenSP;
    danhsach[index].gia = giaSP;
    res.redirect('./');
});
// 
router.get('/del/:id', function (req, res, next) {
    var mapsp = req.params.id;
    var index = danhsach.findIndex(v => v.id == mapsp);
    danhsach.splice(index, 1);
    res.redirect('/sanpham');
});
module.exports = router;