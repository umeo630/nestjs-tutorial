import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { UpdateTaskDto } from 'src/tasks/dto/update-task.dto';
import { Task } from 'src/tasks/task.entity';
import { DeleteResult } from 'typeorm';

export const createTaskDto: CreateTaskDto = { name: 'work out' };
export const oneTask: Task = { id: 1, name: 'work out', isCompleted: false };
export const tasks: Task[] = [
  { id: 1, name: 'work out', isCompleted: false },
  { id: 2, name: 'read book', isCompleted: false },
];
export const updateTaskDto: UpdateTaskDto = {
  name: 'read book',
  isCompleted: true,
};

export const updatedTask: Task = {
  id: 1,
  name: 'read book',
  isCompleted: true,
};

export const deleteResult: DeleteResult = {
  raw: {},
  affected: 1,
};
