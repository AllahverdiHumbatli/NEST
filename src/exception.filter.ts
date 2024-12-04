
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    if(status == 400) {
      const errorsMessages:any[] = []
      const responseBody: any = exception.getResponse()
      console.log(exception.getResponse())
      responseBody.message.forEach(msg => { errorsMessages.push(msg) })
      response
        .status(status)
        .json({errorMessages: errorsMessages})
    }
    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}
