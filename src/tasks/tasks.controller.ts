import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, ParseIntPipe, ValidationPipe, Query, Request } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UUID } from 'crypto';
import { QueryFindAllDto } from './dto/query-find-all.dto';
import { TaskStatusEnum } from './enums/task-status.enum';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('tasks')
@ApiBearerAuth()
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Post()
  create(
    @Body(new ValidationPipe()) createTaskDto: CreateTaskDto,
    @Request() req
  ) {
    return this.tasksService.create(createTaskDto, req.user.username);
  }

  @ApiQuery({
    name: 'status',
    enum: TaskStatusEnum,
    required: false
  })
  @Get()
  findAll(
    @Request() req,
    @Query(new ValidationPipe()) query?: QueryFindAllDto
  ) {
    return this.tasksService.findAll(req.user.username, query.status);
  }

  @Get(':id')
  findOne(
    @Param('id', new ParseUUIDPipe()) id: UUID,
    @Request() req
  ) {
    return this.tasksService.findOne(id, req.user.username);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: UUID,
    @Body(new ValidationPipe()) updateTaskDto: UpdateTaskDto,
    @Request() req
  ) {
    return this.tasksService.update(id, updateTaskDto, req.user.username);
  }

  @Delete(':id')
  remove(
    @Param('id', new ParseUUIDPipe()) id: UUID,
    @Request() req
  ) {
    return this.tasksService.remove(id, req.user.username);
  }
}
