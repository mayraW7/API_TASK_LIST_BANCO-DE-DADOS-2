import { User } from "../models/user.model";
import { DatabaseConnection } from "./database.connection";

export class UserDatabase {

    public async createUser(user: User){

        let query = `insert into tasks_list.user `;
        query += `(id, username, email, cpf, pass) `
        query += `values `
        query += `('${user.id}', '${user.username}', '${user.email}', ${user.cpf}, ${user.pass}); `;
 //       const values = [user.id, user.userName, user.email, user.cpf, user.pass];

        await DatabaseConnection.connection.query(query);
    
    };

    public async list(): Promise<User[]>{
        const result = await DatabaseConnection.connection.query("select * from tasks_list.user");
//resultado de cada linha da query está sendo mapeada e transformada em um model (classe User)
        return result.rows.map(row=> this.mapToModel(row));
    };

//mapToModel - foi criado para integrar os valores do banco de dados com o backEnd, ele mapeia cada linha e retorna conforme o que foi programado.
// para transformar cada linha que "estava" "ANY" em "USER" foi necessário criar o método "CREATE" lá na classe User(user.model.ts)
    private mapToModel(row:any): User {
        return User.create(row.id, row.username, row.email.trim(), row.cpf, row.pass);
    }

//observe que ao passar o mouse o método get retorna 'NULL'(se não encontrar id) ou 'User'(por conta do mapToModel).

    public async getUserID(id: string) {
    const result = await DatabaseConnection.connection.query(`select * from tasks_list.user where id = '${id}'`)
    if(result.rows.length === 0){
        return null;
    }
//para retornar a primeira linha do array qdo ele encontra o "id":
    const row = result.rows[0];
    return this.mapToModel(row);
    }

    public async getEmail(email: string){
        const result = await DatabaseConnection.connection.query(`select * from tasks_list.user where email = '${email}'`)
        if(result.rows.length === 0){
            return null;
    };}

    public async getOne(email: string, pass: string) {
//    return users.find((item)=>item.email === email && item.pass === pass)
    const result = await DatabaseConnection.connection.query(`select * from tasks_list.user where email = '${email}' and pass = '${pass}'`)
    if(result.rows.length === 0){
        return null;
    };

    };

    public async getCPF(cpf: number){
//    return users.find((user)=>user.cpf === cpf)
    const result = await DatabaseConnection.connection.query(`select * from tasks_list.user where id = '${cpf}'`)
    if(result.rows.length === 0){
        return null;
    };}
    
    public async setUpdateUser( id:any, user: Partial<User>
      //  username:string, email:string,password:string id:any,
         ){
        // Partial - trata todos 
        let query =`update tasks_list.user `
        query += `set username = '${user.username}', `
        query += `email = '${user.email}', `
        query += `pass = '${user.pass}', `
        query += `dthr_atualizacao = current_timestamp  `
        query += `where id = '${id}' `

        await DatabaseConnection.connection.query(query);
    }

    public async delete(id: string){
        await DatabaseConnection.connection.query(`delete from tasks_list.user where id ='${id}' `);
    };

}