import { Request, Response } from "express";
import {
  createUserService,
  getUserByIdService,
  getUserService,
  loginUserService,
  updateImageService,
} from "../services/userService";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config/env";
import { IPayload } from "../middleware/validateToken";
import { createAccessToken } from "../utils/jwt";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, birthdate, nDni, username, password } = req.body;

    const newUser = await createUserService({
      name,
      email,
      username,
      password,
      birthdate,
      nDni,
    });
    if(newUser){
      const token = await createAccessToken({ id: newUser.id });
      res.cookie("token", token);
      return res.status(200).json(newUser);
    }else{
      throw new Error();
    }
  } catch (err) {
    return res.status(400).json("Error al crear el usuario");
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const users = await getUserService();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json("Error al obtener los usuarios");
  }
};

export const getUsersById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await getUserByIdService(Number(id));

    return res.status(200).json(user);
  } catch (err) {
    return res.status(400).json("Error al obtener el usuario");
  }
};

export const loginController = async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const { username, password } = req.body;
    const user = await loginUserService(username, password);
    
    if (user) {
    const token = await createAccessToken({ id: user.id });
    res.cookie("token", token);
    return res.status(200).json(user);
    }else{
      return res.status(404).json("User not found");
    }
  } catch (err) {
    return res.status(404).json("User not found");
  }
};

export const verifyToken = async (req: Request, res: Response) => {
  // const token = req.headers["token"] as string;
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, TOKEN_SECRET) as IPayload;
    return res.status(200).json({ message: "Authorized", decoded });
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const updateUserProfileImage = async (req: Request, res: Response) => {
  const { id } = req.params;

  const image = req.file;
  if (!image) {
    return res.status(400).send('No se subió ninguna imagen.');
  }
  // const archivo1 = Buffer.from(image.buffer )

  const archivo = {
    nombre: image.originalname,
    buffer: image.buffer,
    contentype: image.mimetype,
  }
  // console.log( archivo );
  try {
      const user = await updateImageService(Number(id), archivo);
      if (!user) {
        throw new Error("No se pudo actualizar la imagen.");
      }
      return res.status(200).send('Imagen actualizada correctamente.');
  } catch (error) {
    return res.status(400).send('Error al actualizar la imagen.');
  }
  
};