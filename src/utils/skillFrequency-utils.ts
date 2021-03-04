import { validate, ValidationError } from "class-validator";
import { getManager, Repository } from "typeorm";
import validator from "validator";
import { SkillFrequency } from "./../models/skillFrequency";

export class SkillFrequencyUtils {
  public static async getSkillFrequency(skillFrequencyId: string): Promise<any> {
    const skillFrequency = await this.getOneSkillFrequency(skillFrequencyId);
    if (!skillFrequency) {
      return {
        status: 404,
        body: "The skillFrequency you are trying to retrieve doesn't exist in the db",
      };
    }
    if (skillFrequency instanceof SkillFrequency) {
      return {
        status: 200,
        body: skillFrequency,
      };
    }
    return skillFrequency;
  }

  public static async getAllSkillFrequencys(): Promise<any> {
    const skillFrequencys: SkillFrequency[] = await getManager().getRepository(SkillFrequency).find();
    return {
      status: skillFrequencys.length > 0 ? 200 : 200,
      body: skillFrequencys,
    };
  }

  public static async createSkillFrequency(parameters: any, idSession: string): Promise<any> {
    const skillFrequencyToBeSaved: SkillFrequency = new SkillFrequency();
    skillFrequencyToBeSaved.nameSkill = parameters.nameSkill;
    skillFrequencyToBeSaved.nameCharacter = parameters.nameCharacter;
    skillFrequencyToBeSaved.nameClass = parameters.nameClass;
    skillFrequencyToBeSaved.occurence = parameters.occurence;
    skillFrequencyToBeSaved.idSession = idSession;
    return await this.validateSkillFrequency(skillFrequencyToBeSaved);
  }

  public static async deleteSkillFrequency(skillFrequencyId: string): Promise<any> {
    const skillFrequencyToDelete = await this.getOneSkillFrequency(skillFrequencyId);
    if (!skillFrequencyToDelete) {
      return {
        status: 404,
        body: "The skillFrequency you are trying to delete doesn't exist in the db",
      };
    }
    if (skillFrequencyToDelete instanceof SkillFrequency) {
      await getManager().getRepository(SkillFrequency).remove(skillFrequencyToDelete);
      return {
        status: 200,
        body: `SkillFrequency ${skillFrequencyId} deleted`,
      };
    }
    return skillFrequencyToDelete;
  }

  private static async getOneSkillFrequency(skillFrequencyId: string): Promise<any | SkillFrequency> {
    if (!validator.isUUID(skillFrequencyId)) {
      return {
        status: 400,
        body: "The skillFrequency id provided is not a valid UUID",
      };
    }
    return await getManager().getRepository(SkillFrequency).findOne(skillFrequencyId);
  }

  private static async validateSkillFrequency(skillFrequency: SkillFrequency): Promise<any> {
    const errors: ValidationError[] = await validate(skillFrequency, {
      skipMissingProperties: true,
    });
    const skillFrequencyRepository: Repository<SkillFrequency> = getManager().getRepository(
      SkillFrequency
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
    } else {
      result.status = 201;
      result.body = await skillFrequencyRepository.save(skillFrequency);
    }
    return result;
  }
}
