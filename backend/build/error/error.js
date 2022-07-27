"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError extends Error {
    constructor({ auth, message }) {
        super();
        this.auth = auth;
        this.message = message;
    }
}
exports.CustomError = CustomError;
