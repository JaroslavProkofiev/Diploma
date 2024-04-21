import { IsEmail, IsString, MinLength } from "class-validator";

export class UserAuthDto{
@IsEmail()
email: string

@MinLength(8,{
    message: 'Ваш пароль повинен складатися не менше ніж з 8 символів'
})
@IsString()
password:string
}