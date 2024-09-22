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
exports.PageController = void 0;
const Product_1 = require("../models/Product");
const Order_1 = require("../models/Order");
class PageController {
    // Req là yêu cầu, Res là kết quả trả về
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let listProductTrending = yield Product_1.Product.getAllByTrending('1');
            let listProductOur = yield Product_1.Product.getAllByTrending('0');
            let id_user = JSON.parse(localStorage.getItem('user') || '{"id": -1}')._id;
            let cart = yield Order_1.Order.checkCart(id_user);
            // // Nếu chưa có giỏ hàng
            // // Tạo 1 mảng trống, 0 có sản phẩm
            if (!cart) {
                cart = new Order_1.Order([]);
            }
            res.render("page_index", {
                title: "Home",
                listProductTrending: listProductTrending,
                listProductOur: listProductOur,
                cart: cart
            });
        });
    }
}
exports.PageController = PageController;
