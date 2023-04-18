import {NextFunction, Request, Response,} from "express";
import { UserDatabase } from "../database/user.database";
import { RequestError } from "../errors/request.error";
import { ServerError } from "../errors/server.error";
import { CPFvalidatorMiddleware } from "./cpf_validator.middleware";

  
export class UserValidatorMiddleware {
public static validationsRequiredFields(req: Request, res: Response,
    next: NextFunction) {
    try {
    const { username, email, pass } = req.body;

    if (!username) {
        return RequestError.fieldNotProvided(res,"Username");}
    if (!email) {
        return RequestError.fieldNotProvided(res,"Email");}
    if (!pass) {
        return RequestError.fieldNotProvided(res,"Password");}
    next();
    } catch (error: any) {
    return ServerError.genericError(res, error);
    }
}

public static async emailAlreadyExist(req: Request, res: Response, 
    next: NextFunction) {
    try {
    const { email } = req.body;

    const database = new UserDatabase();
    const userEmail = await database.getEmail(email);

    if (userEmail) {
        return RequestError.badRequest(res, "Email")
    }
    next();
    } catch (error: any) {
    return ServerError.genericError(res, error);
    }
}

public static async userExist(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { userId } = req.params;

      if (!userId) {
        return RequestError.fieldNotProvided(
          res,
          "User"
        );
      }

      const database = new UserDatabase();
      const user = await database.getUserID(userId);

      if (!user) {
        return RequestError.notFound(res, "User");
      }

      next();
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
}

public static async isLoginValid(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
    const { email, pass } = req.body;

    if (!email) {
        return RequestError.fieldNotProvided(res,"Email");
    }
    if (!pass) {return RequestError.fieldNotProvided(res,"Password");
    }

    const database = new UserDatabase();
    let user = await database.getOne(email,pass)

    if (!user) {
        return RequestError.invalidAccess(res,"User");
    }
 
    next();
    } catch (error: any) {
    return ServerError.genericError(res, error);
    }
}

public static idUserValid(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
    const { userId } = req.params;
    const database = new UserDatabase();
    let userID = database.getUserID(userId);
    if (!userID) {
        return RequestError.fieldNotProvided(res,"Id user");
    }

next();
} catch (error: any) {
return ServerError.genericError(res, error);
}
}
}

export const validationsUserCreate = [UserValidatorMiddleware.validationsRequiredFields, UserValidatorMiddleware.emailAlreadyExist,CPFvalidatorMiddleware.cpfAlreadyExists,];

export const validationsUserLogin = [UserValidatorMiddleware.isLoginValid,];

export const idValidation = [UserValidatorMiddleware.idUserValid];

export const updateValidator = [UserValidatorMiddleware.emailAlreadyExist, UserValidatorMiddleware.idUserValid];

export const validationsUserExist = [UserValidatorMiddleware.userExist,];