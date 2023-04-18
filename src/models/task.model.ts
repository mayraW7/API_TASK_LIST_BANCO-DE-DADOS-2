import { v4 as createUuid } from "uuid";

export class Task {
    private _id: string;
    private _filed: boolean;

    constructor(
        private _description: string,
        private _detailing: string
    ){
        this._id = createUuid();
        this._filed = false;
    }

//--------------GETTERS--------------------

    public get id(){
    return this._id
    }
    public get filed(){
    return this._filed;
    }
    public get description(){
    return this._description;
    }
    public get detailing(){
    return this._detailing;
    }
//--------------SETTERS--------------------

    public set filed(filed:boolean){
    this._filed = filed;
    }
    public set description(description:string){
    this._description = description;
    }
    public set detailing(detailing:string){
    this._detailing = detailing;
    }

}