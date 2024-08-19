export interface userDto {
    name: string;
    email: string;
    birthdate: Date;
    nDni: number;
    username: string;
    password: string;
}

export interface credentialDto{
    userid: number;
    username: string;
    password: string;
}
export interface turnDto{
    date : Date,
    time: string,
    description: string,
    userId: number
}
export interface loginDto{
    username: string;
    password: string;
}