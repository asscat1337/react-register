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
const ErrorSite_service_1 = require("../service/ErrorSite.service");
class ErrorSiteController {
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newData = yield (0, ErrorSite_service_1.create)(req.body);
                return res.status(200).json({ newData, message: "Запись добавлена" });
            }
            catch (e) {
                return res.status(500).json(e);
            }
        });
    }
    get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { page, limit } = req.query;
                const data = yield (0, ErrorSite_service_1.get)({ page, limit });
                console.log(data);
                return res.status(200).json(data);
            }
            catch (e) {
                console.log(e);
                return res.status(500).json(e);
            }
        });
    }
    deleteData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { payload } = req.body;
                const deleted = yield (0, ErrorSite_service_1.deleteData)(payload);
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
                const data = yield (0, ErrorSite_service_1.update)(req.body);
                return res.status(200).json({ data, message: "Запись обновлена" });
            }
            catch (e) {
                return res.status(500).json(e);
            }
        });
    }
    search(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.query;
                const data = yield (0, ErrorSite_service_1.search)(id);
                return res.status(200).json(data);
            }
            catch (e) {
                return res.status(500).json(e);
            }
        });
    }
}
exports.default = new ErrorSiteController();
