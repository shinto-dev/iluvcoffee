import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
  /*
  @Res() param decorator
  Using underlying platform Response objects (from Express.js or Fastify)

  🚨 Remember to use this with caution (as our code can become platform-dependent)
*/

  @Get()
  findAll(@Res() res: any) {
    return res.status(HttpStatus.OK).send('This action returns all coffees');
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} coffee`;
  }

  @Post()
  create(@Body() body: any) {
    return body;
  }
}
