import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { COFFEE_BRANDS } from './coffee.constants';
import { ConfigModule } from '@nestjs/config';
import coffeeConfig from './config/coffee.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Coffee, Flavor]),
    ConfigModule.forFeature(coffeeConfig),
  ],
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    {
      provide: COFFEE_BRANDS,
      useValue: ['buddy brew', 'nescafe'],
    },
  ],
})
export class CoffeesModule {}
