import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { from, Observable } from 'rxjs';
import { Usuarios } from 'src/usuarios/models/usuarios.entity';

@Injectable()
export class ServicesService {
    constructor(private readonly jwtService: JwtService){}

    generateJWT(user: Usuarios): Observable<string>{
        return from(this.jwtService.signAsync({user}));
    }

    /**hashPassword(): Observable<string>{

    }

    comparePasswords(): Observable<any>{

    }**/
}
