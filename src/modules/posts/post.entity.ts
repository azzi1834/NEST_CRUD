import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Post extends Model<Post> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  body: string;
}
