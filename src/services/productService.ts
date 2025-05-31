import { ParamsSearchProductDto } from "@/app/types/query-params";
import { axiosInstance } from "@/lib/axios";
import { GET_CATEGORIES_ENDPOINT, GET_PRODUCTS_ENDPOINT, GET_SCHEDULES } from "@/lib/endpoints";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useGetCategories = () => {
  return useQuery({
    queryKey: ["getCategories"],
    queryFn: async () => {
      const response = await axiosInstance.get(`${GET_CATEGORIES_ENDPOINT}`);

      return response.data;
    },
    staleTime: Number(process.env.NEXT_PUBLIC_FIVE_MINUTES),
    gcTime: Number(process.env.NEXT_PUBLIC_HALF_HOUR),
    refetchOnMount: false,
  });
};

export const useGetProducts = (queryParams: ParamsSearchProductDto, shouldFetch = true) => {
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
    enabled: shouldFetch,
    staleTime: Number(process.env.NEXT_PUBLIC_TWO_MINUTES),
    gcTime: Number(process.env.NEXT_PUBLIC_TEN_MINUTES),
    placeholderData: keepPreviousData,
  });
};

export const useGetProduct = (id: string) => {
  return useQuery({
    queryKey: ["getProduct", id],
    queryFn: async () => {
      const response = await axiosInstance.get(`${GET_PRODUCTS_ENDPOINT}/${id}`);

      return response.data;
    },
    enabled: !!id,
    staleTime: Number(process.env.NEXT_PUBLIC_FIVE_MINUTES),
    gcTime: Number(process.env.NEXT_PUBLIC_TEN_MINUTES),
  });
};

export const useGetSchedule = (page: number, startDate: string | Date, endDate: string | Date) => {
  return useQuery({
    queryKey: ["getSchedule", page, startDate, endDate],
    queryFn: async () => {
      const response = await axiosInstance.get(`${GET_SCHEDULES}?page=${page}&startDate=${startDate}&endDate=${endDate}`);

      return response.data;
    },
    staleTime: Number(process.env.NEXT_PUBLIC_ONE_MINUTE),
    gcTime: Number(process.env.NEXT_PUBLIC_FIVE_MINUTES),
    placeholderData: keepPreviousData,
  });
};
