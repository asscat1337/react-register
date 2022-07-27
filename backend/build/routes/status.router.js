"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusRouter = void 0;
const express_1 = require("express");
const service_controller_1 = __importDefault(require("../controller/service.controller"));
const statusRouter = (0, express_1.Router)();
exports.statusRouter = statusRouter;
statusRouter.post('/create', service_controller_1.default.create);
statusRouter.get('/get', service_controller_1.default.get);
