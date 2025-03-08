import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Role } from "../_helpers/role";
import { Exclude } from "class-transformer";

@Entity() // This annotation is required
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true }) // Ensure email is unique
    email!: string;

    @Column()
    @Exclude()
    passwordHash!: string;

    @Column()
    title!: string;

    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @Column({ type: "enum", enum: Role })
    role!: Role;
}
