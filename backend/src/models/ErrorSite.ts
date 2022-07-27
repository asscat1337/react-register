import {
    Model,
    Column,
    PrimaryKey,
    AllowNull,
    AutoIncrement,
    Table,
    DataType
} from "sequelize-typescript";

@Table({
    freezeTableName:true,
    timestamps:false,
    tableName:"errors"
})

export class ErrorSite extends Model{

    @AutoIncrement
    @AllowNull(false)
    @PrimaryKey
    @Column(DataType.INTEGER)
    error_id?:number

    @AllowNull(false)
    @Column(DataType.TEXT)
    description?:string

    @AllowNull(false)
    @Column(DataType.DATEONLY)
    date?:Date

    @AllowNull(false)
    @Column(DataType.TIME)
    start_time?:string

    @AllowNull(true)
    @Column(DataType.TIME)
    end_time?:string
    
}



