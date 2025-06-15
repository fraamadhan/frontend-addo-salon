import { StateStatus } from "@/app/types/general";
import { axiosInstance } from "@/lib/axios";
import { USER_ENDPOINT } from "@/lib/endpoints";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useGetUser = (token: string | undefined, id: string) => {
  return useQuery({
    queryKey: ["getUserById", id],
    queryFn: async () => {
      const response = await axiosInstance.get(`${USER_ENDPOINT}${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response;
    },
    enabled: !!token,
  });
};

export const useUpdateUser = ({ onSuccess, onError }: StateStatus) => {
  return useMutation({
    mutationFn: async ({ userId, token, body }: { userId: string; token: string; body: FormData | Record<string, string | null> }) => {
      try {
        const response = await axiosInstance.patch(`${USER_ENDPOINT}${userId}`, body, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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
