"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Status = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const RequestRegister_1 = require("./RequestRegister");
let Status = class Status extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Object)
], Status.prototype, "status_id", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
    __metadata("design:type", Object)
], Status.prototype, "title", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => RequestRegister_1.RequestRegister, 'statusId'),
    __metadata("design:type", Array)
], Status.prototype, "requestRegisters", void 0);
Status = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: false,
        freezeTableName: true,
        tableName: 'status'
    })
], Status);
exports.Status = Status;
