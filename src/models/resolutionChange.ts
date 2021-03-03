// models/resolutionChange.ts

/**
 * Import functions from the class-valadiator package in order
 * to validate input data when creating or editing a resolutionChange
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
@Entity("resolutionChanges")

/**
 * Export the ResolutionChange class so we can use it elsewhere in our project
 */
export class ResolutionChange {
  @PrimaryGeneratedColumn("uuid") // Tells Postgres to generate a Unique Key for this column
  public id: string; // Name of the column is id and type is string

  @Column("text")
  @IsString()
  public resolution: string;

  @Column("text")
  @IsString()
  public previousResolution: string;

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
