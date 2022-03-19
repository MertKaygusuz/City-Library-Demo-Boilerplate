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

    const error = new ApolloError('See the exception Info', '400');

    error.extensions['exceptionInfo'] = exceptions;

    return error;
  }
}
