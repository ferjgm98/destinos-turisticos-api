import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TouristicDestinationsService } from './touristic-destinations.service';
import { TouristicDestination } from '@prisma/client';
import { CreateTouristicDestinationDto } from './dtos/create-touristic-destinations.dto';
import { ApiOperation } from '@nestjs/swagger';
import { PaginationDto } from 'src/dtos/pagination.dto';
import { PaginationResponseDto } from 'src/dtos/pagination-response.dto';
import { UpdateTouristicDestinationDto } from './dtos/update-touristic-destination.dto';

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
  findAll(
    @Query() query: PaginationDto,
  ): Promise<PaginationResponseDto<TouristicDestination>> {
    return this.touristicDestinationsService.findAll(query);
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

  @ApiOperation({
    summary: 'Update a touristic destination by id',
    description: 'Update a touristic destination by id',
  })
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateTouristicDestinationDto: UpdateTouristicDestinationDto,
  ): Promise<TouristicDestination> {
    return this.touristicDestinationsService.update(
      id,
      updateTouristicDestinationDto,
    );
  }

  @ApiOperation({
    summary: 'Delete a touristic destination by id',
    description: 'Delete a touristic destination by id',
  })
  @Delete(':id')
  delete(@Param('id') id: number): Promise<TouristicDestination> {
    return this.touristicDestinationsService.delete(id);
  }

  @ApiOperation({
    summary: 'Like a touristic destination by id',
  })
  @Post(':id/like')
  likeTouristicDestination(
    @Param('id') id: number,
  ): Promise<{ likes: number }> {
    return this.touristicDestinationsService.likeTouristicDestination(id);
  }
}
