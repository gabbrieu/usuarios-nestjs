import { Usuarios } from "./../../usuarios/models/usuarios.entity";

export default class TestUtil{
    //Método estático eu não preciso instanciar um objeto para usá-lo
    static giveMeAValideUser(): Usuarios {
        const user = new Usuarios();
        user.email = "valid@email.com";
        user.nome = "Gabriel Henrique Leite Mendes";
        user.usuario = "gabbrieu";
        user.senha = "1235";
        user.id = 1;

        return user;
    }
}