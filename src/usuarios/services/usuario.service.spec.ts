import { Usuarios } from '../models/usuarios.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioService } from './usuario.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import TestUtil from '../../shared/test/testUtil';
import { ConflictException, NotFoundException } from '@nestjs/common';

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

    beforeAll(async () => {
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

    //Limpando todos os mocks antes de cada teste
    beforeEach(async () => {
        mockRepository.find.mockReset();
        mockRepository.findOne.mockReset();
        mockRepository.create.mockReset();
        mockRepository.delete.mockReset();
        mockRepository.update.mockReset();
        mockRepository.save.mockReset();
    })

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('When search all users', () => {
        it('should list all users', async () => {
            const user = TestUtil.giveMeAValideUser(); //Crio um novo usuário válido
            mockRepository.find.mockReturnValue([user, user]); //Aqui eu defino que quando eu chamo a função find ela deve retornar mais de um usuário geralmente (por isso dois users)
            const users = await service.getAll(); //Aqui eu defino qual função que deve ser testada nesse teste
            expect(users).toHaveLength(2); //Testando se realmente tem 2 usuários listados
            expect(mockRepository.find).toHaveBeenCalledTimes(1); //Testando se o método mockado find foi chamado somente uma única vez
        });
    });

    describe('When search a user by id', () => {
        it('should list one existint user', async () => {
            const user = TestUtil.giveMeAValideUser();
            mockRepository.findOne.mockReturnValue(user);
            const userFound = await service.getById('1');

            expect(userFound).toMatchObject({nome: user.nome, email: user.email, senha: user.senha, usuario: user.usuario, id: user.id});
            expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
        });

        it('should throw a NotFoundException when the user is not found', async () => {
            mockRepository.findOne.mockReturnValue(null); //Deve retornar null pois nesse caso é quando o banco não acha o usuário

            expect(service.getById('2')).rejects.toBeInstanceOf(NotFoundException);
            expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
        });
    });

    describe('When create a user', () => {
        it('should create a user', async () => {
            const user = TestUtil.giveMeAValideUser();
            mockRepository.findOne.mockReturnValue(null);
            mockRepository.save.mockReturnValue(user);
            mockRepository.create.mockReturnValue(user);
            const userCreated = await service.createUser(user);

            expect(userCreated).toMatchObject(user);
            expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
            expect(mockRepository.save).toHaveBeenCalledTimes(1);
            expect(mockRepository.create).toHaveBeenCalledTimes(1);
        });

        it('should throw a ConflitException if the user already exists in the DB', async () => {
            const user = TestUtil.giveMeAValideUser();
            mockRepository.findOne.mockReturnValue(user);
            
            expect(service.createUser(user)).rejects.toBeInstanceOf(ConflictException);
            expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
        });
    });

    describe('When delete a user', () => {
        it('should delete the user', async () => {
            const user = TestUtil.giveMeAValideUser();
            mockRepository.findOne.mockReturnValue(user);
            mockRepository.delete.mockReturnValue(user);
            const returnValue = await service.deleteUser('1');
            expect(returnValue).toBeUndefined();
            expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
            expect(mockRepository.delete).toHaveBeenCalledTimes(1);
        });

        it('should throw a NotFoundException when the user does not exists', async () => {
            mockRepository.findOne.mockReturnValue(null);
            expect(service.deleteUser('3')).rejects.toBeInstanceOf(NotFoundException);
            expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
        });
    });

    describe('When update a user', () => {
        it('should update a user', async () => {
            const user = TestUtil.giveMeAValideUser();
            mockRepository.findOne.mockReturnValue(user);
            mockRepository.update.mockReturnValue({...user, usuario: 'Bielzin'});

            const userUpdated = await service.updateUser({...user, usuario: 'Bielzin'}, '1');
            expect(userUpdated).toMatchObject(user);
            expect(mockRepository.findOne).toHaveBeenCalledTimes(2);
            expect(mockRepository.update).toHaveBeenCalledTimes(1);
        });
        
        it('should throw a NotFoundException when the user does not exists', async () => {
            const user = TestUtil.giveMeAValideUser();
            mockRepository.findOne.mockReturnValue(null);

            expect(service.updateUser(user, '3')).rejects.toBeInstanceOf(NotFoundException);
            expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
        });
    });

});