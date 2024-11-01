import { PasswordValidator } from "./index";

describe("password validator", () => {
  let passwordValidator: PasswordValidator;

  beforeEach(() => {
    passwordValidator = new PasswordValidator();
  });

  it("should consider Password123 as valid", () => {
    const result = passwordValidator.validate("Password123");
    expect(result.success).toBe(true);
    expect(result.errors).toBe(null);
  });

  it("should consider maxwell1_c as invalid because it does not contain an uppercase letter", () => {
    const result = passwordValidator.validate("maxwell1_c");
    expect(result.success).toBe(false);
    expect(result.errors).toEqual([
      {
        code: "InvalidUpperCaseError",
        message: "Password should contain at least one Upper case letter",
      },
    ]);
  });

  it("should consider maxwellTheBe as invalid because it is missing a digit", () => {
    const result = passwordValidator.validate("maxwellTheBe");
    expect(result.success).toBe(false);
    expect(result.errors).toEqual([
      {
        code: "InvalidDigitError",
        message: "Password should contain at least one digit",
      },
    ]);
  });

  it("should consider thePhysical1234567 as invalid because it is too long", () => {
    const result = passwordValidator.validate("thePhysical1234567");
    expect(result.success).toBe(false);
    expect(result.errors).toEqual([
      {
        code: "InvalidLengthError",
        message: "Password should be between 5 and 15 characters",
      },
    ]);
  });

  test("should return all 3 errors types when password is pwd", () => {
    const result = passwordValidator.validate("pwd");
    expect(result.success).toBe(false);
    expect(result.errors).toEqual([
      {
        code: "InvalidLengthError",
        message: "Password should be between 5 and 15 characters",
      },
      {
        code: "InvalidDigitError",
        message: "Password should contain at least one digit",
      },
      {
        code: "InvalidUpperCaseError",
        message: "Password should contain at least one Upper case letter",
      },
    ]);
  });
});
