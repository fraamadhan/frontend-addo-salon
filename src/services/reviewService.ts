import { axiosInstance } from "@/lib/axios";
import { GET_REVIEWS_ENDPOINT } from "@/lib/endpoints";
import { useQuery } from "@tanstack/react-query";

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
