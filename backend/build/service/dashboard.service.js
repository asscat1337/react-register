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
exports.reset = exports.filter = exports.find = exports.update = exports.deleteData = exports.get = exports.create = void 0;
const RequestRegister_1 = require("../models/RequestRegister");
const Status_1 = require("../models/Status");
const sequelize_1 = require("sequelize");
const create = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { statusId } = data;
    const newData = yield RequestRegister_1.RequestRegister.create(Object.assign(Object.assign({}, data), { statusId: statusId.id }));
    const getNewData = yield RequestRegister_1.RequestRegister.findOne({
        where: {
            request_id: newData.request_id
        },
        include: [{
                model: Status_1.Status
            }]
    });
    return getNewData;
});
exports.create = create;
const get = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page } = payload;
    const data = yield RequestRegister_1.RequestRegister.findAndCountAll({
        limit: +limit,
        offset: +page * +limit,
        include: [{
                model: Status_1.Status
            }]
    });
    return data;
});
exports.get = get;
const deleteData = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteData = payload.map((item) => __awaiter(void 0, void 0, void 0, function* () {
        yield RequestRegister_1.RequestRegister.destroy({
            where: {
                request_id: item
            }
        });
    }));
    return deleteData;
});
exports.deleteData = deleteData;
const update = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { statusId } = payload;
    yield RequestRegister_1.RequestRegister.update(Object.assign(Object.assign({}, payload), { statusId: statusId.status_id || statusId.id }), {
        where: {
            request_id: payload.request_id
        }
    });
    const updateData = yield RequestRegister_1.RequestRegister.findOne({
        where: {
            request_id: payload.request_id
        },
        include: [{
                model: Status_1.Status
            }]
    });
    return updateData;
});
exports.update = update;
const find = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield RequestRegister_1.RequestRegister.findAll({
        where: {
            [sequelize_1.Op.or]: [
                { description: {
                        [sequelize_1.Op.substring]: payload
                    } },
                { numberRequest: {
                        [sequelize_1.Op.substring]: payload
                    } },
                { author: {
                        [sequelize_1.Op.substring]: payload
                    } }
            ]
        }
    });
    return result;
});
exports.find = find;
const filter = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload);
    const data = yield RequestRegister_1.RequestRegister.findAll({
        where: {
            [sequelize_1.Op.or]: [
                { start_date: {
                        [sequelize_1.Op.substring]: payload
                    } },
                { end_date: {
                        [sequelize_1.Op.substring]: payload
                    } },
                { statusId: {
                        [sequelize_1.Op.substring]: payload
                    } }
            ]
        },
        include: [{
                model: Status_1.Status
            }]
    });
    return data;
});
exports.filter = filter;
const reset = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield get({ page: 0, limit: 5 });
    return data;
});
exports.reset = reset;
