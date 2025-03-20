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
  Put,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskStatusDto } from './tasks.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Task')
@Controller('v1/task')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('create')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({ status: 201, description: 'Task created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  create(@Body() createTaskDto: CreateTaskDto, @Request() req) {
    const { userId } = req.user;
    return this.tasksService.createTask(createTaskDto, userId);
  }

  @Get('/list')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List all user tasks' })
  @ApiResponse({ status: 200, description: 'List of all tasks' })
  findAll(@Request() req) {
    const { userId } = req.user;

    return this.tasksService.listTasks(+userId);
  }

  @Patch(':id/status')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update task status' })
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

  @Put(':id/edit')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Edit task' })
  @ApiResponse({ status: 200, description: 'Task status updated successfully' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  editStatus(
    @Param('id') id: string,
    @Request() req,
    @Body() dto: CreateTaskDto,
  ) {
    const { userId } = req.user;
    return this.tasksService.editTask(+id, dto, userId);
  }

  @Delete(':id/delete')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Task deleted successfully' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  remove(@Param('id') id: string, @Request() req) {
    const { userId } = req.user;
    return this.tasksService.deleteTask(+id, userId);
  }
}
