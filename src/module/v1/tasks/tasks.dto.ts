import { IsString, IsNotEmpty, IsInt, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    title: 'The title of the task',
    example: 'Complete project',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'The description of the task',
    example: 'Finish the project by Friday',
  })
  @IsString()
  description: string;
}

export class UpdateTaskStatusDto {
  @ApiProperty({
    description: 'The status of the task',
    example: 'in-progress',
    enum: ['pending', 'in-progress', 'completed'],
  })
  @IsString()
  @IsIn(['pending', 'in-progress', 'completed'])
  status: string;
}
