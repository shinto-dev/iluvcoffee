import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    CoffeesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'pass123',
      database: 'postgres',
      autoLoadEntities: true, // Automatically load entities from the entities folder.
      synchronize: true, // Don't use this in production! This will drop and re-create your database every time the app is restarted.
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
