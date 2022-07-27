import {Table, Model, Column, DataType, AutoIncrement, AllowNull, PrimaryKey} from "sequelize-typescript";


@Table({
    freezeTableName:true,
    timestamps:false,
    tableName:"users"
})

export class User extends Model{

    @AutoIncrement
    @AllowNull(false)
    @PrimaryKey
    @Column(DataType.INTEGER)
    user_id?:number


    @AllowNull(false)
    @Column(DataType.STRING)
    fio?:string

    @AllowNull(false)
    @Column(DataType.TEXT)
    login?:string

    @AllowNull(false)
    @Column(DataType.TEXT)
    password?:string

}