import { createPaginationResponse } from './pagination.helper';

describe('createPaginationResponse', () => {
  it('builds correct meta for first page', () => {
    const dto = { page: 1, limit: 10 };
    const result = createPaginationResponse(['a', 'b'], 25, dto);

    expect(result.meta).toEqual({
      page: 1,
      limit: 10,
      total: 25,
      totalPages: 3,
      hasPreviousPage: false,
      hasNextPage: true,
    });
    expect(result.data).toEqual(['a', 'b']);
  });

  it('builds correct meta for middle page', () => {
    const dto = { page: 2, limit: 10 };
    const result = createPaginationResponse(['c', 'd'], 25, dto);

    expect(result.meta).toEqual({
      page: 2,
      limit: 10,
      total: 25,
      totalPages: 3,
      hasPreviousPage: true,
      hasNextPage: true,
    });
    expect(result.data).toEqual(['c', 'd']);
  });

  it('builds correct meta for last page', () => {
    const dto = { page: 3, limit: 10 };
    const result = createPaginationResponse(['e'], 25, dto);

    expect(result.meta).toEqual({
      page: 3,
      limit: 10,
      total: 25,
      totalPages: 3,
      hasPreviousPage: true,
      hasNextPage: false,
    });
    expect(result.data).toEqual(['e']);
  });

  it('handles empty data', () => {
    const dto = { page: 1, limit: 10 };
    const result = createPaginationResponse([], 0, dto);

    expect(result.meta).toEqual({
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0,
      hasPreviousPage: false,
      hasNextPage: false,
    });
    expect(result.data).toEqual([]);
  });
});
