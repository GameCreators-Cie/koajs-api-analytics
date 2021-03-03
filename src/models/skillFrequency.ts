// models/skillFrequency.ts

/**
 * Import functions from the class-valadiator package in order
 * to validate input data when creating or editing a skillFrequency
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
@Entity("skillFrequencies")

/**
 * Export the SkillFrequency class so we can use it elsewhere in our project
 */
export class SkillFrequency {
  @PrimaryGeneratedColumn("uuid") // Tells Postgres to generate a Unique Key for this column
  public id: string; // Name of the column is id and type is string

  @Column("text")
  @IsString()
  public nameSkill: string;

  @Column("text")
  @IsString()
  public nameCharacter: string;

  @Column("text")
  @IsString()
  public nameClass: string;

  @Column("int")
  @IsNumber()
  public occurence: number;

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
