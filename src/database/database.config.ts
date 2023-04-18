//import { Pool} from 'pg';
import { DataSource } from 'typeorm/data-source';
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
    synchronize: false,
    //se true: faz sincronização automática entre Banco de Dados e tyORM;
});
