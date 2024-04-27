import { Prisma } from "@prisma/client";

export const jaroslavObject: Prisma.UserSelect = {
    id: true,
    email: true,
    name: true,
    password:false,
    phone: true,
}
