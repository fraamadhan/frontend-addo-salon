import { ParamsSearchProductDto } from "@/app/types/query-params";
import { axiosInstance } from "@/lib/axios";
import { GET_CATEGORIES_ENDPOINT, GET_PRODUCTS_ENDPOINT } from "@/lib/endpoints";
import { useQuery } from "@tanstack/react-query";

export const useGetCategories = () => {
  return useQuery({
    queryKey: ["getCategories"],
    queryFn: async () => {
      const response = await axiosInstance.get(`${GET_CATEGORIES_ENDPOINT}`);

      return response.data;
    },
  });
};

export const useGetProducts = (queryParams: ParamsSearchProductDto) => {
  return useQuery({
    queryKey: ["getProducts", queryParams],
    queryFn: async () => {
      const response = await axiosInstance.get(`${GET_PRODUCTS_ENDPOINT}`, {
        params: {
          ...queryParams,
        },
      });

      return response.data;
    },
  });
};
