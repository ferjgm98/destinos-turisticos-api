import { Module } from '@nestjs/common';
import { TouristicDestinationsService } from './touristic-destinations.service';
import { TouristicDestinationsController } from './touristic-destinations.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [TouristicDestinationsService, PrismaService],
  controllers: [TouristicDestinationsController],
})
export class TouristicDestinationsModule {}
