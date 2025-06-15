export type PaymentTransactionPayload = {
  transactionId: string;
  paymentMethod: string;
  transactionFee: number;
  items: {
    productId: string;
    price: number;
    reservationDate: string;
    estimation: number;
  }[];
};

export type PaymentConfirmType = {
  _id: string;
  userId: string;
  total_price: number;
  status: string;
  orderCode: string | null;
  paymentMethod: string | null;
  bank: string | null;
  transactionType: "online" | "offline";
  customerName: string | null;
  serviceName: string | null;
  transaction_id_midtrans: string | null;
  transaction_status_midtrans: string | null;
  fraud_status_midtrans: string | null;
  payment_type_midtrans: string | null;
  transaction_time_midtrans: string | null;
  expiry_time_midtrans: string | null;
  va_number: string | null;
  url: string[] | null;
  acquirer: string | null;
  settlement_time_midtrans: string | null;
  createdAt: string; // ISO date string
  updatedAt: string;
  __v: number;
};

export type Product = {
  _id: string;
  estimation: number;
  name: string;
  description: string;
  categoryIds: string[];
  price: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  type: string;
  ratingAverage: number;
  ratingCount: number;
  assetRef: string;
};

export type Employee = {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  availability: number;
};

export type TransactionItem = {
  _id: string;
  reservationDate: string;
  price: number;
  employeeId: Employee;
  note: string;
  transactionId: string;
  serviceStatus: string;
  isReviewed: boolean;
  __v: number;
  createdAt: string;
  updatedAt: string;
  product: Product;
};

export type TransactionListItem = {
  _id: string;
  userId: string;
  total_price: number;
  status: string;
  orderCode: string | null;
  paymentMethod: string | null;
  bank: string | null;
  transactionType: string;
  customerName: string | null;
  serviceName: string | null;
  transaction_id_midtrans: string | null;
  transaction_status_midtrans: string | null;
  fraud_status_midtrans: string | null;
  payment_type_midtrans: string | null;
  transaction_time_midtrans: string | null;
  expiry_time_midtrans: string | null;
  va_number: string | null;
  url: string | null;
  acquirer: string | null;
  settlement_time_midtrans: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
  items: TransactionItem[];
};
