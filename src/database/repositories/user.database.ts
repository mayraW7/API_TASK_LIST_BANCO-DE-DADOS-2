import { User } from "../../models/user.model";
import { DatabaseConnection } from "../config/database.connection";
import { UserEntity } from "../entities/user.entity";

export class UserDatabase {

    private repository = DatabaseConnection.connection.getRepository(UserEntity);

    private mapEntityToModel(entity: UserEntity): User {
        return User.create(
          entity.id,
          entity.username,
          entity.email,
          entity.cpf,
          entity.pass
        );
    }

    public async listEntity(): Promise<User[]>{
        const result = await this.repository.find();
        return result.map((user) => this.mapEntityToModel(user));
    }

    public async createUser(user: User){
        const userEntity = this.repository.create({
            id: user.id,
            username: user.username,
            email: user.email,
            cpf: user.cpf,
            pass: user.pass,
          });
          const result = await this.repository.save(userEntity);
      
          return this.mapEntityToModel(result);      
    };

    public async getUserID(id: string): Promise<User | null> {

        const result = await this.repository.findOneBy({id});
        
        if (result === null){return null;}

        return this.mapEntityToModel(result);
    };

    public async getEmail(email: string): Promise<User | null> {

        const result = await this.repository.findOneBy({email});
        
        if (result === null){ return null;}

        return this.mapEntityToModel(result);
    }

    public async getOne(email: string, pass: string): Promise<User | null> {
        const result = await this.repository.findOne({
            where: {email, pass,},
        });
        
        if (result === null){ return null;}

        return this.mapEntityToModel(result);
    }

    public async getCPF(cpf: number): Promise<User | null> {
        const result = await this.repository.findOneBy({cpf});
        
        if (result === null){return null;}

        return this.mapEntityToModel(result);
    }
    
    public async setUpdateUser( id:any, username:string,  pass: string): Promise<number>{
        const result =  await this.repository.update({
            id
        },{
            username,
            pass,
        });

        return result.affected ?? 0;
    }

    public async delete(id: string): Promise<number>{

        const result =  await this.repository.delete({id});
//delete retorna affected - retornando number ou null - "zero" se não achar ou 1 se encontrar.
        return result.affected ?? 0;

    };

}