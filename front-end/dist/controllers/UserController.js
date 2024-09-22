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
exports.UserController = void 0;
const User_1 = require("../models/User");
const Order_1 = require("../models/Order");
class UserController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let email_login = req.body.email_login;
            let password_login = req.body.password_login;
            let id_user = JSON.parse(localStorage.getItem('user') || '{"id": -1}').id;
            let cart = yield Order_1.Order.checkCart(id_user);
            // Nếu chưa có giỏ hàng
            // Tạo 1 mảng trống, 0 có sản phẩm
            if (!cart) {
                cart = new Order_1.Order([]);
            }
            // Xử lý đăng nhập
            // Gửi dữ liệu -> Xử lý đăng nhập
            if (email_login && password_login) {
                let user = new User_1.User(email_login, password_login);
                if (yield user.login()) {
                    // Đăng nhập thành công -> Về Home
                    localStorage.setItem('user', JSON.stringify(user));
                    res.redirect("/");
                }
                else {
                    // Đăng nhập không thành công
                    res.render("user_login", {
                        title: "Account",
                        cart: cart,
                        titleToast: "Error",
                        messageToast: "Login unsuccessful!",
                        typeToast: "error",
                        durationToast: 5000,
                    });
                }
            }
            else {
                // Không gửi dữ liệu -> Load View
                res.render("user_login", {
                    title: "Account",
                    cart: cart,
                    titleToast: "Wellcome customer",
                    messageToast: "Please log in to your account!",
                    typeToast: "welcome",
                    durationToast: 5000,
                });
            }
        });
    }
    logout(req, res) {
        localStorage.removeItem('user');
        res.redirect('/login');
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id_user = JSON.parse(localStorage.getItem('user') || '{"id": -1}').id;
            let cart = yield Order_1.Order.checkCart(id_user);
            // Nếu chưa có giỏ hàng
            // Tạo 1 mảng trống, 0 có sản phẩm
            if (!cart) {
                cart = new Order_1.Order([]);
            }
            let name_register = req.body.name_register;
            let email_register = req.body.email_register;
            let password_register = req.body.password_register;
            let password_confirm = req.body.password_confirm;
            // Xử lý chức năng đăng ký
            if (name_register && email_register && password_register && password_confirm) {
                let titleToast = "";
                let messageToast = "";
                let typeToast = "";
                let durationToast = 0;
                if (password_register == password_confirm) {
                    let user = new User_1.User(email_register, password_register, name_register, "User");
                    if (yield user.register()) {
                        // Đăng ký thành công -> Về trang đăng nhập
                        res.redirect("/login");
                        // res.render("user_login", {
                        //    title: "Account",
                        //    cart: cart,
                        //    titleToast: "Success",
                        //    messageToast: "Account registration successful!",
                        //    typeToast: "success",
                        //    durationToast: 5000,
                        // });
                    }
                    else {
                        // Đăng ký không thành công -> Báo lỗi
                        titleToast = "Error";
                        messageToast = "Account registration failed!";
                        typeToast = "error";
                        durationToast = 5000;
                    }
                }
                else {
                    // Mật khẩu không khớp -> Báo lỗi
                    titleToast = "Error";
                    messageToast = "Password mismatch!";
                    typeToast = "error";
                    durationToast = 5000;
                }
                res.render("user_register", {
                    title: "Account",
                    cart: cart,
                    titleToast: titleToast,
                    messageToast: messageToast,
                    typeToast: typeToast,
                    durationToast: durationToast,
                });
            }
            else {
                res.render("user_register", {
                    title: "Account",
                    cart: cart,
                    titleToast: "Welcome customer",
                    messageToast: "Please fill in registration information!",
                    typeToast: "welcome",
                    durationToast: 5000
                });
            }
        });
    }
}
exports.UserController = UserController;
