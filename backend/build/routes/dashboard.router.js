"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardRouter = void 0;
const express_1 = require("express");
const dashboard_controller_1 = __importDefault(require("../controller/dashboard.controller"));
const dashboardRouter = (0, express_1.Router)();
exports.dashboardRouter = dashboardRouter;
dashboardRouter.get('/get', dashboard_controller_1.default.get);
dashboardRouter.post('/create', dashboard_controller_1.default.create);
dashboardRouter.delete('/delete', dashboard_controller_1.default.delete);
dashboardRouter.put('/update', dashboard_controller_1.default.update);
dashboardRouter.get('/find', dashboard_controller_1.default.find);
dashboardRouter.get('/filter', dashboard_controller_1.default.filter);
dashboardRouter.get('/reset', dashboard_controller_1.default.reset);
dashboardRouter.get('/get-users', dashboard_controller_1.default.getUsers);
