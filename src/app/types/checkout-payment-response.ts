export type CollectBillResponse = {
  transactionId: string;
  totalPrice: number;
  items: CollectBillItem[];
};

export type CollectBillItem = {
  reservationDate: string;
  price: number;
  productId: string;
  transactionId: string;
  estimation: number;
  _id: string;
};

export type CalculateBillResponse = {
  transaction: {
    _id: string;
    total_price: number;
  };
  items: CalculateBillItemResponse[];
  transactionFee: number;
  grandTotalPrice: number;
};

export type CalculateBillItemResponse = {
  _id: string;
  reservationDate: string;
  productId: string;
  price: number;
  transactionId: string;
  estimation: number;
};
