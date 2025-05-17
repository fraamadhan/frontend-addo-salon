export type User = {
  _id: string;
  name: string;
  email: string;
  phone_number: string;
  address: string;
  gender: string;
  birth_date: string;
  role: string;
  is_verified: boolean;
  email_verified_at: string;
  createdAt: string;
  updatedAt: string;
  asset: {
    path: string;
    publicUrl: string;
  };
  __v: number;
};

export type ReviewItemProps = {
  _id: string;
  review: string;
  rating: number;
  product: {
    _id: string;
    name: string;
    ratingAverage: number;
  };
  user: {
    _id: string;
    name: string;
    assetRef: string;
  };
};

export type ProductItemProps = {
  _id: string;
  assetRef: string;
  name: string;
  ratingAverage: number;
  estimation: number;
  price: number;
};

export type CategoryItem = {
  _id: string;
  name: string;
  slug: string;
  code: number;
  createdAt?: string;
  updatedAt?: string;
  parentId?: string;
  parentName?: string;
  parentSlug?: string;
  parentCode?: number;
};

export type CategoryGroup = {
  parent: CategoryItem;
  children: CategoryItem[];
};

export type Paginator = {
  totalItem: number;
  limit: number;
  pageCount: number;
  page: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number;
  nextPage: number;
};

export type ServiceDetailProps = {
  _id: string;
  estimation: number;
  name: string;
  description: string;
  price: number;
  type: string;
  ratingAverage: number;
  ratingCount: number;
  category: CategoryItem[];
  assetRef: string;
};
