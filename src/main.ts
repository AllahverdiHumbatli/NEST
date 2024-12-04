import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
      exceptionFactory: (errors) => {
        const errorsForResponse: any = []

        errors.forEach(error => {

          const constraintsKeys = Object.keys(error.constraints!)

          constraintsKeys.forEach(ckey => {
            errorsForResponse.push({message: error.constraints![ckey], field: error.property});
          })

          // errorsForResponse.push( error.constraints![zeroKey]);

        })
           throw new BadRequestException(errorsForResponse);
    }
    })
  );
  app.useGlobalFilters(new HttpExceptionFilter())
  await app.listen( 3000)
}
bootstrap();
// [
//   ValidationError {
//   target: CreateUserInputDto { login: '1-2', password: 'string', email: 'm' },
//   value: '1-2',
//   property: 'login',
//   children: [],
//   constraints: { isLength: 'login must be longer than or equal to 5 characters' }
// },
// ]