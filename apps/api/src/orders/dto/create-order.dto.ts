import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ example: 'alice@example.com' })
  @IsEmail()
  customerEmail: string;

  @ApiProperty({ example: 'Mechanical Keyboard' })
  @IsString()
  @IsNotEmpty()
  productName: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  quantity: number;
}
