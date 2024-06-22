import { TaskStatusEnum } from "../enums/task-status.enum";

export interface TaskInterface {
    title: string;
    description: string;
    status: TaskStatusEnum
}
