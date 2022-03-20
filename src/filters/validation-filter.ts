import { ArgumentsHost, Catch } from '@nestjs/common';
import { ExternalExceptionFilter } from '@nestjs/core/exceptions/external-exception-filter';
import { GqlContextType } from '@nestjs/graphql';
import { ValidationExceptions } from './models/validation-exception';
import { ApolloError } from 'apollo-server-errors';
import { I18nService } from 'nestjs-i18n';
import { RequestContext } from 'src/middlewares/models/request-context';

@Catch(ValidationExceptions)
export class ValidationFilter implements ExternalExceptionFilter {
  constructor(private readonly i18n: I18nService) {}
  async catch(
    exceptions: ValidationExceptions,
    host: ArgumentsHost,
  ): Promise<any> {
    if (host.getType<GqlContextType>() !== 'graphql') {
      return null;
    }

    //i18n translations
    for await (const exc of exceptions.validationExceptions) {
      for (let i = 0; i < exc.validationErrors.length; i++) {
        exc.validationErrors[i] = await this.i18n.translate(
          exc.validationErrors[i],
          { lang: RequestContext.getLangFromRequestHeader() },
        );
      }
    }

    const error = new ApolloError('See the exception Info', '400');

    error.extensions['exceptionInfo'] = exceptions;

    return error;
  }
}
