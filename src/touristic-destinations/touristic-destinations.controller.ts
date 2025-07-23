import { Controller, Get, Param } from '@nestjs/common';
import { TouristicDestinationsService } from './touristic-destinations.service';
import { TouristicDestination } from '@prisma/client';

@Controller('touristic-destinations')
export class TouristicDestinationsController {
  constructor(
    private readonly touristicDestinationsService: TouristicDestinationsService,
  ) {}

  @Get()
  findAll(): Promise<TouristicDestination[]> {
    return this.touristicDestinationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<TouristicDestination> {
    return this.touristicDestinationsService.findOne(id);
  }
}
