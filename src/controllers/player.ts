// controllers/player.ts

import { Context } from "koa";
import { PlayerUtils } from "./../utils/player-utils";

export class PlayerController {
  public static async getAllPlayers(ctx: Context) {
    const result: any = await PlayerUtils.getAllPlayers();
    ctx.body = result.body;
    ctx.status = result.status;
  }

  public static async getPlayer(ctx: Context) {
    const result: any = await PlayerUtils.getPlayer(ctx.params.id);
    ctx.body = result.body;
    ctx.status = result.status;
  }

  public static async updatePlayer(ctx: any) {
    const result = await PlayerUtils.updatePlayer(ctx.params.id, ctx.request.body);
    ctx.body = result.body;
    ctx.status = result.status;
  }
}
