import { DataSource } from 'typeorm';
import { CoffeeRefactor1676892498914 } from './src/migrations/1676892498914-CoffeeRefactor';
import { SchemaSync1676893860844 } from './src/migrations/1676893860844-SchemaSync';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'postgres',
  username: 'postgres',
  password: 'pass123',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [SchemaSync1676893860844],
});
