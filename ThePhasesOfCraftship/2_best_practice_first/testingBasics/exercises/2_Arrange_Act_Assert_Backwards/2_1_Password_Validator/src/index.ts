type ValidatorValidPasswordResult = {
  success: true;
  errors: null;
};

export enum ErrorCode {
  LENGTH = "InvalidLengthError",
  DIGIT = "InvalidDigitError",
  UPPERCase = "InvalidUpperCaseError",
}

type ValidatorError = {
  code: ErrorCode;
  message: string;
};

type ValidatorInvalidPasswordResult = {
  success: false;
  errors: ValidatorError[];
};

type ValidatorResult =
  | ValidatorValidPasswordResult
  | ValidatorInvalidPasswordResult;

export class PasswordValidator {
  public validate(pwd: string): ValidatorResult {
    const success = true;
    const errorCodes: ErrorCode[] = [];
    if (!this.isRightLength(pwd)) {
      errorCodes.push(ErrorCode.LENGTH);
    }

    if (!this.hasDigit(pwd)) {
      errorCodes.push(ErrorCode.DIGIT);
    }

    if (!this.hasUpperCase(pwd)) {
      errorCodes.push(ErrorCode.UPPERCase);
    }

    if (errorCodes.length > 0) {
      return { success: false, errors: this.formatErrors(errorCodes) };
    }

    return { success, errors: null };
  }

  private isRightLength(pwd: string): boolean {
    return pwd.length >= 5 && pwd.length <= 15;
  }

  private hasDigit(pwd: string): boolean {
    return /\d/.test(pwd);
  }

  private hasUpperCase(pwd: string): boolean {
    return /[A-Z]/.test(pwd);
  }

  private formatErrors(errorCodes: ErrorCode[]): ValidatorError[] {
    return errorCodes.map((errorCode) => {
      switch (errorCode) {
        case ErrorCode.LENGTH:
          return {
            code: ErrorCode.LENGTH,
            message: "Password should be between 5 and 15 characters",
          };
        case ErrorCode.DIGIT:
          return {
            code: ErrorCode.DIGIT,
            message: "Password should contain at least one digit",
          };
        case ErrorCode.UPPERCase:
          return {
            code: ErrorCode.UPPERCase,
            message: "Password should contain at least one Upper case letter",
          };
      }
    });
  }
}
