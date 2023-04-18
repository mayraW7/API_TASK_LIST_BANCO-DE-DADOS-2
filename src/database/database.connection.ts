import { PoolClient } from 'pg';
import config from './database.config';

export class DatabaseConnection{
    private static _connection: PoolClient;

    public static async connect(){
       this._connection = await config.connect();
       console.log("Database connected");
    }

    public static get connection(){
        return this._connection;
    }
}