import {
    Table,
    Model,
    Column,
    AllowNull,
    AutoIncrement,
    PrimaryKey,
    DataType,
    ForeignKey, BelongsTo
} from "sequelize-typescript";
import {Status} from "./Status";

@Table({
    freezeTableName: true,
    timestamps: false,
    tableName:'requestRegister'
})

export class RequestRegister extends Model {
    @AutoIncrement
    @PrimaryKey
    @AllowNull
    @Column
    request_id?: number

    @AllowNull
    @Column(DataType.TEXT)
    description?: string

    @AllowNull
    @Column(DataType.DATEONLY)
    start_date?: Date

    @AllowNull
    @Column(DataType.DATEONLY)
    end_date?: Date

    @AllowNull
    @Column(DataType.STRING)
    numberRequest?: string

    @AllowNull
    @Column(DataType.STRING)
    author?:string

    @Column(DataType.TEXT)
    comment?:string


    @ForeignKey(()=>Status)
    @AllowNull
    @Column
    statusId?:number

    @BelongsTo(()=>Status,'statusId')
    status?:Status
}