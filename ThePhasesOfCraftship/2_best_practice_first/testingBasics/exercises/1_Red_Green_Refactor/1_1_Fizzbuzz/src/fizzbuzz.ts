export class FizzBuzz {
  public say(input: number): string {
    if (input < 1 || input > 100) {
      throw "NOT_IN_RANGE";
    }
    let result = "";
    if (input % 3 === 0) {
      result += "Fizz";
    }
    if (input % 5 === 0) {
      result += "Buzz";
    }
    return result || input.toString();
  }
}
