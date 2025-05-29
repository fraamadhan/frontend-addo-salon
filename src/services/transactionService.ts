import { StateStatus } from "@/app/types/general";
import { PaymentTransactionPayload } from "@/app/types/transaction-type";
import { axiosInstance } from "@/lib/axios";
import { TRANSACTION_ENDPOINT } from "@/lib/endpoints";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useCollectBill = ({ onSuccess, onError }: StateStatus) => {
  return useMutation({
    mutationFn: async ({ token, items }: { token: string; items: { note: string; productId: string; reservationDate: string; price: number }[] }) => {
      try {
        const response = await axiosInstance.post(
          `${TRANSACTION_ENDPOINT}/collect-bill`,
          { items },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          throw new Error(error.response?.data?.message || "Failed to collect bill");
        }
      }
    },
    onSuccess,
    onError,
  });
};

export const useCalculateBill = ({ onSuccess, onError }: StateStatus) => {
  return useMutation({
    mutationFn: async ({ token, body }: { token: string; body: { transactionId: string; paymentMethod: string } }) => {
      try {
        const response = await axiosInstance.post(`${TRANSACTION_ENDPOINT}/calculate-bill`, body, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        return response.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          throw new Error(error.response?.data?.message || "Failed to calculate bill");
        }
      }
    },
    onSuccess,
    onError,
  });
};

export const usePaymentTransaction = ({ onSuccess, onError }: StateStatus) => {
  return useMutation({
    mutationFn: async ({ token, body }: { token: string; body: PaymentTransactionPayload }) => {
      try {
        const response = await axiosInstance.post(`${TRANSACTION_ENDPOINT}/pay`, body, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          throw new Error(error.response?.data?.message || "Failed to process payment transaction");
        }
      }
    },
    onSuccess,
    onError,
  });
};

export const useGetPaymentConfirm = ({ token, transactionId }: { token: string; transactionId: string }) => {
  return useQuery({
    queryKey: ["getPaymentConfirm"],
    queryFn: async () => {
      const response = await axiosInstance.get(`${TRANSACTION_ENDPOINT}/payment/confirm/${transactionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    },
    enabled: !!token && !!transactionId,
  });
};

export const useGetStatusOrder = ({ token, transactionId }: { token: string; transactionId: string }) => {
  return useQuery({
    queryKey: ["getOrderStatus", transactionId],
    queryFn: async () => {
      const response = await axiosInstance.get(`${TRANSACTION_ENDPOINT}/status/${transactionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.data;
    },
    enabled: !!token && !!transactionId,
  });
};
