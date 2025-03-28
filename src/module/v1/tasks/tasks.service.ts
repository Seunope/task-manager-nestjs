import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/module/common/prisma/prisma.service';
import { CreateTaskDto, UpdateTaskStatusDto } from './tasks.dto';
import { ResponseData } from 'src/module/common/dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async createTask(dto: CreateTaskDto, userId: number): Promise<ResponseData> {
    const task = await this.prisma.task.findFirst({
      where: { title: dto.title, user_id: userId },
    });

    if (task) {
      throw new NotAcceptableException({
        message: `This title: '${dto.title}' already exist`,
        status: false,
      });
    }

    const input = {
      ...dto,
      user_id: userId,
    };

    const newTask = await this.prisma.task.create({ data: input });

    return {
      status: true,
      data: newTask,
      message: `Tasks created`,
    };
  }

  async listTasks(userId: number): Promise<ResponseData> {
    const tasks = await this.prisma.task.findMany({
      where: { user_id: userId },
    });

    if (!tasks) {
      throw new NotFoundException({
        message: `No task found for this user`,
        status: false,
      });
    }

    return {
      status: true,
      data: tasks,
      message: `A list of user tasks`,
    };
  }

  async updateTaskStatus(
    id: number,
    dto: UpdateTaskStatusDto,
    userId: number,
  ): Promise<ResponseData> {
    const task = await this.prisma.task.findFirst({
      where: { id, user_id: userId },
    });
    if (!task) {
      throw new NotFoundException({
        message: `Task with ID ${id} not found`,
        status: false,
      });
    }
    const updateTask = await this.prisma.task.update({
      where: { id },
      data: { status: dto.status },
    });

    return {
      status: true,
      data: updateTask,
      message: `Task updated to ${dto.status}`,
    };
  }

  async editTask(
    id: number,
    dto: CreateTaskDto,
    userId: number,
  ): Promise<ResponseData> {
    const task = await this.prisma.task.findFirst({
      where: { id, user_id: userId },
    });
    if (!task) {
      throw new NotFoundException({
        message: `Task with ID ${id} not found`,
        status: false,
      });
    }

    const updateTask = await this.prisma.task.update({
      where: { id },
      data: { ...dto },
    });

    // console.log('updateTask', updateTask);
    return {
      status: true,
      data: updateTask,
      message: `Task was successfully updated`,
    };
  }

  async deleteTask(id: number, userId: number): Promise<ResponseData> {
    const task = await this.prisma.task.findFirst({
      where: { id, user_id: userId },
    });
    if (!task) {
      throw new NotFoundException({
        message: `Task with ID ${id} not found`,
        status: false,
      });
    }
    const res = await this.prisma.task.delete({ where: { id } });

    return {
      status: true,
      data: task,
      message: `Task deleted`,
    };
  }
}
