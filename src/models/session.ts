// models/session.ts

/**
 * Import functions from the class-valadiator package in order
 * to validate input data when creating or editing a session
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
@Entity("sessions")

/**
 * Export the Session class so we can use it elsewhere in our project
 */
export class Session {
  @PrimaryGeneratedColumn("uuid") // Tells Postgres to generate a Unique Key for this column
  public id: string; // Name of the column is id and type is string

  @Column("int")
  @IsNumber()
  public sessionBegin: number;

  @Column("int")
  @IsNumber()
  public sessionEnd: number;

  @Column("int")
  @IsNumber()
  public bugReportQuantity: number;

  @Column("int")
  @IsNumber()
  public chooseActionDuration: number;

  @Column("int")
  @IsNumber()
  public deprogramQuantity: number;

  @Column("int")
  @IsNumber()
  public gameLostQuantity: number;

  @Column("int")
  @IsNumber()
  public idleStateDuration: number;

  @Column("int")
  @IsNumber()
  public inMenuDuration: number;

  @Column("int")
  @IsNumber()
  public moveCursorDuration: number;

  @Column("int")
  @IsNumber()
  public newGameQuantity: number;

  @Column("int")
  @IsNumber()
  public panelDisplayDuration: number;

  @Column("int")
  @IsNumber()
  public positionActionDuration: number;

  @Column("int")
  @IsNumber()
  public startProgrammingDelay: number;

  @Column("int")
  @IsNumber()
  public validateTurnDelay: number;

  @Column("int")
  @IsNumber()
  public zoomAverageHighValue: number;

  @Column("int")
  @IsNumber()
  public zoomAverageLowValue: number;

  @Column("int")
  @IsNumber()
  public zoomAverageValue: number;

  @Column("int")
  @IsNumber()
  public zoomChangeQuantity: number;

  @Column("int")
  @IsNumber()
  public zoomTotalDuration: number;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}
