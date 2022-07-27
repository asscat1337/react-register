"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectRoute = void 0;
const jsonwebtoken_service_1 = require("../service/jsonwebtoken.service");
const protectRoute = (req, res, next) => {
    const headers = req.headers.authorization;
    const token = headers === null || headers === void 0 ? void 0 : headers.split(' ')[1];
    if (!headers || !token) {
        return res.status(401).json({
            message: "Ошибка авторизации"
        });
    }
    const verify = (0, jsonwebtoken_service_1.validateAccess)(token);
    if (!verify) {
        return res.status(401).json({
            message: 'Не валидный токен'
        });
    }
    req.user = verify;
    next();
};
exports.protectRoute = protectRoute;
