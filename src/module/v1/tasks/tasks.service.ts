import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/module/common/prisma/prisma.service';
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
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return this.prisma.task.update({
      where: { id },
      data: { status: data.status },
    });
  }

  async deleteTask(id: number) {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return this.prisma.task.delete({ where: { id } });
  }
}
