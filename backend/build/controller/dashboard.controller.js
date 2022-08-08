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
const dashboard_service_1 = require("../service/dashboard.service");
const ErrorSite_service_1 = require("../service/ErrorSite.service");
class DashboardController {
    get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { page, limit } = req.query;
                const data = yield (0, dashboard_service_1.get)({ page, limit });
                return res.status(200).json(data);
            }
            catch (e) {
                console.log(e);
                return res.status(500).json(e);
            }
        });
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const newData = yield (0, dashboard_service_1.create)(data);
                return res.status(200).json({ newData, message: 'Запись добавлена' });
            }
            catch (e) {
                console.log(e);
                return res.status(500).json(e);
            }
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { payload } = req.body;
                const deleted = yield (0, dashboard_service_1.deleteData)(payload);
                return res.status(200).json({ message: "Запись удалена" });
            }
            catch (e) {
                return res.status(500).json(e);
            }
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0, dashboard_service_1.update)(req.body);
                return res.status(200).json({ updateData: data, message: 'Запись обновлена' });
            }
            catch (e) {
                console.log(e);
                return res.status(500).json(e);
            }
        });
    }
    find(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { query } = req.query;
                const search = query;
                const data = yield (0, dashboard_service_1.find)(search);
                return res.status(200).json(data);
            }
            catch (e) {
                return res.status(500).json(e);
            }
        });
    }
    filter(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.query;
                const data = yield (0, dashboard_service_1.filter)(id);
                return res.status(200).json(data);
            }
            catch (e) {
                return res.status(500).json(e);
            }
        });
    }
    reset(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0, dashboard_service_1.reset)();
                return res.status(200).json(data);
            }
            catch (e) {
                return res.status(500).json(e);
            }
        });
    }
    getUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0, ErrorSite_service_1.getUser)();
                return res.status(200).json(data);
            }
            catch (e) {
                return res.status(500).json(e);
            }
        });
    }
}
exports.default = new DashboardController();
