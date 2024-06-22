import { UUID, randomUUID } from "node:crypto";
import { Task } from "src/tasks/entities/task.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryColumn()
    readonly id: UUID;

    @Column()
    username: string;
    
    @Column()
    password: string;
    
    @OneToMany(() => Task, (task) => task.user)
    tasks: Task[];

    constructor(username: string, password: string) {
        this.id = randomUUID();
        this.username = username;
        this.password = password;
    }
}
