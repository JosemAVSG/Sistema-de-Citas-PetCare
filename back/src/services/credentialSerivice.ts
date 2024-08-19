import { credentialDto, loginDto } from "../Dto/userDto";
import { hash, isValidPassword } from "../helpers/hash";
import { ICredential, credentials } from "../interface/crendential.interface";
import { credentialRepository } from "../repository/credentialRepository";
import { userRepository } from "../repository/userRepository";
import { AppDataSource } from "../config/data-source";
export const createCrendentialService = async (credential: credentialDto) => {
  const { username, password, userid } = credential;
  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();
  try {
    await queryRunner.startTransaction();
    const user = await userRepository.findOneBy({ id: userid });
    if (!user) {
      throw new Error("El usuario no existe");
    }
    const passwordhasshed = await hash(password);
    const newCredential = credentialRepository.create({
      username,
      password: passwordhasshed,
      id: user.id,
    });

    await queryRunner.manager.save(newCredential);
    user.crendential = newCredential;
    await queryRunner.manager.save(user);
    await queryRunner.commitTransaction();
    return newCredential;
  } catch (error) {
    console.log(error);
    await queryRunner.rollbackTransaction();
  } finally {
    await queryRunner.release();
  }
};
export const validateCrendentialService = async (
  credentials: loginDto
): Promise<number | string> => {
  const { username, password } = credentials;

  const credent = await credentialRepository.findOneBy({ username });
  if (!credent) {
    return "Credenciales no encontradas";
  }
  const valid = await isValidPassword(password, credent.password);
 
  if (!valid) {
    throw new Error("Contraseña no valida");
  }
  return credent.id;
};
