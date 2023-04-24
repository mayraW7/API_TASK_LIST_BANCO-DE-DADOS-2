import { Request, Response } from "express";
import { RequestError } from "../errors/request.error";
import { Task } from "../models/task.model";
import { SuccessResponse } from "../util/response.success";
import { ServerError } from "../errors/server.error";
import { TaskDatabase } from "../database/repositories/task.database";


export class TaskController {

  public async listAll(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { description, filed } = req.query;

      const database = new TaskDatabase();
      let result = await database.listUser(userId,description ? String(description) : undefined);

      let isFiled: any = undefined;

      if (filed !== undefined && filed !== "") {
        isFiled = filed?.toString().toLowerCase() === "true";
        
        result = result.filter((task) => task.filed === isFiled
        );
      }

      return SuccessResponse.success(
        res,
        "Tasks successfully listed",
        result
      );
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }

  public async singleTask(req: Request, res: Response) {
    try {
      const { taskId } = req.params;
      const database = new TaskDatabase();
      const task =  await database.list(taskId)

      return SuccessResponse.success(
        res,"Task successfully listed",task);

    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { description, detailing } = req.body;

      const database = new TaskDatabase();
      const result = await database.create(userId, new Task(description, detailing));

      return SuccessResponse.created(
        res, "task successfully created", result);

    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const { taskId } = req.params;
      const { description, detailing, filed } = req.body;

      const data = {description,detailing,filed};
      const database = new TaskDatabase();
      const result = await database.update(taskId,data);
      
      return SuccessResponse.success(
        res,
        "Task successfully updated.",
        { result }
      );
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const { taskId } = req.params;

      const database = new TaskDatabase();
      const result = await database.delete(taskId)

      if (result === 0) {
        return RequestError.notFound(res, "task");
      }

      return SuccessResponse.success(
        res, "Task successfully deleted", taskId );
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }
}
