import { z } from "zod"

export const StudentloginSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email"),
    card_uuid: z.string()
})

export type StudentLoginSchemaType = z.infer<typeof StudentloginSchema>   