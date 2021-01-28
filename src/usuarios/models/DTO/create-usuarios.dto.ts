import { IsEmail, IsString } from "class-validator";

export class CreateUsuariosDTO{
    @IsString()
    nome: string;

    @IsString()
    usuario: string;

    @IsEmail()
    email: string;

    @IsString()
    senha: string;
}