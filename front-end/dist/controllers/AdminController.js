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
exports.AdminController = void 0;
const Order_1 = require("../models/Order");
const User_1 = require("../models/User");
const Product_1 = require("../models/Product");
class AdminController {
    dashboard(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let orderPendingLists = yield Order_1.Order.getNewOrderPending();
            let orderPendingListsWithLimit = yield Order_1.Order.getNewOrderPendingWithLimit(10);
            let orderLists = yield Order_1.Order.getOrderLists();
            let totalSale = 0;
            orderLists.forEach((order) => {
                var _a;
                let pricePro = 0;
                (_a = order.products) === null || _a === void 0 ? void 0 : _a.forEach((pro) => {
                    if (pro.price_pro && pro.sale_pro) {
                        pricePro += (pro.sale_pro < pro.price_pro ? pro.sale_pro : pro.price_pro) * pro.quantity_pro;
                    }
                });
                totalSale += pricePro;
            });
            let userLists = yield User_1.User.getUserLists();
            res.render("admin_dashboard", {
                title: "Dashboard",
                orderPendingListsWithLimit: orderPendingListsWithLimit,
                orderPendingLists: orderPendingLists,
                orderLists: orderLists,
                userLists: userLists,
                totalSale: totalSale,
            });
        });
    }
    order(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let orderLists = yield Order_1.Order.getOrderLists();
            res.render("admin_order", {
                title: "Orders",
                orderLists: orderLists,
            });
        });
    }
    orderDetail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let _id = req.params.id;
            let order = new Order_1.Order();
            order._id = _id;
            yield order.getDetail();
            res.render("admin_order_detail", {
                title: "Order detail",
                order: order,
            });
        });
    }
    updateStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let statusUpdate = req.body.status;
            let _id = req.params.id;
            let order = new Order_1.Order();
            order._id = _id;
            yield order.getDetail();
            order.status_order = statusUpdate;
            yield order.update();
            res.redirect(`/admin/order/${_id}`);
        });
    }
    product(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let productLists = yield Product_1.Product.getProductLists();
            res.render("admin_product", {
                title: "Products",
                productLists: productLists,
            });
        });
    }
    addProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let name = req.body.name_product;
            let image = "hoathoaBright.jpg";
            let price = req.body.price_product;
            let sale = req.body.sale_product;
            let description = req.body.description_product;
            let trending = req.body.trending_product != undefined ? "1" : "0";
            if (name && image && price && sale && description && trending) {
                let product = new Product_1.Product(name, price, sale, image, trending, description);
                console.log(product);
                yield product.add();
                res.redirect(`/admin/product`);
            }
            res.render("admin_add_product", {
                title: "Add Product",
            });
        });
    }
    updateProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let _id = req.params.id;
            let pro = new Product_1.Product();
            pro._id = _id;
            yield pro.getDetail();
            let edit_name = req.body.edit_name;
            let edit_image = req.body.edit_image != "" ? req.body.edit_image : pro.image_pro;
            let edit_price = req.body.edit_price;
            let edit_sale = req.body.edit_sale;
            let edit_description = req.body.edit_description;
            let edit_trending = req.body.edit_trending != undefined ? "1" : "0";
            if (edit_name && edit_image && edit_price && edit_sale && edit_description && edit_trending) {
                pro.name_pro = edit_name;
                pro.image_pro = edit_image;
                pro.sale_pro = edit_sale;
                pro.price_pro = edit_price;
                pro.sale_pro = edit_sale;
                pro.description_pro = edit_description;
                pro.trending_pro = edit_trending;
                yield pro.update();
                res.redirect(`/admin/product/${_id}/update`);
            }
            res.render("admin_edit_product", {
                title: "Edit Product",
                pro: pro,
            });
        });
    }
    deleteProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            let pro = new Product_1.Product();
            pro._id = id;
            yield pro.getDetail();
            yield pro.delete();
            res.redirect(`/admin/product`);
        });
    }
    user(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let userLists = yield User_1.User.getUserLists();
            res.render('admin_user', {
                title: "Users",
                userLists: userLists
            });
        });
    }
    addUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let name_user = req.body.name_user;
            let email_user = req.body.email_user;
            let password_user = "user123";
            let role_user = req.body.role_user;
            if (name_user && email_user && role_user && password_user) {
                let user = new User_1.User(email_user, password_user, name_user, role_user);
                console.log(user);
                yield user.add();
                res.redirect(`/admin/user`);
            }
            res.render('admin_add_user', {
                title: 'Add User'
            });
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let _id = req.params.id;
            let user = new User_1.User();
            user._id = _id;
            yield user.getDetail();
            let name_user = req.body.name_user;
            let email_user = req.body.email_user;
            let role_user = req.body.role_user;
            if (name_user && email_user && role_user) {
                user.name_user = name_user;
                user.email_user = email_user;
                user.role_user = role_user;
                user.pass_user = user.pass_user;
                console.log(user);
                yield user.update();
                res.redirect(`/admin/user/${_id}/update`);
            }
            res.render('admin_edit_user', {
                title: "Edit User",
                user: user
            });
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            let user = new User_1.User();
            user._id = id;
            yield user.getDetail();
            yield user.delete();
            res.redirect(`/admin/user`);
        });
    }
}
exports.AdminController = AdminController;
