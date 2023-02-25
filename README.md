<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## How did we set up this project?
```shell
nvm use v18.14.1
npm install -g @nestjs/cli
nest new
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

### To Create controller

```bash
$ nest g controller
```
OR (short form)
```bash
$ nest g co
```

Also, we can create controllers under specific directories.
    
```bash
$ nest generate controller module/abc
```
will be placed under `src/module/abc/`

### To Create service

```bash
$ nest g service
```
OR (short form)
```bash
$ nest g s
```

### To create a module
```bash
$ nest g module
```

### To create a class
```bash
$ nest g class <path> 
```
if you want to avoid generating test file, use
```bash
$ nest g class <path> --no-spec
```
## Migrations

### Create migration
```bash
$ npx typeorm migration:create <path>
```
example:
```bash
npx typeorm migration:create src/migrations/CoffeeRefactor
```
### Execute migration
```bash
$ npm run build
$ npx typeorm migration:run -d dist/typeorm-cli.config
```
### Revert migration
```bash
$ npx typeorm migration:revert -d dist/typeorm-cli.config
```
### Let TypeORM generate the migration file for you
```bash
$ npx typeorm migration:generate src/migrations/SchemaSync -d dist/typeorm-cli.config
```

## Custom providers

### Value provider
```typescript
export class MockCoffeesService { }

@Module({
  providers: [
    {
      provide: CoffeesService,
      useValue: new MockCoffeesService(), // <-- mock implementation
    }
  ]
})
export class CoffeesModule {}
```
### Non-class-based providers
```typescript
{
  provide: 'COFFEE_BRANDS', // 👈
  useValue: ['buddy brew', 'nescafe'] // array of coffee brands,
}
```
inject this to the service now
```typescript
@Injectable()
export class CoffeesService {
  constructor(
    @Inject('COFFEE_BRANDS') coffeeBrands: string[],
  ) {
    console.log(coffeeBrands);
  }
}
```
### Class provider
```typescript
@Module({
  providers: [
    {
      provide: CoffeesService,
      useClass: CoffeesService, // <-- regular class
    }
  ]
})
```
### Factory provider
We can replace the provider with value by using factory provider.
```typescript
@Module({
  providers: [
    {
      provide: 'COFFEE_BRANDS',
        useFactory: () => ['buddy brew', 'nescafe'],
    }
  ]
})
```
the factory provider is powerful because we can inject dependencies into the factory function.
```typescript
@Injectable()
export class BrandsFactory {
  create() {
    return ['buddy brew', 'nescafe'];
  }
}
@Module({
  providers: [
    {
      provide: 'COFFEE_BRANDS',
      useFactory: (brandsFactory: BrandsFactory) => brandsFactory.create(),
      inject: [BrandsFactory],
    }
  ]
})
```
Async providers
```typescript
{
  provide: 'COFFEE_BRANDS',
  // Note "async" here, and Promise/Async event inside the Factory function 
  // Could be a database connection / API call / etc
  // In our case we're just "mocking" this type of event with a Promise
  useFactory: async (connection: Connection): Promise<string[]> => {
    // const coffeeBrands = await connection.query('SELECT * ...');
    const coffeeBrands = await Promise.resolve(['buddy brew', 'nescafe'])
    return coffeeBrands;
  },
  inject: [Connection],
},
```

## Dynamic modules
```typescript
// Improved Dynamic Module way of creating CONNECTION provider
export class DatabaseModule {
  static register(options: DataSourceOptions): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [
        {
          provide: 'CONNECTION',
          useValue: new DataSource(options), 
        }
      ]
    }
  }
}
```
utilize the dynamic module in another module
```typescript
// Utilizing the dynamic DatabaseModule in another Modules imports: []
imports: [
  DatabaseModule.register({ // 👈 passing in dynamic values
    type: 'postgres',
    host: 'localhost',
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
  })
]
```
## Provider scopes

### Singleton scope (default scope)
This is assumed when NO Scope is entered.
```typescript
@Injectable({ scope: Scope.DEFAULT })
export class CoffeesService {}
```
or
```typescript
@Injectable()
export class CoffeesService {}
```

### Transient scope
This means the provider will be instantiated every time it is injected.
```typescript
@Injectable({ scope: Scope.TRANSIENT })
export class CoffeesService {}
```

Scope TRANSIENT with a Custom Provider
```typescript
{
    provide: 'COFFEE_BRANDS',
    useFactory: () => ['buddy brew', 'nescafe'],
    scope: Scope.TRANSIENT // 👈
}
````

### Request scope
Request scope provides a new instance of the provider for each incoming request.
```typescript
@Injectable({ scope: Scope.REQUEST })
export class CoffeesService {}
```

## Other building blocks
* Exception filters
* Pipes
* Guards
* Interceptors

Nest building blocks can be:
 - Globally-scoped,
 - Controller-scoped,
 - Method-scoped,
 - And (the bonus 4th one) Param-scoped which as we said, is available to Pipes only.

When you have blocks that are scoped to a controller, method, or param, they will be executed in the following order:
1. Global
2. Controller
3. Method
4. Param

if you define validation pipe globally, you cannot inject any dependencies into the pipe. Other way is to add the pipe in the module level. Once instantiated, the pipe will be available in the global scope.
```typescript
providers: [
  {
    provide: APP_PIPE,
    useClass: ValidationPipe,
  },
],
```
similarly APP_GUARD, APP_INTERCEPTOR, APP_FILTER

To apply a pipe in controller level, we can use the @UsePipes decorator.
```typescript
@UsePipes(ValidationPipe)
@Post()
create(@Body() body: CreateCoffeeDto) {
  return this.coffeesService.create(body);
}
```
### Exception filters
Exception filters are used to catch exceptions and handle them in a custom way. They are similar to middleware in that they are executed before the response is sent to the client. However, they are only executed when an exception is thrown.

To create a filter, use the following command:
```bash
$ nest g filter common/filters/http-exception
```
here common/filters/http-exception is the path where the filter will be created.

### Guards
Guards are used to determine whether a request should be handled by a route handler or not. They are executed before the route handler is executed. If the guard returns true, the route handler is executed. If the guard returns false, the route handler is not executed.

To create a guard, use the following command:
```bash
$ nest g guard common/guards/api-key
``` 




