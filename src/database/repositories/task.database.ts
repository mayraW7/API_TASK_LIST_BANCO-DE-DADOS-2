import { Task } from "../../models/task.model";
import { User } from "../../models/user.model";
import { DatabaseConnection } from "../config/database.connection";
import { TaskEntity } from "../entities/task.entity";
import { UserEntity } from "../entities/user.entity";



export class TaskDatabase{
    private repository = DatabaseConnection.connection.getRepository(TaskEntity);

//mapEntityToModel - recebe uma "entity de task" e tem que retornar um "Task"
    public static mapEntityToModel(entity: TaskEntity): Task{
        return Task.create(
            entity.id,
            entity.description,
            entity.detailing,
            entity.filed
        )
    }

    public async listUser(userId: string, description?: string){
        const result = await this.repository.find({
            where: {
                userId: userId,
                description: description,
            },
            relations: [
                "user"
            ],
        });
        //como é uma list - fazemos o map para retornar as listagens;
        return result.map((item)=> TaskDatabase.mapEntityToModel(item));
    }
    public async list(id: string){
        const result = await this.repository.find( { where: {
            id:id,
        },
        relations: [
            "user"
        ],
        });
            if (!result){
                return 0;
            }
        return result.map((item)=> TaskDatabase.mapEntityToModel(item));
    }

    public async create(idUser:string, task:Task){
        const taskEntity = this.repository.create({
            id:task.id,
            filed: task.filed,
            description: task.description,
            detailing: task.detailing,
            userId: idUser
        });
        const result = await this.repository.save(taskEntity);
        return TaskDatabase.mapEntityToModel(result);
    }

    public async update(id: string, data?: any) {
    const result = await this.repository.update(
        {
        id,
        },
        {
        description: data.description,
        detailing: data.detailing,
        filed: data.filed,
        }
    );

        if (result.affected === 1) {
            return {
            id,
            data,
            };
        }

    return null;
    }

    public async delete(id: string) {
        const result = await this.repository.delete({
            id,
        });
        return result.affected ?? 0;
    }

}