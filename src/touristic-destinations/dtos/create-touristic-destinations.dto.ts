import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTouristicDestinationDto {
  @ApiProperty({
    description: 'Nombre del destino turistico',
    example: 'Joya de Ceren',
    required: true,
    format: 'string',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Direccion del destino turistico',
    example: 'San Juan Opico, La lIbertad',
    required: true,
    format: 'string',
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    description: 'Descripcion del destino turistico',
    example:
      'Joya de Ceren es un destino turistico en el departamento de Las Libertad',
    required: true,
    format: 'string',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Imagen del destino turistico',
    example:
      'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
    required: true,
    format: 'string',
  })
  @IsString()
  @IsNotEmpty()
  imageUrl: string;
}
