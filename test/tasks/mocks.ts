import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { Task } from 'src/tasks/task.entity';

export const createTaskDto: CreateTaskDto = { name: 'work out' };
export const oneTask: Task = { id: 1, name: 'work out', isCompleted: false };
export const tasks: Task[] = [
  { id: 1, name: 'work out', isCompleted: false },
  { id: 2, name: 'read book', isCompleted: false },
];
