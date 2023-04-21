import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({
//se eu não colocar o nome ele automaticamente entende o nome da classe como o nome do arquivo: (ex.: user_entity), também gera por default o schema "public".
    name: "user",
    schema: "tasks_list"
})
export class UserEntity extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        length: 30
    })
    username: string;

    @Column({
        length: 30
    })
    email: string;

    @Column({
        type: 'int8'
    })   
    cpf: number;

    @Column({
        length: 10
    })
    pass: string;

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
}