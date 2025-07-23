import { Test, TestingModule } from '@nestjs/testing';
import { TouristicDestinationsController } from './touristic-destinations.controller';

describe('TouristicDestinationsController', () => {
  let controller: TouristicDestinationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TouristicDestinationsController],
    }).compile();

    controller = module.get<TouristicDestinationsController>(
      TouristicDestinationsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
