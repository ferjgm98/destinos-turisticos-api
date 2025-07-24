import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { TouristicDestinationsService } from './touristic-destinations.service';
import { PrismaService } from '../prisma.service';
import { TouristicDestinationLikesGateway } from '../touristic-destination-likes/touristic-destination-likes.gateway';
import { CreateTouristicDestinationDto } from './dtos/create-touristic-destinations.dto';
import { TouristicDestination } from '@prisma/client';

// Mock the pagination helper
jest.mock('../helpers/pagination.helper', () => ({
  createPaginationResponse: jest.fn(
    (data: TouristicDestination[], total: number) => ({
      data,
      meta: {
        page: 1,
        limit: 10,
        total,
        totalPages: 1,
        hasPreviousPage: false,
        hasNextPage: false,
      },
    }),
  ),
}));

describe('TouristicDestinationsService', () => {
  let service: TouristicDestinationsService;
  let prismaService: PrismaService;
  let gateway: TouristicDestinationLikesGateway;

  const mockDestination = {
    id: 1,
    name: 'Test Destination',
    address: 'Test Address',
    description: 'Test Description',
    imageUrl: 'https://example.com/image.jpg',
    _count: { likes: 5 },
  };

  beforeEach(async () => {
    const mockPrismaService = {
      touristicDestination: {
        findUnique: jest.fn(),
        findMany: jest.fn(),
        count: jest.fn(),
        create: jest.fn(),
        delete: jest.fn(),
      },
      touristicDestinationLikes: {
        create: jest.fn(),
        count: jest.fn(),
      },
      $transaction: jest.fn(),
    };

    const mockGateway = {
      broadcastLike: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TouristicDestinationsService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: TouristicDestinationLikesGateway, useValue: mockGateway },
      ],
    }).compile();

    service = module.get(TouristicDestinationsService);
    prismaService = module.get(PrismaService);
    gateway = module.get(TouristicDestinationLikesGateway);
  });

  it('should find one destination', async () => {
    (
      prismaService.touristicDestination.findUnique as jest.Mock
    ).mockResolvedValue(mockDestination);

    const result = await service.findOne(1);

    expect(result).toEqual(mockDestination);
  });

  it('should throw NotFoundException when destination not found', async () => {
    (
      prismaService.touristicDestination.findUnique as jest.Mock
    ).mockResolvedValue(null);

    await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
  });

  it('should find all destinations with pagination', async () => {
    const mockDestinations = [mockDestination];
    (prismaService.$transaction as jest.Mock).mockImplementation(() =>
      Promise.resolve([mockDestinations, 1]),
    );

    const result = await service.findAll({ page: 1, limit: 10 });

    expect(result.data).toEqual(mockDestinations);
    expect(result.meta.total).toBe(1);
  });

  it('should create a destination', async () => {
    const createDto: CreateTouristicDestinationDto = {
      name: 'New Destination',
      address: 'Test Address',
      description: 'New Description',
      imageUrl: 'https://example.com/image.jpg',
    };
    (prismaService.touristicDestination.create as jest.Mock).mockResolvedValue({
      id: 2,
      ...createDto,
    });

    const result = await service.create(createDto);

    expect(result.name).toBe('New Destination');
    expect(
      (
        prismaService.touristicDestination.create as jest.Mock
      ).mockResolvedValue({
        id: 2,
        ...createDto,
      }),
    ).toHaveBeenCalledWith({
      data: createDto,
    });
  });

  it('should delete a destination', async () => {
    (
      prismaService.touristicDestination.findUnique as jest.Mock
    ).mockResolvedValue(mockDestination);
    (prismaService.touristicDestination.delete as jest.Mock).mockResolvedValue(
      mockDestination,
    );

    const result = await service.delete(1);

    expect(result).toEqual(mockDestination);
  });

  it('should like a destination and broadcast', async () => {
    const likesCount = 6;
    (
      prismaService.touristicDestination.findUnique as jest.Mock
    ).mockResolvedValue(mockDestination);
    (
      prismaService.touristicDestinationLikes.create as jest.Mock
    ).mockResolvedValue({});
    (
      prismaService.touristicDestinationLikes.count as jest.Mock
    ).mockResolvedValue(likesCount);

    const result = await service.likeTouristicDestination(1);

    expect(result).toEqual({ likes: likesCount });
    expect(
      (gateway.broadcastLike as jest.Mock).mockResolvedValue(likesCount),
    ).toHaveBeenCalledWith(1, likesCount);
  });
});
