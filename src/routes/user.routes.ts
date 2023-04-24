import { Router } from "express"
import { idValidation, updateValidator, validationsUserCreate, validationsUserExist, validationsUserLogin } from "../middlewares/user.validator.middleware";
import { UserController } from "../controllers/user.controller";
import { ServerError } from "../errors/server.error";
import { TaskController } from "../controllers/task.controller";
import { validationsTaskCreate, validationsTaskExist } from "../middlewares/task.validator.middleware";


export const userRoutes = () => {
    const app = Router();
//-------------------- USER ROUTES -------------------------------//

// GET http://localhost:777/user/users <- ROUTE TO LIST USERS
app.get("/users", new UserController().list);

// POST http://localhost:777/user <- ROUTE TO CREATE USER
app.post("/", validationsUserCreate, new UserController().createUser);

// POST http://localhost:777/user/login <- ROUTE TO LOGIN
app.post("/login", validationsUserLogin, new UserController().loginUser);

// GET http://localhost:777/user/:userId <- ROUTE TO LIST USER
app.get("/:userId", new UserController().getId);

// PUT http://localhost:777/user/:userId <- ROUTE TO EDIT USER 
app.put("/:userId", updateValidator, new UserController().updateUser);

// GET http://localhost:777/user/:userId <- ROUTE TO DELETE USER
app.delete("/:userId", idValidation, new UserController().deleteUser);


//-------------------- TASK ROUTES -------------------------------//

// POST http://localhost:777/user/:userId/tasks <- ROUTE TO CREATE TASK
app.post("/:userId/tasks", validationsTaskCreate, new TaskController().create);

// GET http://localhost:777/user/:userId/tasks <- ROUTE TO LIST USER TASKS
app.get("/:userId/tasks", validationsUserExist, new TaskController().listAll);

// GET http://localhost:777/user/:userId/tasks <- ROUTE2 TO LIST USER TASKS
//app.get("/:userId/tasks", validationsUserExist, new TaskController().list);

// GET http://localhost:777/user/:userId/tasks/:taskId <- ROUTE TO SINGLE TASK
app.get( "/:userId/tasks/:taskId", validationsTaskExist, new TaskController().singleTask);

// PUT http://localhost:777/user/:userId/tasks/:taskId <- ROUTE TO EDIT TASK 
app.put("/:userId/tasks/:taskId",validationsTaskExist,new TaskController().update);

// DELETE http://localhost:777/user/:userId/tasks/:taskId <- ROUTE TO DELETE TASK
app.delete("/:userId/tasks/:taskId", validationsTaskExist, new TaskController().delete);

// "500 Internal Server Error" - Indicates that a server error occurred that prevented the request from being serviced.
app.all("/*", (req, res) => {return ServerError.internalServerError(res)});

  return app
}