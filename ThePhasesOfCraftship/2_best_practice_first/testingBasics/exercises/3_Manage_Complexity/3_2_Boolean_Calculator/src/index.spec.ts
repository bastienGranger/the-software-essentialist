import { BooleanCalculator } from "./index";

describe("boolean calculator", () => {
  let booleanCalculator: BooleanCalculator;

  beforeEach(() => {
    booleanCalculator = new BooleanCalculator();
  });

  it("should throw an Invalid entry if entry is empty", () => {
    expect(() => booleanCalculator.calculate("")).toThrowError("Invalid entry");
  });

  it("should throw an Invalid entry error if entry is not a boolean", () => {
    expect(() => booleanCalculator.calculate("INVALID")).toThrowError(
      "Invalid entry",
    );
  });

  it("should throw an Invalid entry error if entry is an operator and not boolean", () => {
    expect(() => booleanCalculator.calculate("AND")).toThrowError(
      "Invalid entry",
    );
    expect(() => booleanCalculator.calculate("OR")).toThrowError(
      "Invalid entry",
    );
  });

  it("should know that TRUE is true", () => {
    expect(booleanCalculator.calculate("TRUE")).toBe(true);
  });

  it("should know that FALSE is false", () => {
    expect(booleanCalculator.calculate("FALSE")).toBe(false);
  });

  it("should know that NOT TRUE is false", () => {
    expect(booleanCalculator.calculate("NOT TRUE")).toBe(false);
  });

  it("should know that NOT FALSE is true", () => {
    expect(booleanCalculator.calculate("NOT FALSE")).toBe(true);
  });

  describe("given an entry with 2 booleans and the AND operator", () => {
    it.each`
      expression           | expected
      ${"TRUE AND TRUE"}   | ${true}
      ${"TRUE AND FALSE"}  | ${false}
      ${"FALSE AND TRUE"}  | ${false}
      ${"FALSE AND FALSE"} | ${false}
    `(
      "should know that $expression is $expected",
      ({ expression, expected }) => {
        expect(booleanCalculator.calculate(expression)).toBe(expected);
      },
    );
  });

  describe("given an entry with 2 booleans and the OR operator", () => {
    it.each`
      expression          | expected
      ${"TRUE OR TRUE"}   | ${true}
      ${"TRUE OR FALSE"}  | ${true}
      ${"FALSE OR TRUE"}  | ${true}
      ${"FALSE OR FALSE"} | ${false}
    `(
      "should know that $expression is $expected",
      ({ expression, expected }) => {
        expect(booleanCalculator.calculate(expression)).toBe(expected);
      },
    );
  });
});
