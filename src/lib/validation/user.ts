import { z } from "zod";

const MAX_FILE_SIZE = 5_000_000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const UpdateProfileSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, "Gambar melebihi 5MB")
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), "Hanya mendukung gambar dengan format .jpg, .jpeg, dan .png")
    .optional(),
  username: z.string().min(1, { message: "Panjang username minimal 1 karakter" }),
  email: z.string().min(1, {
    message: "Panjang email minimal 1 karakter",
  }),
  phone_number: z.string().regex(/^(\+62|0)8[1-9][0-9]{6,10}$/, {
    message: "Nomor telepon bukan format nomor telepon Indonesia",
  }),
  gender: z.string(),
  birth_date: z.string(),
  address: z.string(),
});
