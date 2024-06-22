import { UUID, randomUUID } from "node:crypto";
import { TaskStatusEnum } from "../enums/task-status.enum";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "src/users/entities/user.entity";

@Entity()
export class Task {
    @PrimaryColumn()
    readonly id: UUID;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: TaskStatusEnum

    @ManyToOne(() => User)
    user: User;

    constructor(title: string, description: string, status: TaskStatusEnum, user: User) {
        this.id = randomUUID();
        this.title = title;
        this.description = description;
        this.status = status;
        this.user = user;
    }
}
