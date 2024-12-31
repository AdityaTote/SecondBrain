import {z} from "zod";

export const loginSchema = z.object({
    username: z.string().min(3),
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
})