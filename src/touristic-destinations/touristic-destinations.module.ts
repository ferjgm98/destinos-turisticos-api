import { Module } from '@nestjs/common';
import { TouristicDestinationsService } from './touristic-destinations.service';
import { TouristicDestinationsController } from './touristic-destinations.controller';
import { PrismaService } from 'src/prisma.service';
import { TouristicDestinationLikesGateway } from 'src/touristic-destination-likes/touristic-destination-likes.gateway';

@Module({
  providers: [
    TouristicDestinationsService,
    PrismaService,
    TouristicDestinationLikesGateway,
  ],
  controllers: [TouristicDestinationsController],
})
export class TouristicDestinationsModule {}
