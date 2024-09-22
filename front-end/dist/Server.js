"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const PageController_1 = require("./controllers/PageController");
const UserController_1 = require("./controllers/UserController");
const ProductController_1 = require("./controllers/ProductController");
const node_localstorage_1 = require("node-localstorage");
const AdminController_1 = require("./controllers/AdminController");
const OrderController_1 = require("./controllers/OrderController");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = 5001;
    }
    start() {
        global.localStorage = new node_localstorage_1.LocalStorage('./storage');
        this.app.set("view engine", "ejs");
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
        this.app.use("/public", express_1.default.static("public"));
        this.app.use(function (req, res, next) {
            res.locals.user = JSON.parse(localStorage.getItem('user') || '{"id":-1}');
            next();
        });
        this.app.get("/", new PageController_1.PageController().index);
        this.app.get("/login", new UserController_1.UserController().login);
        this.app.post("/login", new UserController_1.UserController().login);
        this.app.get("/logout", new UserController_1.UserController().logout);
        this.app.get("/register", new UserController_1.UserController().register);
        this.app.post("/register", new UserController_1.UserController().register);
        this.app.get("/detail/:id", new ProductController_1.ProductController().detail);
        this.app.post("/detail/:id", new ProductController_1.ProductController().addToCart);
        this.app.get("/cart", new OrderController_1.OrderController().cart);
        this.app.get("/cart/:index/:action", new OrderController_1.OrderController().updateCart);
        this.app.get("/cart/checkout", new OrderController_1.OrderController().checkout);
        this.app.get("/admin", new AdminController_1.AdminController().dashboard);
        this.app.get("/admin/order", new AdminController_1.AdminController().order);
        this.app.get("/admin/order/:id", new AdminController_1.AdminController().orderDetail);
        this.app.post("/admin/order/:id", new AdminController_1.AdminController().updateStatus);
        this.app.get("/admin/product", new AdminController_1.AdminController().product);
        this.app.get("/admin/product/add", new AdminController_1.AdminController().addProduct);
        this.app.post("/admin/product/add", new AdminController_1.AdminController().addProduct);
        this.app.get("/admin/product/:id/update", new AdminController_1.AdminController().updateProduct);
        this.app.post("/admin/product/:id/update", new AdminController_1.AdminController().updateProduct);
        this.app.get("/admin/product/:id/delete", new AdminController_1.AdminController().deleteProduct);
        this.app.get("/admin/user", new AdminController_1.AdminController().user);
        this.app.get("/admin/user/add", new AdminController_1.AdminController().addUser);
        this.app.post("/admin/user/add", new AdminController_1.AdminController().addUser);
        this.app.get("/admin/user/:id/update", new AdminController_1.AdminController().updateUser);
        this.app.post("/admin/user/:id/update", new AdminController_1.AdminController().updateUser);
        this.app.get("/admin/user/:id/delete", new AdminController_1.AdminController().deleteUser);
        this.app.listen(this.port, () => {
            console.log(`Link app: http://localhost:${this.port}`);
        });
    }
}
exports.Server = Server;
