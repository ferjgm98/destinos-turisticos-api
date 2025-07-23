import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TouristicDestinationsModule } from './touristic-destinations/touristic-destinations.module';

@Module({
  imports: [TouristicDestinationsModule],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
