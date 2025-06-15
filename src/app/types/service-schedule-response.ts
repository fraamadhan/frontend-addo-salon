import { Paginator } from "./general";

export type ServiceScheduleResponse = {
  schedules: ServiceScheduleItem[];
  paginator: Paginator;
};

export type ServiceScheduleItem = {
  _id: string;
  reservationDate: string;
  price: number;
  note: string;
  transactionId: string;
  serviceStatus: string;
  transaction: {
    _id: string;
    orderCode: string;
    status: string;
  };
  user: {
    _id: string;
    name: string;
  };
  product: {
    _id: string;
    name: string;
    price: number;
    estimation: number;
  };
  estimation: number;
  estimatedFinishDate: string;
};
