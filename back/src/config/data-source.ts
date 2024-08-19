import { DataSource } from "typeorm"
import { User } from '../entity/user'
import { Credential } from "../entity/credential"
import { Turn } from "../entity/turn"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "admin",
    database: "henrysql",
    // dropSchema: true,
    synchronize: true,
    logging: ['error'],
    entities: [User,Credential,Turn],
    subscribers: [],
    migrations: [],
})