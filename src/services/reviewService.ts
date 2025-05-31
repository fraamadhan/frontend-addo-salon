import { StateStatus } from "@/app/types/general";
import { PaginationParams } from "@/app/types/query-params";
import { AddReviewProps } from "@/app/types/review-response";
import { axiosInstance } from "@/lib/axios";
import { GET_REVIEWS_ENDPOINT, TRANSACTION_ENDPOINT } from "@/lib/endpoints";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetRandomReview = () => {
  return useQuery({
    queryKey: ["getRandomReview"],
    queryFn: async () => {
      const response = await axiosInstance.get(`${GET_REVIEWS_ENDPOINT}?rating=${Number(process.env.NEXT_PUBLIC_PARAM_RATING_REVIEW)}`);
      return response;
    },
  });
};

export const useGetReviews = (productId: string, page: number) => {
  return useQuery({
    queryKey: ["getReviews", productId, page],
    queryFn: async () => {
      const response = await axiosInstance.get(`${GET_REVIEWS_ENDPOINT}?productId=${productId}&page=${page}`);

      return response.data;
    },
  });
};

export const useGetUnreviewedItem = (token: string, queryParams: PaginationParams) => {
  return useQuery({
    queryKey: ["getUnreviewedItems", queryParams],
    queryFn: async () => {
      const response = await axiosInstance.get(`${TRANSACTION_ENDPOINT}/unreviewed-item`, {
        params: {
          ...queryParams,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    },
    enabled: !!token,
    staleTime: Number(process.env.NEXT_PUBLIC_FIVE_MINUTES),
    gcTime: Number(process.env.NEXT_PUBLIC_FIVE_MINUTES),
  });
};

export const useAddReview = ({ onSuccess, onError }: StateStatus) => {
  return useMutation({
    mutationFn: async ({ token, body }: { token: string; body: AddReviewProps }) => {
      const response = await axiosInstance.post(`${GET_REVIEWS_ENDPOINT}`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    },
    onSuccess,
    onError,
  });
};
