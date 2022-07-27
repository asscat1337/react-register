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
exports.getUser = exports.search = exports.get = exports.update = exports.deleteData = exports.create = void 0;
const ErrorSite_1 = require("../models/ErrorSite");
const sequelize_1 = require("sequelize");
const User_1 = require("../models/User");
const get = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit } = payload;
    const data = yield ErrorSite_1.ErrorSite.findAndCountAll({
        limit: +limit,
        offset: +page * +limit
    });
    return data;
});
exports.get = get;
const create = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield ErrorSite_1.ErrorSite.create(Object.assign({}, payload));
    return data;
});
exports.create = create;
const deleteData = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteInfo = payload.map((item) => __awaiter(void 0, void 0, void 0, function* () {
        yield ErrorSite_1.ErrorSite.destroy({
            where: {
                error_id: item
            }
        });
    }));
    return deleteInfo;
});
exports.deleteData = deleteData;
const update = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { end_time } = payload;
    const updateData = yield ErrorSite_1.ErrorSite.update(Object.assign(Object.assign({}, payload), { end_time }), {
        where: {
            error_id: payload.error_id
        }
    });
    console.log(updateData);
    const updatedData = yield ErrorSite_1.ErrorSite.findByPk(payload.error_id);
    return updatedData;
});
exports.update = update;
const search = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield ErrorSite_1.ErrorSite.findAll({
        where: {
            [sequelize_1.Op.or]: {
                description: {
                    [sequelize_1.Op.substring]: payload
                },
                date: {
                    [sequelize_1.Op.substring]: payload
                }
            }
        }
    });
    return data;
});
exports.search = search;
const getUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield User_1.User.findAll();
    return data.map(item => {
        return {
            id: item.user_id,
            label: item.fio
        };
    });
});
exports.getUser = getUser;
