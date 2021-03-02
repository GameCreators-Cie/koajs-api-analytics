import * as jwt from "jsonwebtoken";
import { Context } from "koa";
import { UserUtils } from "./../utils/user-utils";
import { readFileSync } from 'fs';

function findApiKeyFromReques(headers, query){
    if (!headers) headers = {};
    if (!query) query = {};

    return headers['x-apikey']
    || headers['x-api-key']
    || headers['apikey']
    || query['api-key']
    || query['apikey']
}

function getApiKeys(){
  return readFileSync('./config/apikeys.txt','utf-8').split(',');
}

export default async (ctx: Context, next: () => Promise<any>) => {
  try {
    if (ctx.path.includes("auth/signin") || ctx.path.includes("auth/signup")) {
      return next();
    }
    let loginToken: any = null;
    if (ctx.req.headers.authorization) {
      loginToken = ctx.req.headers.authorization.split(" ")[1];
    }
    let validToken: boolean = false;
    let validUser: boolean = false;
    let userId: string = "";

    const clefs = findApiKeyFromReques(ctx.req.headers, ctx.request.query)
    console.log(`la clé d'api de la requête : ${clefs}` );
    const lalistedesclesapi = getApiKeys();
    for(const apikey of lalistedesclesapi){
      console.log(`une API KEY : ${apikey}` );
    }
    if (lalistedesclesapi.includes(clefs)){
    	validUser = true;
	} else {

    
    jwt.verify(
      loginToken,
      process.env.JWT_SECRET,
      (errorValidation: any, decodedToken: any) => {
        if (errorValidation == null) {
          validToken = true;
          userId = decodedToken.id;
        } else {
          ctx.body = errorValidation.message;
          ctx.status = 401;
        }
      }
    );
    if (validToken) {
      const getUser: any = await UserUtils.getUser(userId);
      if (getUser.status !== 200) {
        ctx.body = getUser.body;
        ctx.status = getUser.status;
      } else {
        ctx.request.body.currentUser = getUser.body;
        validUser = true;
      }
      }
      }
    if (validUser) {
      return next();
    }
  } catch (e) {
    ctx.body = e.message;
    ctx.status = 500;
  }
};
