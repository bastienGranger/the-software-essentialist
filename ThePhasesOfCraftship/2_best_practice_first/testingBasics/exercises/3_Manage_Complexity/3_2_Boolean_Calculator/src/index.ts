export class BooleanCalculator {
  public calculate(expression: string): boolean {
    if (expression !== "TRUE" && expression !== "FALSE") {
      throw new Error("Invalid entry");
    }
    return expression === "TRUE";
  }
}
