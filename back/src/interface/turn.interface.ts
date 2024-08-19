export enum statusType {
    pendiente = 'pendiente',
    atendido = 'atendido',
    cancelado = 'cancelado',
}
export interface ITurn {
    id: number;
    date: Date;
    hour: string;
    userId: number;
    status: statusType
}
export const turns: ITurn[] =[]