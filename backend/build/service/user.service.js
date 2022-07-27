"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.register = void 0;
const User_1 = require("../models/User");
const bcrypt = __importStar(require("bcrypt"));
const jsonwebtoken_service_1 = require("./jsonwebtoken.service");
const error_1 = require("../error/error");
const register = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const findUser = yield User_1.User.findOne({
        where: {
            login: payload.login
        },
        raw: true
    });
    if (findUser) {
        throw new Error('такой пользователь уже существует');
    }
    const hashedPassword = yield bcrypt.hash(payload.password, 3);
    const data = yield User_1.User.create(Object.assign(Object.assign({}, payload), { password: hashedPassword }));
    const token = (0, jsonwebtoken_service_1.generateToken)(data);
    return {
        user: data,
        token
    };
});
exports.register = register;
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { login, password } = payload;
    const findUser = yield User_1.User.findOne({
        where: {
            login
        },
        raw: true
    });
    const decodePassword = yield bcrypt.compare(password, findUser === null || findUser === void 0 ? void 0 : findUser.password);
    console.log(decodePassword);
    if (!decodePassword) {
        throw new error_1.CustomError({ auth: false, message: 'неверный пароль' });
    }
    if (!findUser) {
        throw new error_1.CustomError({
            message: 'Такого пользователя не существует',
            auth: false
        });
    }
    const { password: pas } = findUser, rest = __rest(findUser, ["password"]);
    const token = (0, jsonwebtoken_service_1.generateToken)(rest);
    return {
        user: rest,
        token
    };
});
exports.loginUser = loginUser;
const refresh = (payload) => {
};
