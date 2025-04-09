import { z } from "zod";

export const worksapceSchema = z.object({
    name: z.string().min(1, {message: "workspace name cannot be empty"})
})