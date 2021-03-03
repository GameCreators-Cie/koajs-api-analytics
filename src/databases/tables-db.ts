// databases/tables-db.ts

/**
 * This file simply imports the models and creates an array with a list of
 * the tables we want to include when we connect to the database.
 */

import { Input } from "../models/input";
import { ResolutionChange } from "../models/resolutionChange";
import { SkillFrequency } from "../models/skillFrequency";
import { VolumeChange } from "../models/volumeChange";
import { Session } from "../models/session";
import { Thing } from "../models/thing";
import { User } from "../models/user";
export const tables = [User, Thing, Session, VolumeChange, ResolutionChange, Input, SkillFrequency];
