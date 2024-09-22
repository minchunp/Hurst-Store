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
exports.Order = void 0;
const Database_1 = require("../Database");
let DB = new Database_1.Database();
class Order {
    constructor(products, user_id) {
        this.user_id = user_id;
        this.products = products;
        this.date_order = new Date().toLocaleString("sv-SE");
        this.total_order = 0;
        this.status_order = 'cart';
    }
    copy(order) {
        this._id = order._id;
        this.user_id = order.user_id;
        this.products = order.products;
        this.name_user = order.name_user;
        this.date_order = order.date_order;
        this.total_order = order.total_order;
        this.status_order = order.status_order;
    }
    static checkCart(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = (yield DB.getData(`/order-api/checkCart?id_user=${user_id}`));
            if (data.length == 0) {
                // Chưa có giỏ hàng
                return false;
            }
            else {
                // Đã có cart -> cập nhập dữ liệu và trả về True
                return data[0];
            }
        });
    }
    putInDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield DB.insertData(`/order-api/addOrder`, this);
        });
    }
    addProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.products) {
                let inCart = false; // Giả sử sản phẩm không có trong giỏ hàng
                for (const pro of this.products) {
                    if (pro._id == product._id && pro.size_pro == product.size_pro) {
                        inCart = true;
                        pro.quantity_pro += product.quantity_pro;
                        break;
                    }
                }
                if (!inCart) {
                    this.products.push(product);
                }
            }
            return yield DB.updateData(`/order-api/updateOrder`, this);
        });
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield DB.updateData(`/order-api/updateOrder`, this);
        });
    }
    static getOrderLists() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield DB.getData(`/order-api/getOrderLists`);
        });
    }
    static getNewOrderPending() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield DB.getData(`/order-api/getNewOrderPending`);
        });
    }
    static getNewOrderPendingWithLimit() {
        return __awaiter(this, arguments, void 0, function* (limit = -1) {
            return yield DB.getData(`/order-api/getNewOrderPendingWithLimit?limit=${limit}`);
        });
    }
    sendMailToCustomer(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield DB.insertData(`/order-api/send-mail`, data);
        });
    }
    getDetail() {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield DB.getData(`/order-api/getOrderById?id=${this._id}`);
            this.products = data.products;
            this.user_id = data.user_id;
            this.name_user = data.name_user;
            this.date_order = data.date_order;
            this.total_order = data.total_order;
            this.status_order = data.status_order;
        });
    }
}
exports.Order = Order;
