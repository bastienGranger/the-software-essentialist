import { BooleanCalculator } from "./index";

describe("boolean calculator", () => {
  it("should know that TRUE is true", () => {
    const booleanCalculator = new BooleanCalculator();
    expect(booleanCalculator.calculate("TRUE")).toBe(true);
  });

  it("should know that FALSE is false", () => {
    const booleanCalculator = new BooleanCalculator();
    expect(booleanCalculator.calculate("FALSE")).toBe(false);
  });

  it("should throw an error if entry is not a boolean", () => {
    const booleanCalculator = new BooleanCalculator();
    expect(() => booleanCalculator.calculate("INVALID")).toThrowError(
      "Invalid entry",
    );
  });
});
