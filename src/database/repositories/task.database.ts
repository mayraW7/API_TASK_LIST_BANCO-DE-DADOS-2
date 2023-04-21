import { Task } from "../../models/task.model";
import { DatabaseConnection } from "../config/database.connection";
import { TaskEntity } from "../entities/task.entity";



export class TaskDatabase{
    private repository = DatabaseConnection.connection.getRepository(TaskEntity);

    private mapEntityToModel(entity: TaskEntity): Task{
        return Task.create(
            entity.id,
            entity.description,
            entity.detailing,
            entity.filed
        )
    }

    public async list(userId: string, description?: string){
        const result = await this.repository.find({
            where: {
                userId: userId,
                description: description,
            },
            relations: [
                "user"
            ],
        });
        return result.map((item)=> this.mapEntityToModel(item));
    }

}