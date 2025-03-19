import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { TasksModule } from './module/v1/tasks/tasks.module';
import { UsersModule } from './module/v1/users/users.module';
import { AuthService } from './module/v1/auth/auth.service';
import { AuthModule } from './module/v1/auth/auth.module';
import { PrismaModule } from './module/common/prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make the ConfigModule available globally
      envFilePath: '.env', // Specify the path to your .env file
    }),
    AuthModule,
    UsersModule,
    TasksModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
