import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { UUID } from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskStatusEnum } from './enums/task-status.enum';
import { UsersService } from 'src/users/users.service';
import { error } from 'console';

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    private usersService: UsersService,
  ) { }

  async create(createTaskDto: CreateTaskDto, username: string): Promise<{
    id: string,
    title: string,
    description: string,
    status: TaskStatusEnum
  }> {
    const user = await this.usersService.findOne(username);
    const task = this.tasksRepository.create({ ...createTaskDto, user });
    const { user: owner, ...data } = await this.tasksRepository.save(task);
    return data;
  }

  async findAll(username: string, status?: TaskStatusEnum) {
    return await this.tasksRepository.find({
      select: { user: { password: false } },
      relations: { user: true },
      where: {
        status,
        user: { username }
      }
    });
  }

  async findOne(id: UUID, username: string) {
    const { user, ...data } = await this.findTask(id, username);
    return data;
  }

  async update(id: UUID, updateTaskDto: UpdateTaskDto, username: string) {
    const existingTask = await this.findTask(id, username);

    const { title, description, status } = updateTaskDto;
    if (title) {
      existingTask.title = title;
    }
    if (description) {
      existingTask.description = description;
    }
    if (status) {
      existingTask.status = status;
    }

    // ToDo
    // const userData = this.tasksRepository.merge(existingTask, updateTaskDto);
    // usar repository.merge gera a falha de segurança de alterar o id da task
    // não consegui resolver pelo class-validator

    const { user, ...data } = await this.tasksRepository.save(existingTask);
    return data;
  }

  async remove(id: UUID, username: string) {
    const existingTask = await this.findTask(id, username);
    const { user, ...data } = await this.tasksRepository.remove(existingTask);
    return data;
  }

  private async findTask(id: UUID, username: string) {
    const task = await this.tasksRepository.findOne({
      relations: { user: true },
      where: { id }
    });
    
    if (!task) {
      throw new NotFoundException();
    }

    if (task.user.username !== username) {
      throw new ForbiddenException("you do not have permission");
    }

    return task;
  }
}
