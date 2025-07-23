import { Test, TestingModule } from '@nestjs/testing';
import { TouristicDestinationsService } from './touristic-destinations.service';

describe('TouristicDestinationsService', () => {
  let service: TouristicDestinationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TouristicDestinationsService],
    }).compile();

    service = module.get<TouristicDestinationsService>(TouristicDestinationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
