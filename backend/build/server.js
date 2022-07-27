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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const connection_1 = require("./core/connection");
const routes_1 = require("./routes");
const helmet_1 = __importDefault(require("helmet"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_ADDRESS,
    credentials: true
}));
app.use((0, cookie_parser_1.default)());
app.use('/api', routes_1.router);
if (process.env.PRODUCTION_ENV === 'production') {
    app.use((0, helmet_1.default)());
    app.get('*', (req, res) => {
        console.log(path_1.default.resolve('../..', 'build', 'index.html'));
        res.sendFile(path_1.default.resolve('../..', 'build', 'index.html'));
    });
}
app.listen(process.env.PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(process.env.PRODUCTION_ENV);
    console.log(`server started`);
    yield (0, connection_1.start)();
}));
