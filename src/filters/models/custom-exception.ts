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
  constructor(
    errors: string[],
    property?: string,
    value?: any,
    message?: string,
  ) {
    this.errors = errors;
    this.property = property;
    this.value = value;
    this.message = message;
  }

  errors: string[];
  property?: string;
  value?: any;
  message?: string;
}
