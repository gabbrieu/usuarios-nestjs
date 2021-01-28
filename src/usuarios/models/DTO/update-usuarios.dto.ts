import { IsString } from "class-validator";

export class UpdateUsuariosDTO{
    @IsString()
    usuario: string;

    @IsString()
    senha: string;
}