export type CartResponse = {
  _id: string;
  reservationDate: string;
  price: number;
  userId: string;
  product: {
    _id: string;
    estimation: number;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
  assetRef: string;
};
