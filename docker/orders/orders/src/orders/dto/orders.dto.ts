import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateOrderRequest {
  @ApiProperty({
    description: 'O id de um usuário',
    example: 1,
  })
  @IsNumber()
  user_id: number;

  @ApiProperty({
    description: 'Informações sobre o produto',
    example: 'bola de gude',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Quantidade do produto',
    example: 2,
  })
  @IsNumber()
  quantity: number;

  @ApiProperty({
    description: 'O preço unitário do produto',
    example: 1,
  })
  @IsNumber()
  price: number;
}

export class UpdateOrderRequest {
  @ApiProperty({
    description: 'Informações sobre o produto',
    example: 'bola de tênis',
    required: false,
  })
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Quantidade do produto',
    example: 1,
    required: false,
  })
  @IsNumber()
  quantity?: number;

  @ApiProperty({
    description: 'O preço unitário do produto',
    example: 10,
    required: false,
  })
  @IsNumber()
  price?: number;
}
