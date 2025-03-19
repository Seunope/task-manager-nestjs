import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskStatusDto } from './tasks.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Tasks')
@Controller('v1/tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Task created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  create(@Body() createTaskDto: CreateTaskDto, @Request() req) {
    const { userId } = req.user;
    return this.tasksService.createTask(createTaskDto, userId);
  }

  @Get()
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'List of all tasks' })
  findAll(@Request() req) {
    const { userId } = req.user;

    return this.tasksService.listTasks(+userId);
  }

  @Patch(':id/status')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Task status updated successfully' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  updateStatus(
    @Param('id') id: string,
    @Request() req,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ) {
    const { userId } = req.user;
    return this.tasksService.updateTaskStatus(+id, updateTaskStatusDto, userId);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Task deleted successfully' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  remove(@Param('id') id: string, @Request() req) {
    const { userId } = req.user;
    return this.tasksService.deleteTask(+id, userId);
  }
}
