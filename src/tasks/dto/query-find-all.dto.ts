import { IsEnum, IsInt, IsNumber, IsNumberString, IsOptional, ValidateIf } from "class-validator";
import { TaskStatusEnum } from "../enums/task-status.enum";
import { ApiProperty } from "@nestjs/swagger";

export class QueryFindAllDto {
    @ApiProperty()
    @IsOptional()
    @IsNumberString()
    status: TaskStatusEnum;
}
