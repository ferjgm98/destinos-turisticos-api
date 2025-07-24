import { PaginationMetaDto } from '../dtos/pagination-meta.dto';
import { PaginationResponseDto } from '../dtos/pagination-response.dto';
import { PaginationDto } from '../dtos/pagination.dto';

export function createPaginationResponse<T>(
  data: T[],
  total: number,
  paginationDto: PaginationDto,
): PaginationResponseDto<T> {
  const { page = 1, limit = 10 } = paginationDto;
  const totalPages = Math.ceil(total / limit);

  const meta: PaginationMetaDto = {
    page,
    limit,
    total,
    totalPages,
    hasPreviousPage: page > 1,
    hasNextPage: page < totalPages,
  };

  return new PaginationResponseDto(data, meta);
}
