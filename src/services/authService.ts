import { axiosInstance } from "@/lib/axios";
import { EMAIL_VERIFICATION_ENDPOINT, FORGOT_PASSWORD_ENDPOINT, LOGIN_ENDPOINT, REGISTER_ENDPOINT, RESET_PASSWORD_ENDPOINT, VERIFY_TOKEN_RESET_PASSWORD_ENDPOINT } from "@/lib/endpoints";
import { getUserIdFromToken } from "@/lib/token";
import { useMutation, useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

interface StateStatus {
  onSuccess: (data: any) => void;
  onError: (error: any) => void;
}

export const useCreateUser = ({ onSuccess, onError }: StateStatus) => {
  return useMutation({
    mutationFn: async (body: { name: string; email: string; password: string }) => {
      const response = await axiosInstance.post(REGISTER_ENDPOINT ?? "", body);

      return response;
    },
    onSuccess: onSuccess,
    onError: onError,
  });
};

export const useLogin = ({ onSuccess, onError }: StateStatus) => {
  return useMutation({
    mutationFn: async (body: { email: string; password: string }) => {
      const response = await axiosInstance.post(LOGIN_ENDPOINT ?? "", body);
      console.log(response.data);
      const access_token = response.data.data?.access_token;
      const expirationTime = Number(process.env.NEXT_PUBLIC_TOKEN_EXPIRES_IN);

      if (access_token) {
        Cookies.set("access_token", access_token, {
          expires: expirationTime,
          secure: true,
          sameSite: "strict",
        });
      }

      return response;
    },
    onSuccess,
    onError,
  });
};

export const useResetPassword = (token: string, { onSuccess, onError }: StateStatus) => {
  console.log(token);
  console.log(`${RESET_PASSWORD_ENDPOINT}${token}`);
  return useMutation({
    mutationFn: async (body: { password: string; confirmPassword: string }) => {
      const response = await axiosInstance.patch(`${RESET_PASSWORD_ENDPOINT}${token}`, body);

      console.log(`${RESET_PASSWORD_ENDPOINT}${token}`);
      return response;
    },
    onSuccess,
    onError,
  });
};

export const useVerifyEmailForgotPassword = ({ onSuccess, onError }: StateStatus) => {
  return useMutation({
    mutationFn: async (body: { email: string }) => {
      const response = await axiosInstance.post(`${FORGOT_PASSWORD_ENDPOINT}`, body);

      return response;
    },
    onSuccess,
    onError,
  });
};

export const useVerifyEmail = (token: string | undefined, type: string) => {
  return useQuery({
    queryKey: ["verifyEmail"],
    queryFn: async () => {
      if (type === "register") {
        const response = await axiosInstance.get(`${EMAIL_VERIFICATION_ENDPOINT}${token}`);

        return response;
      } else {
        const response = await axiosInstance.get(FORGOT_PASSWORD_ENDPOINT ?? "");

        return response;
      }
    },
    enabled: !!token,
  });
};

export const useVerifyToken = (token: string) => {
  return useQuery({
    queryKey: ["verifyTokenResetPassword"],
    queryFn: async () => {
      const response = await axiosInstance.get(`${VERIFY_TOKEN_RESET_PASSWORD_ENDPOINT}?token=${token}`);

      return response;
    },
    enabled: !!token,
  });
};
