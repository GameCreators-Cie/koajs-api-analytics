// models/player.ts

/**
 * Import functions from the class-valadiator package in order
 * to validate input data when creating or editing a player
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
@Entity("players")

/**
 * Export the Player class so we can use it elsewhere in our project
 */
export class Player {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column("int")
  @IsNumber()
  public timesPlaying: number;

  @Column({
    type: "uuid",
    nullable: true
  })
  public lastSession: string;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

}
