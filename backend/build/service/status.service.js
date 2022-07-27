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
exports.get = exports.create = void 0;
const Status_1 = require("../models/Status");
const create = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield Status_1.Status.create({
        title: payload
    });
    return data;
});
exports.create = create;
const get = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield Status_1.Status.findAll();
    return data.map(item => {
        return {
            id: item.status_id,
            label: item.title
        };
    });
});
exports.get = get;
