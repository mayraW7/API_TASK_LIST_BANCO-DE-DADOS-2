import {
    NextFunction,
    Request,
    Response,
  } from "express";
  import { UserDatabase } from "../database/repositories/user.database";
  import { ServerError } from "../errors/server.error";
  import { RequestError } from "../errors/request.error";
import { UserValidatorMiddleware } from "./user.validator.middleware";
  
  export class TaskValidatorMiddleware {
 
    public static async taskExist(
      req: Request,
      res: Response,
      next: NextFunction
    ) {
      try {
        const { userId, taskId } = req.params;
  
        if (!userId) {
          return RequestError.fieldNotProvided(
            res,
            "User"
          );
        }
  
        if (!taskId) {
          return RequestError.fieldNotProvided(
            res,
            "Task"
          );
        }
  
        const database = new UserDatabase();
        const user = await database.getUserID(userId);
  
        if (!user) {
          return RequestError.notFound(res, "User");
        }
  
        const task = user?.tasks.find(
          (task) => task.id === taskId
        );
  
        if (!task) {
          return RequestError.notFound(res, "Task");
        }
  
        next();
      } catch (error: any) {
        return ServerError.genericError(res, error);
      }
    }
  
    public static validationsFields(
      req: Request,
      res: Response,
      next: NextFunction
    ) {
      try {
        const { description, detailing } = req.body;
        if (!description) {
          return RequestError.fieldNotProvided(
            res,
            "Description"
          );
        }
  
        if (!detailing) {
          return RequestError.fieldNotProvided(
            res,
            "Detailing"
          );
        }
  
        next();
      } catch (error: any) {
        return ServerError.genericError(res, error);
      }
    }

};

export const validationsTaskCreate = [UserValidatorMiddleware.userExist, TaskValidatorMiddleware.validationsFields];

export const validationsTaskExist = [TaskValidatorMiddleware.taskExist,];


  