import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GqlExecutionContext } from '@nestjs/graphql';
import { RequestContext } from 'src/middlewares/models/request-context';

@Injectable()
export class GlobalLoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(GlobalLoggingInterceptor.name);
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const now = Date.now();
    const clientIp = RequestContext.getClientIpFromRequest();
    const userAgent = RequestContext.getUserAgentFromRequestHeader();
    const memberId = RequestContext.getMemberIdFromRequest();
    const memberName = RequestContext.getMemberNameFromRequest();

    // For REST
    if (request) {
      return next
        .handle()
        .pipe(
          tap(() =>
            this.logger.log(
              `${request.method} ${request.url} ${Date.now() - now} ms`,
              `${context.getClass().name}.${context.getHandler().name}`,
              `Client Ip: ${clientIp}`,
              `User Agent: ${userAgent}`,
              `Member Id: ${memberId}`,
              `Member Name: ${memberName}`,
            ),
          ),
        );
    } else {
      //For GRAPHQL
      const ctx: any = GqlExecutionContext.create(context);
      const resolverName = ctx.constructorRef.name;
      const info = ctx.getInfo();

      return next
        .handle()
        .pipe(
          tap(() =>
            this.logger.log(
              `${info.parentType} "${info.fieldName}" ${Date.now() - now} ms`,
              'Resolver Name: ' + resolverName,
              `Client Ip: ${clientIp}`,
              `User Agent: ${userAgent}`,
              `Member Id: ${memberId}`,
              `Member Name: ${memberName}`,
            ),
          ),
        );
    }
  }
}
