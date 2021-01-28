import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsuariosController } from "../controllers/usuarios.controller";
import { Usuarios } from "../models/usuarios.entity";
import { UsuarioService } from "../services/usuario.service";

@Module({
    imports: [TypeOrmModule.forFeature([Usuarios])],
    controllers: [UsuariosController],
    providers: [UsuarioService],
})
export class UsuariosModule{}