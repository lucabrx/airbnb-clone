import z, { TypeOf } from "zod";

export const UserRegisterSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password needs to be 6 character long"),
    name: z.string().min(2, "Minimal 2 character long").max(100, "Maximal 100 character long"),
})
export type UserRegisterType = TypeOf<typeof UserRegisterSchema>

export const UserLoginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password needs to be 6 character long"),
})
export type UserLoginType = TypeOf<typeof UserLoginSchema>

