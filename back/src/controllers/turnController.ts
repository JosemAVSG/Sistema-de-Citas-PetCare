import { Request, Response } from "express";
import {
    cancelTurnService,
  createTurnService,
  getTurnsByIdService,
  getTurnsByUserService,
  getTurnsService,
  
} from "../services/turnsServices";
import { Turn } from "../entity/turn";

export const createTurn = async (req: Request, res: Response) => {
  try {
          
    const { date, time, userId, description } = req.body;
    const turn: Turn | Error | undefined = await createTurnService({ date, time, userId, description });
      
    return res.status(201).json(turn);
  } catch (err) {
     return res.status(400).json('Mensaje:' + err);
  }
};

export const getTurns = async (req: Request, res: Response) => {
  try {
    const turns = await getTurnsService();
    return res.status(200).json(turns);
  } catch (error) {
     return res.status(400).json("Error:"+ error);
  }
};

export const getTurnsById = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  try {
    const turn = await getTurnsByIdService(Number(id));

    return  res.status(200).json(turn);
  } catch (error) {
    return res.status(400).json("Error al obtener el turno");
  }
};

export const getTurnByUserId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const turn = await getTurnsByUserService(Number(id));
    if (!turn) {
      throw new Error("No se encontraron turnos para este usuario");
    }
    res.status(200).json(turn);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const cancelTurn = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const turn = await cancelTurnService(Number(id));
    
        return res.status(200).json(turn);
    } catch (error) {
        return res.status(400).json("Error al cancelar el turno");
    }
};
