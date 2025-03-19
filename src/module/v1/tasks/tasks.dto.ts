import { IsString, IsNotEmpty, IsInt, IsIn } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsInt()
  user_id: number;
}

export class UpdateTaskStatusDto {
  @IsString()
  @IsIn(['pending', 'in-progress', 'completed'])
  status: string;
}
