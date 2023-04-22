import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "./user.entity";



@Entity({
    name: "tasks",
    schema: "tasks_list"
})
export class TaskEntity{
    @PrimaryColumn("uuid")
    public id: string;

    @Column()
    public description: string;

    @Column()
    public  detailing: string;

    @Column({ default: false })
    filed: boolean;

    @CreateDateColumn({
    name: "dthr_cadastro",
    type: "timestamp",
    })
    createdAt: Date;

    @UpdateDateColumn({
    name: "dthr_atualizacao",
    type: "timestamp",
    })
    updatedAt: Date;

    @Column({name: "id_user"})
    userId: string;
    // (User) 1 ----- n (Tasks)
    @ManyToOne(()=> UserEntity,{
        onDelete: "CASCADE"
    })
    @JoinColumn({
        //tem que ser o mesmo nome, pois é a coluna que junta as duas tabelas(FK)
        name: "id_user"
    })
    user: UserEntity;
}