import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUsuariosDTO } from "../models/DTO/create-usuarios.dto";
import { UpdateUsuariosDTO } from "../models/DTO/update-usuarios.dto";
import { Usuarios } from '../models/usuarios.entity'

@Injectable()
export class UsuarioService{
    constructor(@InjectRepository(Usuarios) private usuarioRepository: Repository<Usuarios>){}

    async getAll(): Promise<Usuarios[]> {
        return await this.usuarioRepository.find()
    }

    async getById(id: string): Promise<Usuarios>{
        const usuario = await this.usuarioRepository.findOne(id)
        if(!usuario){
            throw new NotFoundException('Usuário com esse id não existe')
        }

        return usuario;
    }

    async createUser(user: CreateUsuariosDTO): Promise<Usuarios>{
        const usuarioExistente = await this.usuarioRepository.findOne({where: {email: user.email, usuario: user.usuario}});
        if(usuarioExistente)
            throw new ConflictException('Usuário já existe no Banco de Dados');

        const usuario = this.usuarioRepository.create(user);

        const usuarioSalvo = this.usuarioRepository.save(usuario);

        return usuarioSalvo;
    }

    async deleteUser(id: string){
        if(await this.usuarioRepository.findOne(id))
            await this.usuarioRepository.delete(id);
        else
            throw new NotFoundException('Usuário com esse id não existe');
    }

    async updateUser(user: UpdateUsuariosDTO, id: string): Promise<Usuarios>{
        if(!await this.usuarioRepository.findOne(id)){
            throw new NotFoundException('Usuário com esse id não existe')
        }

        this.usuarioRepository.update(id, {
            usuario: user.usuario,
            senha: user.senha
        });

        return this.getById(id);
    }
}