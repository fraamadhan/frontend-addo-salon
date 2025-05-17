export class PaginationParams {
  page!: string;
  limit?: string;
  keyword?: string;
  slug?: string;
}

export class ParamsSearchProductDto extends PaginationParams {
  sorttype?: string;
  sortby?: string;
  category?: string;
  lowestPrice?: string;
  highestPrice?: string;
  rating?: string;
  type?: string;
}

export class ParamsReviewDto {
  rating?: string;
  userId?: string;
  productId?: string;
}
