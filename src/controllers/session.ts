// controllers/session.ts

import { Context } from "koa";
import { SessionUtils } from "./../utils/session-utils";

export class SessionController {
  public static async getAllSessions(ctx: Context) {
    const result: any = await SessionUtils.getAllSessions();
    ctx.body = result.body;
    ctx.status = result.status;
  }

  public static async getSession(ctx: Context) {
    const result: any = await SessionUtils.getSession(ctx.params.id);
    ctx.body = result.body;
    ctx.status = result.status;
  }

  public static async createSession(ctx: Context) {
    const result = await SessionUtils.createSession(ctx.request.body);
    ctx.body = result.body;
    ctx.status = result.status;
  }

  public static async deleteSession(ctx: Context) {
    const result = await SessionUtils.deleteSession(ctx.params.id);
    ctx.body = result.body;
    ctx.status = result.status;
  }
}
