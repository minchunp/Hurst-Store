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
exports.User = void 0;
const Database_1 = require("../Database");
let DB = new Database_1.Database();
class User {
    constructor(email_user, pass_user, name_user, role_user) {
        this.email_user = email_user;
        this.pass_user = pass_user;
        this.name_user = name_user;
        this.role_user = role_user;
    }
    // Method
    login() {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield DB.getData(`/user-api/getUserByEmailAndPass?email_user=${this.email_user}&pass_user=${this.pass_user}`);
            console.log(data);
            if (data.length == 1) {
                // Đăng nhập thành công
                this._id = data[0]._id;
                this.name_user = data[0].name_user;
                this.role_user = data[0].role_user;
                return true;
            }
            else {
                // Đăng nhập thất bại
                return false;
            }
        });
    }
    register() {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield DB.insertData(`/user-api/addUser`, this);
            return data.status;
            // Kiểm tra xem có 'id' trong data không
        });
    }
    static getUserById(id_user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield DB.getData(`/user-api/getUserById?id=${id_user}`);
        });
    }
    static getUserLists() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield DB.getData(`/user-api/getUserLists`);
        });
    }
    add() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield DB.insertData(`/user-api/addUser`, this);
        });
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield DB.updateData(`/user-api/updateUser`, this);
        });
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield DB.deleteData(`/user-api/deleteUser`, this);
        });
    }
    getDetail() {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield DB.getData(`/user-api/getUserById?id=${this._id}`);
            this.email_user = data.email_user;
            this.pass_user = data.pass_user;
            this.name_user = data.name_user;
            this.role_user = data.role_user;
        });
    }
}
exports.User = User;
