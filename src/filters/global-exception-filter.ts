/* eslint-disable @typescript-eslint/no-unused-vars */
import { ArgumentsHost, Catch, HttpException, Logger } from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-errors';
import { GraphQLResolveInfo } from 'graphql';
import { RequestContext } from 'src/middlewares/models/request-context';
import { CustomException } from './models/custom-exception';
import { ValidationExceptions } from './models/validation-exception';

@Catch()
export class GlobalExceptionFilter implements GqlExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  private exceptionLogger(
    requestInfo: any,
    clientIp: string,
    userAgent: string,
    memberId: string,
    memberName: string,
    exception: any,
    code: any,
    stack?: string,
  ) {
    this.logger.error(`Request: ${JSON.stringify(requestInfo)}
    ClientIp: ${clientIp}, 
    UserAgent: ${userAgent}, 
    MemberId: ${memberId}, 
    MemberName: ${memberName}, 
    Exception: ${JSON.stringify(exception)}, 
    Code: ${code}, 
    Stack Trace: ${stack}`);
  }

  catch(exceptions: unknown, host: ArgumentsHost): any {
    //if request is REST
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    if (request) return exceptions;
    //TODO: rest request handling

    const clientIp = RequestContext.getClientIpFromRequest();
    const userAgent = RequestContext.getUserAgentFromRequestHeader();
    const memberId = RequestContext.getMemberIdFromRequest();
    const memberName = RequestContext.getMemberNameFromRequest();
    const gqlHost = GqlArgumentsHost.create(host);
    const { returnType, cacheControl, schema, ...requestInfo } =
      gqlHost.getInfo<GraphQLResolveInfo>();
    if (exceptions instanceof ValidationExceptions) {
      //already handled by validation filter
      return;
    } else if (exceptions instanceof CustomException) {
      const { statusCode, ...errorArray } = exceptions;
      const error = new ApolloError('See the exception Info', statusCode);

      error.extensions['exceptionInfo'] = errorArray;
      this.exceptionLogger(
        requestInfo,
        clientIp,
        userAgent,
        memberId,
        memberName,
        exceptions,
        statusCode,
      );
      return error;
    } else if (exceptions instanceof HttpException) {
      const statusCode = exceptions.getStatus().toString();
      const error = new ApolloError('See the exception Info', statusCode);
      error.extensions['exceptionInfo'] = exceptions;
      this.exceptionLogger(
        requestInfo,
        clientIp,
        userAgent,
        memberId,
        memberName,
        exceptions,
        statusCode,
        error.stack,
      );
      return error;
    } else {
      const error = new ApolloError('Internal Server Error', '500');
      this.exceptionLogger(
        requestInfo,
        clientIp,
        userAgent,
        memberId,
        memberName,
        exceptions,
        '500',
        error.stack,
      );
      return error;
    }
  }
}
