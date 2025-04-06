import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './users/entities/user.entity';
@Module({
  imports: [
    ProductsModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'products.db',
      entities: [Product],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
