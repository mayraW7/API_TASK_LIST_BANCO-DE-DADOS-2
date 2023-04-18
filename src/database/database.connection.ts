import { DataSource } from 'typeorm';
import config from './database.config';

export class DatabaseConnection{
    private static _connection: DataSource;

    public static async connect(){
       this._connection = await config.initialize();
       console.log("Database connected");
    }

    public static get connection(){
        return this._connection;
    }
}