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
const user_service_1 = require("../service/user.service");
class UserController {
    register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0, user_service_1.register)(req.body);
                res.cookie('cookie', data.token.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
                return res.status(200).json(data);
            }
            catch (e) {
                console.log(e);
                return res.status(500).json(e);
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const {token} = req.query
                // const validateTokenAccess = validateAccess(token)
                // console.log(validateTokenAccess)
                // if(!validateTokenAccess){
                //     console.log('test')
                //     return res.status(401).json({message:'НЕ ВАЛИДНЫЙ ТОКЕН'})
                // }
                const data = yield (0, user_service_1.loginUser)(req.body);
                res.cookie('cookie', data.token.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
                return res.status(200).json(data);
            }
            catch (e) {
                return res.status(500).json(e);
            }
        });
    }
    logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            res.clearCookie('token');
            return res.status(200).json({ message: 'logout' });
        });
    }
    refresh(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { token } = req.cookies;
                console.log(token);
            }
            catch (e) {
                return res.status(500).json(e);
            }
        });
    }
}
exports.default = new UserController();
