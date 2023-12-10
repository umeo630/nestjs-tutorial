import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';

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
}
