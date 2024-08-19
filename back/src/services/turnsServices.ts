import { turnDto } from "../Dto/userDto";
import { statusType } from "../interface/turn.interface";
import { Turn } from "../entity/turn";
import { turnRepository } from "../repository/turnRepository";
import { userRepository } from "../repository/userRepository";
import { AppDataSource } from "../config/data-source";
import { sendEmailResend } from "../utils/resend";

export const getTurnsService = async (): Promise<Turn[] | undefined> => {
  const turns = await turnRepository.find();
  return turns;
};

export const getTurnsByIdService = async (id: number): Promise<Turn | null> => {
  const turn = await turnRepository.findOneBy({ id });
  return turn;
};

export const getTurnsByUserService = async (
  id: number
): Promise<Turn[] | null | undefined> => {
  const turn = await turnRepository.find({
    where: { user: { id: id } },
  });
  const today= new Date();
  if(turn && turn.length > 0){
    turn.forEach((t) => {
      // Combine date and time into a single Date object
    const turndate = new Date(t.date);
    const turntime = new Date(t.time);

    turndate.setHours(turntime.getHours());
    turndate.setMinutes(turntime.getMinutes());
    turndate.setSeconds(turntime.getSeconds());

    // Calculate the finished time of the turn
    const getTurnFinished = new Date(turndate);
    getTurnFinished.setHours(turndate.getHours() + 1);
      
      if(today > t.date && t.status != statusType.cancelado){
        t.status = statusType.atendido
      }
    })
    await turnRepository.save(turn);
   }
  return turn;
};

export const createTurnService = async (
  turn: turnDto
): Promise<Turn | Error> => {
  const { date, time, userId, description } = turn;

  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();
  try {
    await queryRunner.startTransaction();
    const horainicio = new Date(date).setHours(9, 0, 0);
    const horafin = new Date(date).setHours(18, 0, 0);

    let horaTurno = new Date(date).setHours(
      parseInt(time.split(":")[0]),
      parseInt(time.split(":")[1]),
      0
    );

    if (/^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/i.test(time)) {
      const [times, period] = time.split(" ");
      const [hourPart, minutePart] = times.split(":");

      const hourNumber = parseInt(hourPart, 10) % 12; // Obtener la hora en formato de 24 horas
      const adjustedHour =
        period.toLowerCase() === "pm" ? hourNumber + 12 : hourNumber;

      // Crear un nuevo objeto Date y establecer la hora
      horaTurno = new Date(date).setHours(
        adjustedHour,
        parseInt(minutePart, 10),
        0
      );
    }
    if (horaTurno < horainicio || horaTurno > horafin)
      throw new Error("La hora no es valida");

    const newTurn = turnRepository.create({
      date,
      time,
      description,
      status: statusType.pendiente,
    });
    const turnsave = await queryRunner.manager.save(newTurn);

    const user = await userRepository.findOneBy({ id: userId });

    if (!user) throw new Error("El usuario no existe");
    turnsave.user = user;

    await queryRunner.manager.save(turnsave);
    await queryRunner.commitTransaction();
    await sendEmailResend(
      user.email,
      "Turno creado",
      `Tu turno fue creado con exito, el dia ${date} a las ${time}`
    );
    return turnsave;
  } catch (error) {
    await queryRunner.rollbackTransaction();
    return new Error("Error: " + error);
  } finally {
    await queryRunner.release();
  }
};
export const cancelTurnService = async (
  id: number
): Promise<number | null | Error> => {
  try {
    const turn = await turnRepository.findOneOrFail({where : {id: id}, relations: {user: true}});
    turn.status = statusType.cancelado;
    await turnRepository.save(turn);
    console.log(turn.user.email);
    await sendEmailResend(
      turn.user.email,
      "Turno cancelado",
      `Tu turno ${turn.description}  de el dia ${turn.date} a las ${turn.time} fue cancelado con exito,`
    );

    return turn.id;
  } catch (error) {
    return new Error("Error: " + error);
  }
};
