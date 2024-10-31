import { FizzBuzz } from "./fizzbuzz";

describe("fizzbuzz", () => {
  let fizzbuzz: FizzBuzz;

  beforeEach(() => {
    fizzbuzz = new FizzBuzz();
  });

  it("should be defined", () => {
    expect(fizzbuzz).toBeDefined();
  });

  it("should throw 'NOT_IN_RANGE' when input is less than 1", () => {
    expect(() => fizzbuzz.say(0)).toThrow("NOT_IN_RANGE");
    expect(() => fizzbuzz.say(-12)).toThrow("NOT_IN_RANGE");
  });

  it("should throw 'NOT_IN_RANGE' when input is more than 100", () => {
    expect(() => fizzbuzz.say(102)).toThrow("NOT_IN_RANGE");
    expect(() => fizzbuzz.say(1000)).toThrow("NOT_IN_RANGE");
  });

  it("should return input as string", () => {
    expect(fizzbuzz.say(1)).toBe("1");
    expect(fizzbuzz.say(43)).toBe("43");
  });

  it("should return Fizz when input is divisible by 3", () => {
    expect(fizzbuzz.say(3)).toBe("Fizz");
    expect(fizzbuzz.say(9)).toBe("Fizz");
    expect(fizzbuzz.say(42)).toBe("Fizz");
  });

  it("should return Buzz when input is divisible by 5", () => {
    expect(fizzbuzz.say(5)).toBe("Buzz");
  });

  it("should return FizzBuzz when input is divisible by 3 and 5", () => {
    expect(fizzbuzz.say(15)).toBe("FizzBuzz");
    expect(fizzbuzz.say(45)).toBe("FizzBuzz");
  });
});
