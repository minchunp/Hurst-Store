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
exports.Product = void 0;
const Database_1 = require("./../Database");
let DB = new Database_1.Database();
class Product {
    static delete(id) {
        throw new Error("Method not implemented.");
    }
    constructor(name_pro, price_pro, sale_pro, image_pro, trending_pro, description_pro) {
        this.quantity_pro = 0;
        this.size_pro = "";
        this.name_pro = name_pro;
        this.price_pro = price_pro;
        this.sale_pro = sale_pro;
        this.image_pro = image_pro;
        this.trending_pro = trending_pro;
        this.description_pro = description_pro;
    }
    copy(product) {
        this._id = product._id;
        this.cate_id = product.cate_id;
        this.name_pro = product.name_pro;
        this.price_pro = product.price_pro;
        this.sale_pro = product.sale_pro;
        this.image_pro = product.image_pro;
        this.trending_pro = product.trending_pro;
        this.description_pro = product.description_pro;
    }
    // Method
    static getProductLists() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield DB.getData(`/product-api/getProductLists`);
            // return await DB.getData(`/products`);
        });
    }
    static getAllByTrending(trending_pro) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield DB.getData(`/product-api/getByTrending?trending_pro=${trending_pro}`);
            // return await DB.getData(`/products?trending_pro=${trending_pro}`);
        });
    }
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield DB.getData(`/product-api/getById?id=${id}`);
        });
    }
    static getByPrice() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield DB.getData(`/product-api/getListByPrice`);
        });
    }
    getDetail() {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield DB.getData(`/product-api/getById?id=${this._id}`);
            this.name_pro = data.name_pro;
            this.price_pro = data.price_pro;
            this.sale_pro = data.sale_pro;
            this.image_pro = data.image_pro;
            this.trending_pro = data.trending_pro;
            this.description_pro = data.description_pro;
        });
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield DB.updateData(`/product-api/updateProduct`, this);
        });
    }
    add() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield DB.insertData(`/product-api/addProduct`, this);
        });
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield DB.deleteData(`/product-api/deleteProduct`, this);
        });
    }
}
exports.Product = Product;
