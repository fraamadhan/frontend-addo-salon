import { StateStatus } from "@/app/types/general";
import { axiosInstance } from "@/lib/axios";
import { GET_CARTS_ENDPOINT } from "@/lib/endpoints";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useGetCarts = (token: string) => {
  return useQuery({
    queryKey: ["getCarts"],
    queryFn: async () => {
      const response = await axiosInstance.get(`${GET_CARTS_ENDPOINT}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    },
    enabled: !!token,
  });
};

export const useDeleteCart = ({ onSuccess, onError }: StateStatus) => {
  return useMutation({
    mutationFn: async ({ token, cartId }: { token: string; cartId: string }) => {
      try {
        const response = await axiosInstance.delete(`${GET_CARTS_ENDPOINT}/${cartId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Delete cart response:", response.data);
        return response.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          throw new Error(error.response?.data?.message || "Failed to delete cart");
        }
      }
    },
    onSuccess,
    onError,
  });
};

export const useAddToCart = ({ onSuccess, onError }: StateStatus) => {
  return useMutation({
    mutationFn: async ({ token, productId, reservationDate, estimation }: { token: string; productId: string; reservationDate: string; estimation: number }) => {
      try {
        const response = await axiosInstance.post(
          `${GET_CARTS_ENDPOINT}`,
          { productId, reservationDate, estimation },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Add to cart response:", response.data.data);
        return response.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          throw new Error(error.response?.data?.message || "Failed to add to cart");
        }
      }
    },
    onSuccess,
    onError,
  });
};
