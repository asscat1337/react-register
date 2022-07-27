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
exports.RequestRegister = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Status_1 = require("./Status");
let RequestRegister = class RequestRegister extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AllowNull,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], RequestRegister.prototype, "request_id", void 0);
__decorate([
    sequelize_typescript_1.AllowNull,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
    __metadata("design:type", String)
], RequestRegister.prototype, "description", void 0);
__decorate([
    sequelize_typescript_1.AllowNull,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATEONLY),
    __metadata("design:type", Date)
], RequestRegister.prototype, "start_date", void 0);
__decorate([
    sequelize_typescript_1.AllowNull,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATEONLY),
    __metadata("design:type", Date)
], RequestRegister.prototype, "end_date", void 0);
__decorate([
    sequelize_typescript_1.AllowNull,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], RequestRegister.prototype, "numberRequest", void 0);
__decorate([
    sequelize_typescript_1.AllowNull,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], RequestRegister.prototype, "author", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
    __metadata("design:type", String)
], RequestRegister.prototype, "comment", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Status_1.Status),
    sequelize_typescript_1.AllowNull,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], RequestRegister.prototype, "statusId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Status_1.Status, 'statusId'),
    __metadata("design:type", Status_1.Status)
], RequestRegister.prototype, "status", void 0);
RequestRegister = __decorate([
    (0, sequelize_typescript_1.Table)({
        freezeTableName: true,
        timestamps: false,
        tableName: 'requestRegister'
    })
], RequestRegister);
exports.RequestRegister = RequestRegister;
