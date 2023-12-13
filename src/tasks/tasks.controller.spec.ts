import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { createTaskDto, oneTask, tasks } from '../../test/tasks/mocks';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        TasksService,
        {
          provide: TasksService,
          useValue: {
            create: jest.fn().mockResolvedValue(oneTask),
            findAll: jest.fn().mockResolvedValue(tasks),
            findOne: jest.fn().mockResolvedValue(oneTask),
          },
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a task', () => {
      const serviceCreateSpy = jest.spyOn(service, 'create');
      expect(controller.create(createTaskDto)).resolves.toEqual(oneTask);
      expect(serviceCreateSpy).toHaveBeenCalledWith(createTaskDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of tasks', () => {
      const serviceFindSpy = jest.spyOn(service, 'findAll');
      expect(controller.findAll()).resolves.toEqual(tasks);
      expect(serviceFindSpy).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a task', () => {
      const serviceFindOneSpy = jest.spyOn(service, 'findOne');
      expect(controller.findOne('1')).resolves.toEqual(oneTask);
      expect(serviceFindOneSpy).toHaveBeenCalledWith('1');
    });
  });
});
