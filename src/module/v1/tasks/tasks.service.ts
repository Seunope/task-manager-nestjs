import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateTaskDto, UpdateTaskStatusDto } from './tasks.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async createTask(data: CreateTaskDto) {
    return this.prisma.task.create({ data });
  }

  async listTasks() {
    return this.prisma.task.findMany();
  }

  async updateTaskStatus(id: number, data: UpdateTaskStatusDto) {
    return this.prisma.task.update({
      where: { id },
      data: { status: data.status },
    });
  }

  async deleteTask(id: number) {
    return this.prisma.task.delete({ where: { id } });
  }
}
