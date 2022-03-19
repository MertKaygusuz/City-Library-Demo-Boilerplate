export class ValidationExceptions {
  constructor(validationExceptions: ValidationExceptionBase[]) {
    this.validationExceptions = validationExceptions;
  }

  validationExceptions: ValidationExceptionBase[];
}

export class ValidationExceptionBase {
  constructor(validationErrors: object, property: string, value: any) {
    const validationErrorsSet = new Set<string>();
    for (const key in validationErrors) {
      validationErrorsSet.add(validationErrors[key]);
    }
    this.property = property;
    this.value = value;
    this.validationErrors = Array.from(validationErrorsSet);
  }

  validationErrors: string[];
  property: string;
  value: any;
}
