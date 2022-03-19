import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { ExternalExceptionFilter } from '@nestjs/core/exceptions/external-exception-filter';
import {
  GqlArgumentsHost,
  GqlContextType,
  GqlExceptionFilter,
} from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-errors';
import { GraphQLResolveInfo } from 'graphql';
import { CustomException } from './models/custom-exception';
import { ValidationExceptions } from './models/validation-exception';

@Catch()
export class GlobalExceptionFilter
  implements ExceptionFilter, GqlExceptionFilter
{
  catch(exceptions: unknown, host: ArgumentsHost): any {
    const gqlHost = GqlArgumentsHost.create(host);
    const info = gqlHost.getInfo<GraphQLResolveInfo>();
    console.log(info);

    //TODO
    if (exceptions instanceof ValidationExceptions) {
      //throw CustomException;
      return;
    } else if (exceptions instanceof CustomException) {
      const { statusCode, ...errorArray } = exceptions;
      const error = new ApolloError('See the exception Info', statusCode);

      error.extensions['exceptionInfo'] = errorArray;
      return error;
    } else if (exceptions instanceof HttpException) {
      const error = new ApolloError(
        'See the exception Info',
        exceptions.getStatus().toString(),
      );
      error.extensions['exceptionInfo'] = exceptions;
      return error;
    } else {
      const error = new ApolloError('Internal Server Error', '500');
      return error;
    }
  }
}
