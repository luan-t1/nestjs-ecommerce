import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products/product.entity';
import { Category } from './categories/category.entity';
import { ProductModule } from './products/product.module';
import { CategoryModule } from './categories/category.module';
import { config } from 'dotenv';
import { CorsMiddleware } from './middlewares/cross'; // Importe o middleware CORS aqui

config();

@Module({
  imports: [TypeOrmModule.forRoot({
    type: "postgres",
    url: "postgres://wssoxfjz:J41QmRIlyYCe_Xl8-gaY6IE7BR32zUeQ@isabelle.db.elephantsql.com/wssoxfjz",
    entities: [Product, Category],
    database: "wssoxfjz",
    synchronize: true
  }),
  ProductModule,
  CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CorsMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}