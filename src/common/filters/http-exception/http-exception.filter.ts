import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException>
  implements ExceptionFilter
{
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const statusCode = exception.getStatus();
    const exceptionResponse = exception.message;

    response.status(statusCode).json({
      statusCode,
      error: exceptionResponse,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
