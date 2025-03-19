export class CreateTaskDto {
  title: string;
  description: string;
  user_id: number;
}

export class UpdateTaskStatusDto {
  status: string;
}
