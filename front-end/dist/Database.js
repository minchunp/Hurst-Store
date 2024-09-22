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
exports.Database = void 0;
class Database {
    constructor() {
        this.APIurl = "http://localhost:3000";
    }
    getData(url) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield fetch(this.APIurl + url, {
                method: 'GET'
            }).then((res) => res.json());
        });
    }
    insertData(url, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield fetch(this.APIurl + url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            }).then((res) => res.json());
        });
    }
    updateData(url, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield fetch(this.APIurl + url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            }).then((res) => res.json());
        });
    }
    deleteData(url, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield fetch(this.APIurl + url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            }).then((res) => res.json());
        });
    }
}
exports.Database = Database;
