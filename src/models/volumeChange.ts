// models/volumeChange.ts

/**
 * Import functions from the class-valadiator package in order
 * to validate input data when creating or editing a volumeChange
 */
import { IsNumber } from "class-validator";
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
 * Export the VolumeChange class so we can use it elsewhere in our project
 */
export class VolumeChange {
  @PrimaryGeneratedColumn("uuid") // Tells Postgres to generate a Unique Key for this column
  public id: string; // Name of the column is id and type is string

  @Column("int")
  @IsNumber()
  public currentVolume: number;

  @Column("int")
  @IsNumber()
  public previousVolume: number;

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
