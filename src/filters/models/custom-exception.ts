import { I18nRequestScopeService } from 'nestjs-i18n';

export class CustomException {
  constructor(
    singleCustomExceptions: CustomExceptionBase[],
    statusCode = '400',
  ) {
    this.singleCustomExceptions = singleCustomExceptions;
    this.statusCode = statusCode;
  }

  singleCustomExceptions: CustomExceptionBase[];
  statusCode: string;
}

export class CustomExceptionBase {
  private constructor(property?: string, value?: any, message?: string) {
    this.property = property;
    this.value = value;
    this.message = message;
  }

  public static async createInstanceWithI18n(
    i18n: I18nRequestScopeService,
    errors: string[],
    property?: string,
    value?: any,
    message?: string,
  ): Promise<CustomExceptionBase> {
    const theInstance = new CustomExceptionBase(property, value, message);
    for (let i = 0; i < errors.length; i++) {
      errors[i] = await i18n.translate(errors[i]);
    }
    theInstance.errors = errors;
    return theInstance;
  }

  public static createInstance(
    errors: string[],
    property?: string,
    value?: any,
    message?: string,
  ): CustomExceptionBase {
    const theInstance = new CustomExceptionBase(property, value, message);
    theInstance.errors = errors;
    return theInstance;
  }

  errors: string[];
  property?: string;
  value?: any;
  message?: string;
}
