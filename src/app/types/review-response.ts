export type UnreviewedItemType = {
  _id: string;
  reservationDate: string;
  price: number;
  note: string;
  transactionId: string;
  isReviewed: boolean;
  serviceStatus: string;
  transaction: {
    _id: string;
    orderCode: string;
    status: string;
    total_price: number;
  };
  product: {
    _id: string;
    name: string;
    price: number;
    estimation: number;
    assetRef: string;
  };
};

export type AddReviewProps = {
  rating: number;
  review: string;
  productId: string;
  itemId: string;
};
