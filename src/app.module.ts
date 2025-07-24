import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TouristicDestinationsModule } from './touristic-destinations/touristic-destinations.module';
import { TouristicDestinationLikesModule } from './touristic-destination-likes/touristic-destination-likes.module';

@Module({
  imports: [TouristicDestinationsModule, TouristicDestinationLikesModule],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
