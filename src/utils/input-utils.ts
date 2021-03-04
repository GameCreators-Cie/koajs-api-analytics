import { validate, ValidationError } from "class-validator";
import { getManager, Repository } from "typeorm";
import validator from "validator";
import { Input } from "./../models/input";

export class InputUtils {
  public static async getInput(inputId: string): Promise<any> {
    const input = await this.getOneInput(inputId);
    if (!input) {
      return {
        status: 404,
        body: "The input you are trying to retrieve doesn't exist in the db",
      };
    }
    if (input instanceof Input) {
      return {
        status: 200,
        body: input,
      };
    }
    return input;
  }

  public static async getAllInputs(): Promise<any> {
    const inputs: Input[] = await getManager().getRepository(Input).find();
    return {
      status: inputs.length > 0 ? 200 : 200,
      body: inputs,
    };
  }

  public static async createInput(parameters: any, idSession: string): Promise<any> {
    const inputToBeSaved: Input = new Input();
    inputToBeSaved.nameInput = parameters.nameInput;
    inputToBeSaved.effective = parameters.effective;
    inputToBeSaved.order = parameters.order;
    inputToBeSaved.timestamp = parameters.timestamp;
    inputToBeSaved.idSession = idSession;
    console.log(`name Input ${parameters.nameInput}`);
    console.log(`effective Input ${parameters.effective}`);
    console.log(`order Input ${parameters.order}`);
    console.log(`timestamp Input ${parameters.timestamp}`);
    return await this.validateInput(inputToBeSaved);
  }

  public static async deleteInput(inputId: string): Promise<any> {
    const inputToDelete = await this.getOneInput(inputId);
    if (!inputToDelete) {
      return {
        status: 404,
        body: "The input you are trying to delete doesn't exist in the db",
      };
    }
    if (inputToDelete instanceof Input) {
      await getManager().getRepository(Input).remove(inputToDelete);
      return {
        status: 200,
        body: `Input ${inputId} deleted`,
      };
    }
    return inputToDelete;
  }

  private static async getOneInput(inputId: string): Promise<any | Input> {
    if (!validator.isUUID(inputId)) {
      return {
        status: 400,
        body: "The input id provided is not a valid UUID",
      };
    }
    return await getManager().getRepository(Input).findOne(inputId);
  }

  private static async validateInput(input: Input): Promise<any> {
    const errors: ValidationError[] = await validate(input, {
      skipMissingProperties: true,
    });
    const inputRepository: Repository<Input> = getManager().getRepository(
      Input
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
      result.body = await inputRepository.save(input);
      console.log("EVERY THING IS COOL WITH INPUT INSERT");
    }
    return result;
  }
}
