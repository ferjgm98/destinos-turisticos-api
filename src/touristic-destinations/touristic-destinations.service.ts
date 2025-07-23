import { Injectable, NotFoundException } from '@nestjs/common';
import { TouristicDestination } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TouristicDestinationsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<TouristicDestination[]> {
    return this.prisma.touristicDestination.findMany();
  }

  async findOne(id: number): Promise<TouristicDestination> {
    const touristicDestination =
      await this.prisma.touristicDestination.findUnique({
        where: { id },
      });

    if (!touristicDestination) {
      throw new NotFoundException('Touristic destination not found');
    }

    return touristicDestination;
  }
}
