import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { TouristicDestination } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateTouristicDestinationDto } from './dtos/create-touristic-destinations.dto';
import { PaginationDto } from 'src/dtos/pagination.dto';
import { createPaginationResponse } from 'src/helpers/pagination.helper';
import { PaginationResponseDto } from 'src/dtos/pagination-response.dto';
import { TouristicDestinationLikesGateway } from 'src/touristic-destination-likes/touristic-destination-likes.gateway';

@Injectable()
export class TouristicDestinationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly touristicDestinationLikesGateway: TouristicDestinationLikesGateway,
  ) {}

  async findAll(
    query: PaginationDto,
  ): Promise<PaginationResponseDto<TouristicDestination>> {
    try {
      const { page, limit } = query;
      const offset = (page - 1) * limit;

      const [data, total] = await this.prisma.$transaction([
        this.prisma.touristicDestination.findMany({
          skip: offset,
          take: limit,
          include: {
            _count: {
              select: { likes: true },
            },
          },
        }),
        this.prisma.touristicDestination.count(),
      ]);

      return createPaginationResponse(data, total, query);
    } catch {
      throw new InternalServerErrorException(
        'Error getting touristic destinations',
      );
    }
  }

  async findOne(id: number): Promise<TouristicDestination> {
    const touristicDestination =
      await this.prisma.touristicDestination.findUnique({
        where: { id },
        include: {
          _count: {
            select: { likes: true },
          },
        },
      });

    if (!touristicDestination) {
      throw new NotFoundException('Touristic destination not found');
    }

    return touristicDestination;
  }

  async create(
    createTouristicDestinationDto: CreateTouristicDestinationDto,
  ): Promise<TouristicDestination> {
    try {
      return this.prisma.touristicDestination.create({
        data: createTouristicDestinationDto,
      });
    } catch {
      throw new InternalServerErrorException(
        'Error creating touristic destination',
      );
    }
  }

  async delete(id: number): Promise<TouristicDestination> {
    try {
      const item = await this.findOne(id);
      await this.prisma.touristicDestination.delete({
        where: { id: item.id },
      });

      return item;
    } catch {
      throw new InternalServerErrorException(
        'Error deleting touristic destination',
      );
    }
  }

  async likeTouristicDestination(id: number): Promise<{ likes: number }> {
    try {
      const item = await this.findOne(id);

      await this.prisma.touristicDestinationLikes.create({
        data: {
          destination: {
            connect: {
              id: item.id,
            },
          },
          createdAt: new Date(),
        },
      });

      const likes = await this.prisma.touristicDestinationLikes.count({
        where: {
          destination: {
            id: item.id,
          },
        },
      });

      // Broadcast the like to all connected clients in the socket server
      this.touristicDestinationLikesGateway.broadcastLike(item.id, likes);

      return { likes };
    } catch {
      throw new InternalServerErrorException(
        'Error liking touristic destination',
      );
    }
  }
}
