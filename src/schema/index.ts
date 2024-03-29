import { z } from "zod";

const signUpSchema = z
    .object({
        username: z
            .string()
            .min(3, { message: "Username should be atleast 3 characters" })
            .max(25, { message: "Username should not be more than 25 characters" }),
        email: z.string().email({ message: "Invalid email address" }),
        password: z
            .string()
            .min(8, { message: "Password should atleast be 8 letters" }),
    })

const signInSchema = z
    .object({
        email: z.string().email({ message: "Invalid email address" }),
        password: z
            .string()
            .min(6, { message: "Password should atleast be 6 letters" }),
    })

const addTodoSchema = z
    .object({
        name: z.string().min(1, { message: "Invalid email address" }),
        description: z.string().min(0, { message: "Invalid email address" }),
        starts: z.date().min(new Date(), { message: "Task can't start beyond today" }),
        ends: z.date(),
        people: z.array(z.string()).nullable(),
        category: z.string(),
    })

const forgotPasswordEmailSchema = z
    .object({
        email: z.string().email({ message: "Invalid email address" }),
    })

const restPasswordSchema = z
    .object({
        password: z
            .string()
            .min(8, { message: "Password should atleast be 8 letters" }),
    })


const updateTaskSchema = z.object({
    name: z.string().min(1, { message: "name is required" }),
    category: z.string().min(1, { message: "name is required" }),
    description: z.string().nullable()
})

export { signInSchema, signUpSchema, addTodoSchema as addTodoSchema, forgotPasswordEmailSchema, restPasswordSchema, updateTaskSchema }