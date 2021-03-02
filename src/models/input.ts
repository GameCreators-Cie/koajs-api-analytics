// models/input.ts

/**
 * Import functions from the class-valadiator package in order
 * to validate input data when creating or editing a thing
 */
import { IsNumber, IsString } from "class-validator";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

/**
 * This decorator : @, specify the name of the table
 */
@Entity("inputs")

/**
 * Export the Input class so we can use it elsewhere in our project
 */
export class Input {
  @PrimaryGeneratedColumn("uuid") // Tells Postgres to generate a Unique Key for this column
  public id: string; // Name of the column is id and type is string

  @Column("text")
  @IsString()
  public nameInput: string;

  @Column("bool")
  @IsString()
  public effective: boolean;

  @Column("int")
  @IsNumber()
  public order: number;

  @Column("int")
  @IsNumber()
  public timestamp: number;

  @Column({
    type: "uuid",
    nullable: true
  })
  public idSession: string;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}
