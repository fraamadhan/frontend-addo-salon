import { axiosInstance } from "@/lib/axios";
import { GET_USER_BY_ID_ENDPOINT } from "@/lib/endpoints";
import { useQuery } from "@tanstack/react-query";

export const useGetUser = (token: string | undefined, id: string) => {
  return useQuery({
    queryKey: ["getUserById"],
    queryFn: async () => {
      const response = await axiosInstance.get(`${GET_USER_BY_ID_ENDPOINT}${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response;
    },
    enabled: !!token,
  });
};
