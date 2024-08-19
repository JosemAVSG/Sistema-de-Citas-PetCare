import { userDto } from "../Dto/userDto";
import { IUser, users } from "../interface/user.interface";
import { createCrendentialService, validateCrendentialService } from "./credentialSerivice";
import { User } from "../entity/user";
import { userRepository } from "../repository/userRepository";

export const getUserService = async (): Promise<User[] | undefined> => {
  const user = await userRepository.find();
  return user;
};

export const getUserByIdService = async (id: number): Promise<User | null> => {
  const user = await userRepository.findOneBy({ id });
  return user;
};
export const createUserService = async (
  user: userDto
): Promise<User | undefined> => {
  const { name, email, username, password, birthdate, nDni } = user;

  const newUser = userRepository.create({ name, email, birthdate, nDni });
  const saveuser = await userRepository.save(newUser);
  const credential = createCrendentialService({
    username,
    password,
    userid: saveuser.id,
  });

  if (!credential) {
    throw new Error("Error al crear el credencial");
  }
  return saveuser;
};

export const loginUserService = async ( username: string,  password: string): Promise<User | null> => {
   
    const validate: number | string = await validateCrendentialService({ username, password });

    if (!validate || typeof validate === "string") {
      throw new Error("Credenciales incorrectas");
    }
    const user = await getUserByIdService(validate);
    return user;
};

export const updateImageService = async ( id: number,archivo: { buffer: Buffer, contentype: string  }): Promise<User | Error | null> => {
  

    const user = await userRepository.findOneBy({ id });

    if (!user) {
      return new Error("User not found");
    }
    const imagen = Buffer.from(archivo.buffer).toString('base64');

    const url = `data:image/${archivo.contentype};base64,${imagen}`;

    user.profileImage= url;
    await userRepository.save(user);
   
    return user;
  
}