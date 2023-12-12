import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { createTaskDto, oneTask } from '../../test/tasks/mocks';

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
});
