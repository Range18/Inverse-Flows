import { IsNotEmpty, IsNumber } from 'class-validator';

export class SetDepartmentDto {
  @IsNumber()
  @IsNotEmpty()
  departmentId: number;
}
