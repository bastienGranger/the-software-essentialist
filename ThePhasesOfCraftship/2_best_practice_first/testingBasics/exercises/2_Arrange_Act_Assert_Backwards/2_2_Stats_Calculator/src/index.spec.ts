import { StatsCalculator } from "./index";

describe("stats calculator", () => {
  let statsCalculator: StatsCalculator;

  beforeEach(() => {
    statsCalculator = new StatsCalculator();
  });

  it("should return InvalidInput error it the input is empty array", () => {
    expect(() => statsCalculator.calculate([])).toThrow("InvalidInput");
  });

  it.each([
    { input: [1, 2, 3, 4, 5], output: { min: 1, max: 5, length: 5, avg: 3 } },
    {
      input: [2, 4, 21, -8, 53, 40],
      output: { min: -8, max: 53, length: 6, avg: 18.66 },
    },
    { input: [0], output: { min: 0, max: 0, length: 1, avg: 0 } },
    {
      input: [-0, -0, -0, -0, -0, -0, -0, -0],
      output: { min: -0, max: -0, length: 8, avg: -0 },
    },
    {
      input: [1, 2.5, 3.5, 4.5, -5.5],
      output: { min: -5.5, max: 4.5, length: 5, avg: 1.2 },
    },
  ])(
    "should return a formatted output for input $input",
    ({ input, output }) => {
      expect(statsCalculator.calculate(input)).toEqual(output);
    },
  );
});
