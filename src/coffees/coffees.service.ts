import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
  ) {}

  async findAll(): Promise<Coffee[]> {
    return await this.coffeeRepository.find();
  }

  async findOne(id: number): Promise<Coffee> {
    const coffee = await this.coffeeRepository.findOne({ where: { id } });
    if (!coffee) {
      throw new NotFoundException(`coffee not found`);
    }
    return coffee;
  }

  create(createCoffeeDto: CreateCoffeeDto): Promise<Coffee> {
    const coffee = this.coffeeRepository.create(createCoffeeDto);
    return this.coffeeRepository.save(coffee);
  }

  async update(id: number, updateCoffeeDto: UpdateCoffeeDto): Promise<Coffee> {
    const existingCoffee = await this.coffeeRepository.preload({
      id,
      ...updateCoffeeDto,
    });
    if (!existingCoffee) {
      throw new NotFoundException(`coffee not found`);
    }
    return this.coffeeRepository.save(existingCoffee);
  }

  async remove(id: number): Promise<Coffee> {
    const coffee = await this.findOne(id);
    return this.coffeeRepository.remove(coffee);
  }
}
