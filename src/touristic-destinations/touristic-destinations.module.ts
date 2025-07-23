import { Module } from '@nestjs/common';
import { TouristicDestinationsService } from './touristic-destinations.service';
import { TouristicDestinationsController } from './touristic-destinations.controller';

@Module({
  providers: [TouristicDestinationsService],
  controllers: [TouristicDestinationsController],
})
export class TouristicDestinationsModule {}
