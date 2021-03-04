import { validate, ValidationError } from "class-validator";
import { getManager, Repository } from "typeorm";
import validator from "validator";
import { VolumeChange } from "./../models/volumeChange";

export class VolumeChangeUtils {
  public static async getVolumeChange(volumeChangeId: string): Promise<any> {
    const volumeChange = await this.getOneVolumeChange(volumeChangeId);
    if (!volumeChange) {
      return {
        status: 404,
        body: "The volumeChange you are trying to retrieve doesn't exist in the db",
      };
    }
    if (volumeChange instanceof VolumeChange) {
      return {
        status: 200,
        body: volumeChange,
      };
    }
    return volumeChange;
  }

  public static async getAllVolumeChanges(): Promise<any> {
    const volumeChanges: VolumeChange[] = await getManager().getRepository(VolumeChange).find();
    return {
      status: volumeChanges.length > 0 ? 200 : 200,
      body: volumeChanges,
    };
  }

  public static async createVolumeChange(parameters: any, idSession: string): Promise<any> {
    const volumeChangeToBeSaved: VolumeChange = new VolumeChange();
    volumeChangeToBeSaved.currentVolume = parameters.currentVolume;
    volumeChangeToBeSaved.previousVolume = parameters.previousVolume;
    volumeChangeToBeSaved.timestamp = parameters.timestamp;
    volumeChangeToBeSaved.idSession = idSession;
    return await this.validateVolumeChange(volumeChangeToBeSaved);
  }

  public static async deleteVolumeChange(volumeChangeId: string): Promise<any> {
    const volumeChangeToDelete = await this.getOneVolumeChange(volumeChangeId);
    if (!volumeChangeToDelete) {
      return {
        status: 404,
        body: "The volumeChange you are trying to delete doesn't exist in the db",
      };
    }
    if (volumeChangeToDelete instanceof VolumeChange) {
      await getManager().getRepository(VolumeChange).remove(volumeChangeToDelete);
      return {
        status: 200,
        body: `VolumeChange ${volumeChangeId} deleted`,
      };
    }
    return volumeChangeToDelete;
  }

  private static async getOneVolumeChange(volumeChangeId: string): Promise<any | VolumeChange> {
    if (!validator.isUUID(volumeChangeId)) {
      return {
        status: 400,
        body: "The volumeChange id provided is not a valid UUID",
      };
    }
    return await getManager().getRepository(VolumeChange).findOne(volumeChangeId);
  }

  private static async validateVolumeChange(volumeChange: VolumeChange): Promise<any> {
    const errors: ValidationError[] = await validate(volumeChange, {
      skipMissingProperties: true,
    });
    const volumeChangeRepository: Repository<VolumeChange> = getManager().getRepository(
      VolumeChange
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
      result.body = await volumeChangeRepository.save(volumeChange);
      console.log("EVERY THING IS COOL WITH VOLUME CHANGE INSERT");
    }
    return result;
  }
}
