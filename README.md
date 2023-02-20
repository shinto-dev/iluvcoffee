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
