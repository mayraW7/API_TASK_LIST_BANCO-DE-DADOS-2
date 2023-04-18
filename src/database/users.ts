import { User } from "../models/user.model";

export const users: User[] = [
    new User ("Marcia", "email@email.com", 17740833029, "senha"),
    new User ("João", "email1@email.com", 90577791028, "senha"),
    new User ("Ana", "email2@email.com", 17553400017, "senha"),
    new User ("Julio", "email3@email.com", 92146215003, "senha"),
];

//Para fins de teste no Postman:
// {
//     "username": "Maria", 
//     "email": "email4@email.com", 
//     "cpf": 77373412009, 
//     "pass": "senha"
// }
