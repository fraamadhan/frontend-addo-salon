import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string({
      required_error: "Email tidak boleh kosong",
      invalid_type_error: "Email harus berupa karakter",
    })
    .email({
      message: "Input harus berupa email",
    }),
  password: z
    .string({
      required_error: "Kata sandi tidak boleh kosong",
      invalid_type_error: "Panjang kata sandi minimal 8 karakter",
    })
    .min(8, {
      message: "Panjang kata sandi minimal 8 karakter",
    })
    .refine((password) => /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(password), { message: "Kata sandi terlalu lemah" }),
});

export const ForgotPasswordSchema = z.object({
  email: z
    .string({
      required_error: "Email tidak boleh kosong",
      invalid_type_error: "Email harus berupa karakter",
    })
    .email({
      message: "Input harus berupa email",
    }),
});

export const RegisterSchema = z.object({
  name: z.string().min(1, {
    message: "Panjang nama minimal 1 karakter",
  }),
  email: z
    .string({
      required_error: "Email tidak boleh kosong",
      invalid_type_error: "Email harus berupa karakter",
    })
    .email({
      message: "Input harus berupa email",
    }),
  password: z
    .string({
      required_error: "Kata sandi tidak boleh kosong",
      invalid_type_error: "Panjang kata sandi minimal 8 karakter",
    })
    .min(8, {
      message: "Panjang kata sandi minimal 8 karakter",
    })
    .refine((password) => /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(password), { message: "Kata sandi terlalu lemah" }),
});

export const ResetPasswordSchema = z
  .object({
    password: z
      .string({
        required_error: "Kata sandi tidak boleh kosong",
        invalid_type_error: "Panjang kata sandi minimal 8 karakter",
      })
      .min(8, {
        message: "Panjang kata sandi minimal 8 karakter",
      })
      .refine((password) => /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(password), { message: "Kata sandi terlalu lemah" }),
    confirmPassword: z
      .string({
        required_error: "Kata sandi tidak boleh kosong",
        invalid_type_error: "Panjang kata sandi minimal 8 karakter",
      })
      .min(8, {
        message: "Panjang kata sandi minimal 8 karakter",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Kata sandi tidak cocok",
    path: ["confirmPassword"],
  });

export const ProfileResetPasswordSchema = z
  .object({
    oldPassword: z
      .string({
        required_error: "Kata sandi lama tidak boleh kosong",
        invalid_type_error: "Panjang kata sandi lama minimal 8 karakter",
      })
      .min(8, {
        message: "Panjang kata sandi lama minimal 8 karakter",
      })
      .refine((password) => /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(password), { message: "Kata sandi terlalu lemah" }),
    password: z
      .string({
        required_error: "Kata sandi tidak boleh kosong",
        invalid_type_error: "Panjang kata sandi minimal 8 karakter",
      })
      .min(8, {
        message: "Panjang kata sandi minimal 8 karakter",
      })
      .refine((password) => /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(password), { message: "Kata sandi terlalu lemah" }),
    confirmPassword: z
      .string({
        required_error: "Kata sandi tidak boleh kosong",
        invalid_type_error: "Panjang kata sandi minimal 8 karakter",
      })
      .min(8, {
        message: "Panjang kata sandi minimal 8 karakter",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Kata sandi tidak cocok",
    path: ["confirmPassword"],
  });
