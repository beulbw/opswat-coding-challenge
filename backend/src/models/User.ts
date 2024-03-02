import { Table, Column, DataType, Model } from "sequelize-typescript";

@Table({
  timestamps: true,
  underscored: true,
  tableName: "users",
  modelName: "User",
})
export class User extends Model {
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  declare username: string;

  @Column({
    type: DataType.STRING,
  })
  declare fullname: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;
}
