// models/volumeChange.ts

/**
 * Import functions from the class-valadiator package in order
 * to validate input data when creating or editing a thing
 */
import { IsNumber, IsString, Length } from "class-validator";
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
@Entity("volumeChanges")

/**
 * Export the Thing class so we can use it elsewhere in our project
 */
export class Thing {
  @PrimaryGeneratedColumn("uuid") // Tells Postgres to generate a Unique Key for this column
  public id: string; // Name of the column is id and type is string

  @Column("int")
  @IsNumber()
  public volume: number;

  @Column("int")
  @IsNumber()
  public previousVolume: number;

  @Column("int")
  @IsNumber()
  public changeOrder: number;

  @Column("int")
  @IsNumber()
  public timeStampChange: number;

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
