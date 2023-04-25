//import { Pool} from 'pg';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export default new DataSource({
    type: 'postgres',
    port:5432,
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: false
    },
    //se true: faz sincronização automática entre Banco de Dados e tyORM;
    synchronize: false,
    //config para garantir que só procure entitys nesta pasta;
    entities: ["src/database/entities/**/*.ts"],
    migrations: ["src/database/migrations/**/*.ts"],
    schema: "tasklist2",

});
