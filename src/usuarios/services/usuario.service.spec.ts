import { Usuarios } from '../models/usuarios.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioService } from './usuario.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import TestUtil from '../../shared/test/testUtil';

describe('UsuarioService', () => {
    let service: UsuarioService;

    //Funções e métodos do Repository que eu quero usar no teste, olho no UsuariosService todas as funções que eu chamo com o this.usuarioRepository como o find, delete, update e create por exemplo.
    const mockRepository = {
        find: jest.fn(), //Indica que o find é uma função no UsuariosService
        findOne: jest.fn(), //Indica que o findOne é uma função no UsuariosService
        create: jest.fn(), //Indica que o create é uma função no UsuariosService
        delete: jest.fn(), //Indica que o delete é uma função no UsuariosService
        update: jest.fn(), //Indica que o update é uma função no UsuariosService
        save: jest.fn() //Indica que o save é uma função no UsuariosService
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsuarioService,
                {
                    provide: getRepositoryToken(Usuarios),
                    useValue: mockRepository,
                },
            ],
        }).compile();

        service = module.get<UsuarioService>(UsuarioService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('getAll', () => {
        it('should list all users', async () => {
            const user = TestUtil.giveMeAValideUser(); //Crio um novo usuário válido
            mockRepository.find.mockReturnValue([user, user]); //Aqui eu defino que quando eu chamo a função find ela deve retornar mais de um usuário geralmente (por isso dois users)
            const users = await service.getAll(); //Aqui eu defino qual função que deve ser testada nesse teste
            expect(users).toHaveLength(2); //Testando se realmente tem 2 usuários listados
            expect(mockRepository.find).toHaveBeenCalledTimes(1); //Testando se o método mockado find foi chamado somente uma única vez
        })
    })

});