import { BooleanCalculator } from "./index";

describe("boolean calculator", () => {
  it("should know that TRUE is true", () => {
    const booleanCalculator = new BooleanCalculator();
    expect(booleanCalculator.calculate("TRUE")).toBe(true);
  });
});
