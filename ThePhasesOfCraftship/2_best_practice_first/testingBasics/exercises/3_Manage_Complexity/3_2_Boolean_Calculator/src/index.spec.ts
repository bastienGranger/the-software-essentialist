import { BooleanCalculator } from "./index";

describe("boolean calculator", () => {
  let booleanCalculator: BooleanCalculator;

  beforeEach(() => {
    booleanCalculator = new BooleanCalculator();
  });

  describe("given the entry is one word", () => {
    it("should throw an Invalid entry if entry is empty", () => {
      expect(() => booleanCalculator.calculate("")).toThrowError(
        "Invalid entry",
      );
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
  });

  describe("given the entry is 2 words", () => {
    it("should know that NOT TRUE is false", () => {
      expect(booleanCalculator.calculate("NOT TRUE")).toBe(false);
    });

    it("should know that NOT FALSE is true", () => {
      expect(booleanCalculator.calculate("NOT FALSE")).toBe(true);
    });
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

    it.each`
      expression
      ${"AND TRUE TRUE"}
      ${"AND TRUE FALSE"}
      ${"AND FALSE TRUE"}
      ${"AND FALSE FALSE"}
      ${"TRUE AND"}
      ${"TRUE FALSE AND"}
      ${"FALSE TRUE AND"}
      ${"FALSE FALSE AND"}
    `(
      "should know that $expression is an invalid entry",
      ({ expression, expected }) => {
        expect(() => booleanCalculator.calculate(expression)).toThrow(
          "Invalid entry",
        );
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

    it.each`
      expression
      ${"OR TRUE TRUE"}
      ${"OR TRUE FALSE"}
      ${"OR FALSE TRUE"}
      ${"OR FALSE FALSE"}
      ${"TRUE OR"}
      ${"TRUE FALSE OR"}
      ${"FALSE TRUE OR"}
      ${"FALSE FALSE OR"}
    `(
      "should know that $expression is an invalid entry",
      ({ expression, expected }) => {
        expect(() => booleanCalculator.calculate(expression)).toThrow(
          "Invalid entry",
        );
      },
    );
  });
});
