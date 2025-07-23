import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TouristicDestinationsService } from './touristic-destinations.service';
import { TouristicDestination } from '@prisma/client';
import { CreateTouristicDestinationDto } from './dtos/create-touristic-destinations.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('touristic-destinations')
export class TouristicDestinationsController {
  constructor(
    private readonly touristicDestinationsService: TouristicDestinationsService,
  ) {}

  @ApiOperation({
    summary: 'Find all touristic destinations',
    description: 'Find all touristic destinations',
  })
  @Get()
  findAll(): Promise<TouristicDestination[]> {
    return this.touristicDestinationsService.findAll();
  }

  @ApiOperation({
    summary: 'Find a touristic destination by id',
    description: 'Find a touristic destination by id',
  })
  @Get(':id')
  findOne(@Param('id') id: number): Promise<TouristicDestination> {
    return this.touristicDestinationsService.findOne(id);
  }

  @ApiOperation({
    summary: 'Create a new touristic destination',
    description:
      'Creates a new touristic destination with the provided information',
  })
  @Post()
  create(
    @Body() createTouristicDestinationDto: CreateTouristicDestinationDto,
  ): Promise<TouristicDestination> {
    return this.touristicDestinationsService.create(
      createTouristicDestinationDto,
    );
  }
}
