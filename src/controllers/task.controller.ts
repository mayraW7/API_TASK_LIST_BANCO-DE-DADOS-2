import { Request, Response } from "express";
import { UserDatabase } from "../database/repositories/user.database";
import { RequestError } from "../errors/request.error";
import { Task } from "../models/task.model";
import { SuccessResponse } from "../util/response.success";
import { ServerError } from "../errors/server.error";
import { TaskDatabase } from "../database/repositories/task.database";




export class TaskController {

  public async list(req: Request, res: Response){
    try{
        const database = new TaskDatabase();
        const result = await database.list();
    return SuccessResponse.success(
      res, "Tasks successfully listed",result);
    }catch (error: any) {
    return ServerError.genericError(res, error);
    }
  }

  public async listAll(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { description, filed } = req.query;

      const database = new TaskDatabase();
      let result = await database.listUser(userId,description ? String(description) : undefined);
      if (description) {
        result = result?.filter(
          (task) =>
            task.description
              .toString()
              .toLowerCase() ===
            description?.toString().toLowerCase()
        );
      }
      if (filed !== undefined) {
        result = result?.filter(
          (task) => task.filed === true
        );
      } else {
        result = result?.filter(
          (task) => task.filed === false
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
      const { userId, taskId } = req.params;

      const database = new UserDatabase();
      const user = await database.getUserID(userId);

      const task = user?.tasks.find(
        (task) => task.id === taskId
      );

      return SuccessResponse.success(
        res,
        "Task successfully listed",
        task
      );
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { description, detailing } = req.body;

      const databaseUser = new UserDatabase();
      const user = await databaseUser.getUserID(userId);
      const task = new Task(description, detailing);
      user?.addTask(task);

      return SuccessResponse.created(
        res,
        "task successfully created",
        task
      );
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const { userId, taskId } = req.params;
      const { description, detailing, filed } = req.body;

      const userDatabase = new UserDatabase();
      const user = await userDatabase.getUserID(userId);
      const taskList = user?.tasks;
      const task = taskList?.find((task)=>(task.id === taskId));
      if(description){
        task!.description = description;
      }
      if(detailing){
        task!.detailing = detailing;
      }
      if(filed !== undefined){
        task!.filed = filed;
      }
      
      return SuccessResponse.success(
        res,
        "Task successfully updated.",
        { task, taskList }
      );
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const { userId, taskId } = req.params;

      const database = new UserDatabase();
      const user = await database.getUserID(userId);

      const taskList = user!.tasks;

      const taskIndex = taskList.findIndex(
        (task) => task.id === taskId
      );

      if (taskIndex < 0) {
        return RequestError.notFound(res, "task");
      }

      const taskDeleted = taskList.splice(
        taskIndex!,
        1
      );

      return SuccessResponse.success(
        res,
        "Task successfully deleted",
        taskDeleted
      );
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }
}
