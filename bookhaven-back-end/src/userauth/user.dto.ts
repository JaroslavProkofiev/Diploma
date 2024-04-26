import { IsEmail, IsOptional, IsString } from "class-validator";

export class UserAuthDto{
    @IsEmail()
    email: string

    @IsOptional()
    @IsString()
    password: string
    
    @IsOptional()
    @IsString()
    name: string

    @IsOptional()
    @IsString()
    phone?: string
}