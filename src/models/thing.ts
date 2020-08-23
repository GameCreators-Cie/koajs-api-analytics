// models/thing.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * Import functions from the class-valadiator package in order
 * to validate input data when creating or editing a thing
 */
import { Length } from 'class-validator';

/**
 * This decorator : @, specify the name of the table
 */
@Entity('things')

/**
 * Export the Thing class so we can use it elsewhere in our project
 */
export class Thing {

  @PrimaryGeneratedColumn('uuid')     // Tells Postgres to generate a Unique Key for this column
  public id: string;                         // Name of the column is id and type is string

  @Column('text')
  public name: string;

  @Column('text')
  @Length(5, 180)
  public description: string;

  @Column('int')
  public quantity: number;

  @Column('int')
  public power: number;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}