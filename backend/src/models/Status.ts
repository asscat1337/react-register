import {Table, Column, Model, DataType, AutoIncrement, AllowNull, PrimaryKey, HasMany} from "sequelize-typescript";
import {RequestRegister} from "./RequestRegister";


@Table({
    timestamps:false,
    freezeTableName:true,
    tableName:'status'
})
export class Status extends Model {
    @AutoIncrement
    @AllowNull(false)
    @PrimaryKey
    @Column({type:DataType.INTEGER})
    status_id: number | undefined

    @AllowNull(false)
    @Column(DataType.TEXT)
    title: string | undefined

    @HasMany(()=>RequestRegister,'statusId')
    requestRegisters?:RequestRegister[]
}