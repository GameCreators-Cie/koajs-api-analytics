import { validate, ValidationError } from "class-validator";
import { getManager, Repository } from "typeorm";
import validator from "validator";
import { Session } from "./../models/session";
import { InputUtils } from "./input-utils";
import { SkillFrequencyUtils } from "./skillFrequency-utils";

export class SessionUtils {
  public static async getSession(sessionId: string): Promise<any> {
    const session = await this.getOneSession(sessionId);
    if (!session) {
      return {
        status: 404,
        body: "The session you are trying to retrieve doesn't exist in the db",
      };
    }
    if (session instanceof Session) {
      return {
        status: 200,
        body: session,
      };
    }
    return session;
  }

  public static async getAllSessions(): Promise<any> {
    const sessions: Session[] = await getManager().getRepository(Session).find();
    return {
      status: sessions.length > 0 ? 200 : 200,
      body: sessions,
    };
  }

  public static async createSession(parameters: any): Promise<any> {
    const sessionToBeSaved: Session = new Session();

    sessionToBeSaved.bugReportQuantity = parameters.bugReportQuantity;
    sessionToBeSaved.chooseActionDuration = parameters.chooseActionDuration;
    sessionToBeSaved.deprogramQuantity = parameters.deprogramQuantity;
    sessionToBeSaved.gameLostQuantity = parameters.gameLostQuantity;
    sessionToBeSaved.idleStateDuration = parameters.idleStateDuration;
    sessionToBeSaved.inMenuDuration = parameters.inMenuDuration;
    sessionToBeSaved.moveCursorDuration = parameters.moveCursorDuration;
    sessionToBeSaved.newGameQuantity = parameters.newGameQuantity;
    sessionToBeSaved.panelDisplayDuration = parameters.panelDisplayDuration;
    sessionToBeSaved.sessionBegin = parameters.sessionBegin;
    sessionToBeSaved.sessionEnd = parameters.sessionEnd;
    sessionToBeSaved.positionActionDuration = parameters.positionActionDuration;
    sessionToBeSaved.startProgrammingDelay = parameters.startProgrammingDelay;
    sessionToBeSaved.validateTurnDelay = parameters.validateTurnDelay;
    sessionToBeSaved.zoomAverageHighValue = parameters.zoomAverageHighValue;
    sessionToBeSaved.zoomAverageLowValue = parameters.zoomAverageLowValue;
    sessionToBeSaved.zoomAverageValue = parameters.zoomAverageValue;
    sessionToBeSaved.zoomChangeQuantity = parameters.zoomChangeQuantity;
    sessionToBeSaved.zoomTotalDuration = parameters.zoomTotalDuration;

    sessionToBeSaved.playerId = !parameters.playerId ? null : parameters.playerId;

    const newSession = await this.validateSession(sessionToBeSaved);

    if (parameters.inputList){
      const arrayOfInput: Array<any> = parameters.inputList as Array<any>;
      for(let i = 0; i < arrayOfInput.length; i++){
          console.log("on cree un input :");
          await InputUtils.createInput(arrayOfInput[i], newSession.body.id);
      }
    }

    if (parameters.skillUsageList){
      const arrayOfSkill: Array<any> = parameters.skillUsageList as Array<any>;
      for(let i = 0; i < arrayOfSkill.length; i++){
        await SkillFrequencyUtils.createSkillFrequency(arrayOfSkill[i], newSession.body.id);
      }
    }

    return newSession;
  }

  public static async deleteSession(sessionId: string): Promise<any> {
    const sessionToDelete = await this.getOneSession(sessionId);
    if (!sessionToDelete) {
      return {
        status: 404,
        body: "The session you are trying to delete doesn't exist in the db",
      };
    }
    if (sessionToDelete instanceof Session) {
      await getManager().getRepository(Session).remove(sessionToDelete);
      return {
        status: 200,
        body: `Session ${sessionId} deleted`,
      };
    }
    return sessionToDelete;
  }

  private static async getOneSession(sessionId: string): Promise<any | Session> {
    if (!validator.isUUID(sessionId)) {
      return {
        status: 400,
        body: "The session id provided is not a valid UUID",
      };
    }
    return await getManager().getRepository(Session).findOne(sessionId);
  }

  private static async validateSession(session: Session): Promise<any> {
    const errors: ValidationError[] = await validate(session, {
      skipMissingProperties: true,
    });
    const sessionRepository: Repository<Session> = getManager().getRepository(
      Session
    );
    const result: any = {};
    if (errors.length > 0) {
      const body: any[] = [];
      errors.forEach(error => {
        body.push({
          property: error.property,
          value: error.value,
          constraints: error.constraints,
        });
      });
      result.status = 400;
      result.body = body;
    }  
    {
      result.status = 201;
      result.body = await sessionRepository.save(session);  
    }
    return result;
  }
}
