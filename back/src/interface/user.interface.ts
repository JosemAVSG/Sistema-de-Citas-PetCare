
export interface IUser {
    id:number;
    name: string;
    email: string;
    birthdate: Date;
    nDni: number;
    crendentialsId: number;
}

export const users: IUser[] =[]