import { validate, ValidationError } from "class-validator";
import { getManager, Repository } from "typeorm";
import validator from "validator";
import { ResolutionChange } from "./../models/resolutionChange";

export class ResolutionChangeUtils {
  public static async getResolutionChange(resolutionChangeId: string): Promise<any> {
    const resolutionChange = await this.getOneResolutionChange(resolutionChangeId);
    if (!resolutionChange) {
      return {
        status: 404,
        body: "The resolutionChange you are trying to retrieve doesn't exist in the db",
      };
    }
    if (resolutionChange instanceof ResolutionChange) {
      return {
        status: 200,
        body: resolutionChange,
      };
    }
    return resolutionChange;
  }

  public static async getAllResolutionChanges(): Promise<any> {
    const resolutionChanges: ResolutionChange[] = await getManager().getRepository(ResolutionChange).find();
    return {
      status: resolutionChanges.length > 0 ? 200 : 200,
      body: resolutionChanges,
    };
  }

  public static async createResolutionChange(parameters: any, idSession: string): Promise<any> {
    const resolutionChangeToBeSaved: ResolutionChange = new ResolutionChange();
    resolutionChangeToBeSaved.currentResolution = parameters.currentResolution;
    resolutionChangeToBeSaved.previousResolution = parameters.previousResolution;
    resolutionChangeToBeSaved.timestamp = parameters.timestamp;
    resolutionChangeToBeSaved.idSession = idSession;
    return await this.validateResolutionChange(resolutionChangeToBeSaved);
  }

  public static async deleteResolutionChange(resolutionChangeId: string): Promise<any> {
    const resolutionChangeToDelete = await this.getOneResolutionChange(resolutionChangeId);
    if (!resolutionChangeToDelete) {
      return {
        status: 404,
        body: "The resolutionChange you are trying to delete doesn't exist in the db",
      };
    }
    if (resolutionChangeToDelete instanceof ResolutionChange) {
      await getManager().getRepository(ResolutionChange).remove(resolutionChangeToDelete);
      return {
        status: 200,
        body: `ResolutionChange ${resolutionChangeId} deleted`,
      };
    }
    return resolutionChangeToDelete;
  }

  private static async getOneResolutionChange(resolutionChangeId: string): Promise<any | ResolutionChange> {
    if (!validator.isUUID(resolutionChangeId)) {
      return {
        status: 400,
        body: "The resolutionChange id provided is not a valid UUID",
      };
    }
    return await getManager().getRepository(ResolutionChange).findOne(resolutionChangeId);
  }

  private static async validateResolutionChange(resolutionChange: ResolutionChange): Promise<any> {
    const errors: ValidationError[] = await validate(resolutionChange, {
      skipMissingProperties: true,
    });
    const resolutionChangeRepository: Repository<ResolutionChange> = getManager().getRepository(
      ResolutionChange
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
        console.log(`error -- property ${error.property} -- value  ${error.value} --- constraints ${error.constraints}`)
      });
      result.status = 400;
      result.body = body;
    } else {
      result.status = 201;
      result.body = await resolutionChangeRepository.save(resolutionChange);
      console.log("EVERY THING IS COOL WITH resolutionChange INSERT");
    }
    return result;
  }
}
