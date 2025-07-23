import { Body, Controller, Get, Post } from '@nestjs/common';
import { PlaceService } from './place.service';

@Controller('/places')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @Get()
  findAll(): any {
    return this.placeService.findAll();
  }

  @Post()
  create(@Body() place): any {
    return this.placeService.create(place);
  }
}
