import { Table, Column, DataType, Model, Default } from "sequelize-typescript";

@Table({
  timestamps: true,
  underscored: true,
  tableName: "articles",
  modelName: "Article",
})
export class Article extends Model {
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(250),
    allowNull: false,
  })
  declare title: string;

  @Column({
    type: DataType.STRING(10000),
  })
  declare body: string;

  @Default(0)
  @Column({
    type: DataType.INTEGER,
  })
  declare favouriteCount: number;
}
