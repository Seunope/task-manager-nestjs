import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './module/v1/tasks/tasks.module';
import { UsersModule } from './module/v1/users/users.module';
import { PrismaModule } from './module/common/prisma/prisma.module';

@Module({
  imports: [TasksModule, UsersModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
