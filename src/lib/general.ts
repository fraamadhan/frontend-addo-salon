import { CartResponse } from "@/app/types/cart-response";

export const totalPriceCount = (items: CartResponse[], transactionFee: number = 0) => {
  const totalPrice = items.reduce((accum, item) => accum + item.price, 0) + transactionFee;

  return totalPrice;
};

export const totalEstimation = (items: CartResponse[]) => {
  const estimationTotal = items.reduce((accum, item) => accum + item.product.estimation, 0);

  return estimationTotal;
};
