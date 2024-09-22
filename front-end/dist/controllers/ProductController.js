"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const Product_1 = require("../models/Product");
const Order_1 = require("../models/Order");
const User_1 = require("../models/User");
class ProductController {
    // Req là yêu cầu, Res là kết quả trả về
    detail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            let pro = (yield Product_1.Product.getById(id));
            let listProByPrice = (yield Product_1.Product.getByPrice());
            let id_user = JSON.parse(localStorage.getItem('user') || '{"id": -1}')._id;
            let cart = yield Order_1.Order.checkCart(id_user);
            // Nếu chưa có giỏ hàng
            // Tạo 1 mảng trống, 0 có sản phẩm
            if (!cart) {
                cart = new Order_1.Order([]);
            }
            res.render("product_detail", {
                title: "Product #" + id,
                cart: cart,
                pro: pro,
                listProByPrice: listProByPrice,
                titleToast: "Wellcome customer",
                messageToast: "This is the product detail page!",
                typeToast: "welcome",
                durationToast: 5000,
            });
        });
    }
    addToCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            let pro = (yield Product_1.Product.getById(id));
            let listProByPrice = (yield Product_1.Product.getByPrice());
            let quantity = req.body.quantity_product;
            let size = req.body.size_product;
            let productData = (yield Product_1.Product.getById(id));
            let product = new Product_1.Product();
            product.copy(productData);
            if (size) {
                product.size_pro = size;
            }
            else {
                product.size_pro = "S";
            }
            if (quantity) {
                product.quantity_pro = Number(quantity);
            }
            else {
                pro.quantity_pro = 1;
            }
            let id_user = JSON.parse(localStorage.getItem('user') || '{"id": -1}')._id;
            let user_order = yield User_1.User.getUserById(id_user);
            console.log(user_order);
            // Kiểm tra xem đã tồn tại giỏ hàng hay chưa
            let cart = (yield Order_1.Order.checkCart(id_user));
            console.log(cart);
            if (!cart) {
                // Nếu chưa có (idUser = user.id && status == 'cart')
                // => Thì tạo giỏ hàng
                cart = new Order_1.Order([product], id_user);
                cart.name_user = user_order.name_user;
                cart.putInDatabase();
            }
            else {
                // Nếu đã có -> Thêm sản phẩm vào giỏ hàng
                let cartData = cart;
                cart = new Order_1.Order();
                cart.copy(cartData);
                cart.addProduct(product);
            }
            res.render('product_detail', {
                title: "Product #" + id,
                pro: pro,
                cart: cart,
                listProByPrice: listProByPrice,
                titleToast: "Success",
                messageToast: "Added product to cart successfully!",
                typeToast: "success",
                durationToast: 5000,
            });
        });
    }
}
exports.ProductController = ProductController;
