import { AppDataSource } from "../config/data-source"; 
import { User } from "../entity/user";

export const userRepository = AppDataSource.getRepository(User)
