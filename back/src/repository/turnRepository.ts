import { AppDataSource } from "../config/data-source";
import { Turn } from "../entity/turn";

export const turnRepository = AppDataSource.getRepository(Turn)