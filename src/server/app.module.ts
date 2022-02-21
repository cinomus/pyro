import { Module } from '@nestjs/common';
import Next from 'next';
import { RenderModule } from 'nest-next';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { PostgresDatabaseProviderModule } from './providers/database/postgres/provider.module';
import { UsersModule } from './models/users/users.module';
import { ProductsModule } from './models/products/products.module';

@Module({
  imports: [
    // RenderModule.forRootAsync(Next({ dev: true }), {
    //   // passthrough404: true,
    //   viewsDir: null,
    // }),
    ConfigModule.forRoot({ isGlobal: true, envFilePath: './.env' }),
    // GraphQLModule.forRoot({
    //   autoSchemaFile: 'server/schema.gql',
    //   sortSchema: true,
    //   playground: true,
    // }),
    PostgresDatabaseProviderModule,
    UsersModule,
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
