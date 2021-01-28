import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CreateUsuariosDTO } from "../models/DTO/create-usuarios.dto";
import { UpdateUsuariosDTO } from "../models/DTO/update-usuarios.dto";
import { Usuarios } from "../models/usuarios.entity";
import { UsuarioService } from "../services/usuario.service";

@Controller('usuarios')
export class UsuariosController{
    constructor(private readonly usuarioService: UsuarioService){}

    @Get()
    async getAll(): Promise<Usuarios[]>{
        return this.usuarioService.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: string): Promise<Usuarios>{
        return this.usuarioService.getById(id);
    }

    @Post()
    async createUser(@Body() user: CreateUsuariosDTO): Promise<Usuarios>{
        return this.usuarioService.createUser(user);
    }

    /**@Put(':id')
    async updateUser(@Body() user: UpdateUsuariosDTO, @Param('id') id: string): Promise<Usuarios>{
        return this.usuarioService.updateUser(user, id);
    }**/
    
    @Delete(':id')
    async deleteUser(@Param('id') id: string): Promise<void>{
        return this.usuarioService.deleteUser(id);
    }
}