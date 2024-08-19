import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  
  JoinColumn,
  OneToOne,
  OneToMany,
} from "typeorm";
import { Credential } from "./credential";
import { Turn } from "./turn";
@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id: number
  @Column({length: 50})
  name: string
  @Column({ unique: true })
  email: string
  @Column({ type: "date" })
  birthdate: Date
  @Column({ unique: true, type: "bigint" })
  nDni: number
  @Column({ nullable: true , type:'text'}) // Haz que este campo sea opcional
  profileImage: string;
  @OneToOne(() => Credential )
  @JoinColumn()
  crendential: Credential;
  @OneToMany(() => Turn, (turn) => turn.user)
  turns: Turn[];
 
}