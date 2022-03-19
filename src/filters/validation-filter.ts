import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ExternalExceptionFilter } from '@nestjs/core/exceptions/external-exception-filter';
import { GqlContextType } from '@nestjs/graphql';
import { ValidationExceptions } from './models/validation-exception';
import { ApolloError } from 'apollo-server-errors';

@Catch(ValidationExceptions)
export class ValidationFilter implements ExternalExceptionFilter {
  catch(exceptions: ValidationExceptions, host: ArgumentsHost): any {
    if (host.getType<GqlContextType>() !== 'graphql') {
      return null;
    }

    const error = new ApolloError(
      'See the exception Info',
      //exceptions.getStatus().toString(),
      '400',
    );

    //error.stack = exceptions.stack;
    //error.extensions['response'] = exceptions.getResponse();
    error.extensions['exceptionInfo'] = exceptions;

    return error;
    // const ctx = host.switchToHttp();
    // const response = ctx.getResponse();
    // return response.status(400).json({
    //   statusCode: 400,
    //   exceptionInfo: exceptions,
    //   error: 'Bad Request',
    // });
  }
}
