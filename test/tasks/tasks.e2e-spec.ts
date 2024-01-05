import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Task } from '../../src/tasks/task.entity';
import { TasksModule } from '../../src/tasks/tasks.module';
import { Repository } from 'typeorm';
import * as request from 'supertest';
import configration from '../../config/configration';

describe('Tasks - /tasks (e2e)', () => {
  const taskA = {
    name: 'work out',
  };

  let app: INestApplication;
  let tasksRepository: Repository<Task>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.env',
          isGlobal: true,
          load: [configration],
        }),
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => ({
            type: 'postgres',
            host: configService.get('databaseTest.host'),
            port: configService.get('databaseTest.port'),
            username: configService.get('databaseTest.user'),
            password: configService.get('databaseTest.pass'),
            database: configService.get('databaseTest.name'),
            autoLoadEntities: true,
            synchronize: true,
          }),
          inject: [ConfigService],
        }),
        TasksModule,
      ],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    tasksRepository = module.get<Repository<Task>>(getRepositoryToken(Task));
  });

  it('Create a task [POST /tasks]', () => {
    return request(app.getHttpServer())
      .post('/tasks')
      .send(taskA)
      .expect(201)
      .then(({ body }) => {
        expect(body).toEqual({
          id: expect.any(Number),
          ...taskA,
          isCompleted: false,
        });
      });
  });

  afterEach(async () => {
    await tasksRepository.query(`DELETE FROM task;`);
  });

  afterAll(async () => {
    await app.close();
  });
});
