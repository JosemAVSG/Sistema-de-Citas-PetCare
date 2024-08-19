import { AppDataSource } from "../config/data-source";
import { Credential } from "../entity/credential";


export const credentialRepository = AppDataSource.getRepository(Credential)