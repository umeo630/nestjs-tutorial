import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  oneTask,
  createTaskDto,
  tasks,
  updateTaskDto,
  updatedTask,
  deleteResult,
} from '../../test/tasks/mocks';

describe('TasksService', () => {
  let service: TasksService;
  let repository: Repository<Task>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useValue: {
            save: jest.fn().mockResolvedValue(oneTask),
            find: jest.fn().mockResolvedValue(tasks),
            findOne: jest.fn().mockResolvedValue(oneTask),
            delete: jest.fn().mockResolvedValue(deleteResult),
          },
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    repository = module.get<Repository<Task>>(getRepositoryToken(Task));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a task', () => {
      const repositorySaveSpy = jest.spyOn(repository, 'save');
      expect(service.create(createTaskDto)).resolves.toEqual(oneTask);
      expect(repositorySaveSpy).toHaveBeenCalledWith(createTaskDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of tasks', () => {
      const repositoryFindSpy = jest.spyOn(repository, 'find');
      expect(service.findAll()).resolves.toEqual(tasks);
      expect(repositoryFindSpy).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a task', () => {
      const repositoryFindOneSpy = jest.spyOn(repository, 'findOne');
      expect(service.findOne('1')).resolves.toEqual(oneTask);
      expect(repositoryFindOneSpy).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });

  describe('update', () => {
    it('should update a task', async () => {
      expect(service.update('1', updateTaskDto)).resolves.toEqual(updatedTask);
    });
  });

  describe('delete', () => {
    it('should delete a task', () => {
      const repositoryDeleteSpy = jest.spyOn(repository, 'delete');
      expect(service.delete('1')).resolves.toEqual(deleteResult);
      expect(repositoryDeleteSpy).toHaveBeenCalledWith({ id: 1 });
    });
  });
});
