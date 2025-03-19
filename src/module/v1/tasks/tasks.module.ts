import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { PrismaService } from 'src/module/common/prisma/prisma.service';

@Module({
  imports: [],
  providers: [TasksService, PrismaService],
  controllers: [TasksController],
})
export class TasksModule {}
