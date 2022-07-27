"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorSiteRouter = void 0;
const express_1 = require("express");
const ErrorSite_controller_1 = __importDefault(require("../controller/ErrorSite.controller"));
const ErrorSiteRouter = (0, express_1.Router)();
exports.ErrorSiteRouter = ErrorSiteRouter;
ErrorSiteRouter.post('/create', ErrorSite_controller_1.default.create);
ErrorSiteRouter.get('/get', ErrorSite_controller_1.default.get);
ErrorSiteRouter.put('/update', ErrorSite_controller_1.default.update);
ErrorSiteRouter.delete('/delete', ErrorSite_controller_1.default.deleteData);
ErrorSiteRouter.get('/search', ErrorSite_controller_1.default.search);
