import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { statusType } from "../interface/turn.interface";
import { User } from "./user";
@Entity()
export class Turn{
    @PrimaryGeneratedColumn()
    id: number;
    @Column({type: "date"})
    date: Date;
    @Column({type: "time"})
    time: Date;
    @Column()
    status: statusType
    @Column()
    description: string
    @ManyToOne(() => User, (user) => user.turns)
    user: User;
}
