import { IsEnum, IsInt, IsString } from "class-validator";
import { TaskStatusEnum } from "../enums/task-status.enum";
import { ApiProperty } from "@nestjs/swagger";

export class CreateTaskDto {
    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsString()
    description: string;

    @ApiProperty({ enum: TaskStatusEnum })
    @IsInt()
    @IsEnum(TaskStatusEnum)
    status: TaskStatusEnum;
}
