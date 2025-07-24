import { Module } from '@nestjs/common';
import { TouristicDestinationLikesGateway } from './touristic-destination-likes.gateway';

@Module({
  providers: [TouristicDestinationLikesGateway],
  exports: [TouristicDestinationLikesGateway],
})
export class TouristicDestinationLikesModule {}
