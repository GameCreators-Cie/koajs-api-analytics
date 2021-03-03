import { validate, ValidationError } from "class-validator";
import { getManager, Repository } from "typeorm";
import validator from "validator";
import { Player } from "./../models/player";

export class PlayerUtils {
  public static async getPlayer(playerId: string): Promise<any> {
    const player = await this.getOnePlayer(playerId);
    if (!player) {
      return {
        status: 404,
        body: "The player you are trying to retrieve doesn't exist in the db",
      };
    }
    if (player instanceof Player) {
      return {
        status: 200,
        body: player,
      };
    }
    return player;
  }

  public static async getAllPlayers(): Promise<any> {
    const players: Player[] = await getManager()
      .getRepository(Player)
      .find({ select: ["timesPlaying", "lastSession"] });
    return {
      status: players.length > 0 ? 200 : 204,
      body: players,
    };
  }

  public static async createPlayer(parameters: any): Promise<any> {
    const playerToCreate: Player = new Player();
    playerToCreate.timesPlaying = !parameters.timesPlaying ? 1 : parameters.timesPlaying;
    playerToCreate.lastSession = !parameters.lastSession ? null : parameters.lastSession;
    return await this.validatePlayer(playerToCreate);
  }

  public static async updatePlayer(
    playerId: string,
    newContent: any
  ): Promise<any> {
    const playerToBeUpdated = await this.getOnePlayer(playerId);
    if (!playerToBeUpdated) {
      return {
        status: 404,
        body: "The player you are trying to update doesn't exist in the db",
      };
    }
    if (playerToBeUpdated instanceof Player) {
      if (newContent.timesPlaying) {
        playerToBeUpdated.timesPlaying = newContent.timesPlaying;
      }
      if (newContent.lastSession) {
        playerToBeUpdated.lastSession = newContent.lastSession;
      }
      return await this.validatePlayer(playerToBeUpdated);
    }
    return playerToBeUpdated;
  }

  public static async deletePlayer(playerId: string): Promise<any> {
    const playerToDelete = await this.getOnePlayer(playerId);
    if (!playerToDelete) {
      return {
        status: 404,
        body: "The player you are trying to delete doesn't exist in the db",
      };
    }
    if (playerToDelete instanceof Player) {
      await getManager().getRepository(Player).remove(playerToDelete);
      return {
        status: 204,
        body: `Player ${playerId} deleted`,
      };
    }
    return playerToDelete;
  }

  private static async getOnePlayer(playerId: string): Promise<any | Player> {
    if (!validator.isUUID(playerId)) {
      return {
        status: 400,
        body: "The player id provided is not a valid UUID",
      };
    }
    return await getManager()
      .getRepository(Player)
      .findOne({
        select: ["lastSession", "timesPlaying"],
        where: { id: playerId },
      });
  }

  private static async validatePlayer(player: Player): Promise<any> {
    const errors: ValidationError[] = await validate(player, {
      skipMissingProperties: true,
    });
    const playerRepository: Repository<Player> = getManager().getRepository(Player);
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
      result.body = await playerRepository.save(player);
    }
    return result;
  }
}
