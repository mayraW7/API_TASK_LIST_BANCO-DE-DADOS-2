import { v4 as createUuid } from "uuid";
import { Task } from "./task.model";

export class User {
    private _id: string;
    private _tasks: Task[];
        constructor(private _username:string, private _email:string, private _cpf:number, private _pass:string){
            this._id = createUuid();
            this._tasks = [];
        }

//--------------GETTERS--------------------

    public get id(){
        return this._id;
    }
    public get username(){
        return this._username;
    }
    public get cpf(){
        return this._cpf;
    }
    public get email(){
        return this._email;
    }
    public get pass(){
        return this._pass;
    }
    public get tasks(){
        return this._tasks ?? [];
    }


//--------------SETTERS--------------------

    public set username(username:string){
        this._username = username;
    }
    public set email(email:string){
        this._email = email;
    }
    public set pass(pass:string){
        this._pass = pass;
    }
    public addTask(task: Task) {
        this._tasks.push(task);
    }
    public toJson(){
        return {
            userId: this._id,
            username: this.username,
            email: this.email,
            cpf: this.cpf,
            tasks: this.tasks,
        };
    }
    // "gambiarra" necessária para poder "setar o id", como ele é privado,
    // só pode ser acessado de dentro da própria classe, neste caso: CLASS USER. Precisa ser statico para uso "user.database.ts"
    public static create(id:string, username: string,  email: string, cpf: number, pass: string, tasks?:Task[]){
        const user = new User(username, email, cpf, pass);
        user._id = id;
        user._tasks = tasks ?? [];
        return user;
    }
}