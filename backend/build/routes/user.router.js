"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controller/user.controller"));
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
userRouter.post('/login', user_controller_1.default.login);
userRouter.post('/register', user_controller_1.default.register);
userRouter.get('/logout', user_controller_1.default.logout);
userRouter.get('/refresh', user_controller_1.default.refresh);
