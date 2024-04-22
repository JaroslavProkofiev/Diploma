import { IsEmail, IsString } from "class-validator";

export class UserAuthDto{
    @IsEmail()
    email: string
    password?: string
    @IsString()
    name: string
    @IsString()
    avatarPath: string
    phone?: string
}