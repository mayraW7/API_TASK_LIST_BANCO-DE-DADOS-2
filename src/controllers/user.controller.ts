import { Request, Response } from "express";
import { UserDatabase } from "../database/repositories/user.database";
import { ServerError } from "../errors/server.error";
import { User } from "../models/user.model";
import { SuccessResponse } from "../util/response.success";
import { RequestError } from "../errors/request.error";


export class UserController {

    public async list(req: Request, res:Response){
        try{
            const database = new UserDatabase();

            let users = await database.listEntity();
            const result = users.map((user)=> user.toJson());
            return SuccessResponse.success(
                res,"User successfully obtained", result);
                
        }catch(error:any){
            return ServerError.genericError(res,error)
        }
    }

    public async createUser(req: Request, res: Response){
        try{
            const {username, email, cpf, pass } = req.body;

            const database = new UserDatabase();
            const userCreated = new User (username,email,cpf,pass);
            await database.createUser(userCreated);

            return SuccessResponse.created(res,
                "New user successfully created!", userCreated.toJson())
        }catch (error:any){
            return ServerError.genericError(res,error);
        }
    }

    public async loginUser (req: Request, res: Response){
        try{
            const {email,pass} = req.body;
            const database = new UserDatabase();

            let user = await database.getOne(email,pass);
            return SuccessResponse.success(res,"User successfully obtained",user);
        }catch(error:any){
            return ServerError.genericError(res,error)
        }
    }

    public async getId (req: Request, res: Response){
        try{
            const { userId } = req.params;
            const database = new UserDatabase();
            let user = await database.getUserID(userId);

            if(!user) {return RequestError.notFound(res, "User"); }

            return SuccessResponse.success(res,"Usuário:", user.toJson());
        
        }catch(error:any){
            return ServerError.genericError(res,error)
        }
    }

    public async deleteUser (req: Request, res: Response){
        try{
            const {userId} = req.params;
            const database = new UserDatabase();
            const result = await database.delete(userId);

            if (result === 0) {return RequestError.notFound(res,"User")}
            
            return SuccessResponse.success(res,
                "User successfully deleted", userId);

        }catch(error:any){
            return ServerError.genericError(res,error)
        }
    }

    public async updateUser (req: Request, res: Response){
        try{
            const { userId } = req.params;
            const { username, pass } = req.body;
            const database = new UserDatabase();
            const result = await database.setUpdateUser(userId, username, pass);
            if(result === 0 ){return RequestError.notFound(res, 'User')};

            return SuccessResponse.success(res, "User successfully update",userId);
            
        }catch(error:any){
            return ServerError.genericError(res,error)
        }
    }
}


