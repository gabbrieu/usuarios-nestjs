import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsuariosModule } from './usuarios/modules/usuarios.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true
    }),
    UsuariosModule,
    AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
