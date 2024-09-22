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
exports.OrderController = void 0;
const Order_1 = require("../models/Order");
const User_1 = require("../models/User");
class OrderController {
    cart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id_user = JSON.parse(localStorage.getItem('user') || '{"id": -1}')._id;
            let cart = yield Order_1.Order.checkCart(id_user);
            // Nếu chưa có giỏ hàng
            // Tạo 1 mảng trống, 0 có sản phẩm
            if (!cart) {
                cart = new Order_1.Order([]);
            }
            res.render('product_cart', {
                title: "Cart",
                cart: cart,
                titleToast: "Wellcome customer",
                messageToast: "This is your shopping cart page!",
                typeToast: "welcome",
                durationToast: 5000,
            });
        });
    }
    updateCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id_user = JSON.parse(localStorage.getItem('user') || '{"id": -1}')._id;
            let cartData = yield Order_1.Order.checkCart(id_user);
            let cart = new Order_1.Order();
            if (cartData) {
                cart.copy(cartData);
            }
            let indexPro = Number(req.params.index);
            if (cart.products) {
                if (req.params.action == "inc") {
                    cart.products[indexPro].quantity_pro++;
                }
                else if (req.params.action == "dec") {
                    if (cart.products[indexPro].quantity_pro <= 1) {
                        cart.products.splice(indexPro, 1);
                    }
                    else {
                        cart.products[indexPro].quantity_pro--;
                    }
                }
                else if (req.params.action == "delete") {
                    cart.products.splice(indexPro, 1);
                }
            }
            yield cart.update();
            res.redirect('/cart');
        });
    }
    checkout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id_user = JSON.parse(localStorage.getItem('user') || '{"id": -1}')._id;
            let cartData = yield Order_1.Order.checkCart(id_user);
            let order = new Order_1.Order();
            if (cartData) {
                order.copy(cartData);
                if (order.products && order.products.length > 0) {
                    let user_info = yield User_1.User.getUserById(id_user);
                    const email_user = user_info.email_user;
                    const name_user = user_info.name_user;
                    const subject = "Dear " + name_user;
                    const content = `<p style="line-height: 30px;">Thank you for choosing HURST. We appreciate your recent purchase and would love to hear about your experience. <br>Your satisfaction is crucial to us. Could you spare a moment to share your thoughts on the product/service and your overall experience? Your feedback helps us improve. <br>Reply to this email with your feedback. We look forward to serving you again. <br>Best, <br><h3 style="color: #c8a165;">HURST</h3></p>`;
                    const mainInfor_mail = {
                        email: email_user,
                        subject: subject,
                        content: content
                    };
                    let orderTotal = 0;
                    order.products.forEach(pro => {
                        let total = 0;
                        if (pro.sale_pro && pro.price_pro) {
                            if (pro.sale_pro < pro.price_pro) {
                                total += pro.sale_pro;
                            }
                            else {
                                total += pro.price_pro;
                            }
                        }
                        orderTotal += total * pro.quantity_pro;
                    });
                    order.total_order = orderTotal;
                    order.date_order = new Date().toLocaleString('sv-SE');
                    order.status_order = 'order';
                    yield order.sendMailToCustomer(mainInfor_mail);
                    yield order.update();
                    res.render('product_cart', {
                        title: "Cart",
                        cart: order,
                        titleToast: "Success",
                        messageToast: "Your order has been placed successfully!",
                        typeToast: "success",
                        durationToast: 5000,
                    });
                }
                else if (order.products && order.products.length == 0) {
                    res.render('product_cart', {
                        title: "Cart",
                        cart: order,
                        titleToast: "Error",
                        messageToast: "There are no products in your shopping cart!",
                        typeToast: "error",
                        durationToast: 5000,
                    });
                }
            }
        });
    }
}
exports.OrderController = OrderController;
