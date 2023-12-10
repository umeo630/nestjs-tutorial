import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) // Repositoryを注入
    private readonly taskRepository: Repository<Task>,
  ) {}

  create(dto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.save(dto);
  }

  findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  findOne(id: string): Promise<Task> {
    return this.taskRepository.findOne({ where: { id: Number(id) } });
  }

  async update(id: string, dto: UpdateTaskDto): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id: Number(id) },
    });

    task.name = dto.name;
    task.isCompleted = dto.isCompleted;

    return this.taskRepository.save(task);
  }

  delete(id: string): Promise<DeleteResult> {
    return this.taskRepository.delete({ id: Number(id) });
  }
}
