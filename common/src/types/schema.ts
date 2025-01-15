import { z } from "zod";

export const userSchema = z.object({
    username: z.string({message: "Username is required"}).min(3, {message: "Username must be at least 3 characters long"}),
    email: z.string().email({message: "Invalid email address"}),
    password: z.string().min(6, {message: "Password must be at least 6 characters long"})
})

export const contentSchema = z.object({
    titel: z.string({message: "Title is required"}).min(3, {message: "Title must be at least 3 characters long"}),
    link: z.string({message: "Link is required"}).url({message: "Invalid URL"}),
    tags: z.array(z.string()).nonempty({message: "Tags are required"}),
    types: z.enum(["youtube", "twitter", "instagram", "other"])
})