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
exports.start = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const RequestRegister_1 = require("../models/RequestRegister");
const Status_1 = require("../models/Status");
const User_1 = require("../models/User");
const ErrorSite_1 = require("../models/ErrorSite");
const { DB_PASSWORD, DB, DB_USER, DB_HOST } = process.env;
const password = DB_PASSWORD;
const db = DB;
const user = DB_USER;
const host = DB_HOST;
const connection = new sequelize_typescript_1.Sequelize({
    database: db,
    dialect: "mysql",
    username: user,
    host,
    password,
    models: [RequestRegister_1.RequestRegister, Status_1.Status, User_1.User, ErrorSite_1.ErrorSite]
});
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connection.authenticate();
        yield connection.sync({ alter: true });
    }
    catch (e) {
        console.log(e);
    }
});
exports.start = start;
start();
