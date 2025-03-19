import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { PrismaService } from 'src/module/common/prisma/prisma.service';
import { CustomLoggerService } from 'src/module/common/custom-logger/custom-logger.service';

@Module({
  imports: [],
  providers: [TasksService, PrismaService, CustomLoggerService],
  controllers: [TasksController],
})
export class TasksModule {}
