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
