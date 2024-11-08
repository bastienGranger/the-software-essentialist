export class BooleanCalculator {
  calculate(expression: string): boolean {
    const andResult = this.evaluateAnd(expression);
    const orResult = this.evaluateOr(andResult);
    const result = this.evaluateNot(orResult);

    if (result === "TRUE") {
      return true;
    }
    if (result === "FALSE") {
      return false;
    }
    throw new Error("Invalid entry");
  }

  private evaluateAnd(expression: string): string {
    return expression.replace(
      /\b(TRUE|FALSE)\s+\bAND\s+\b(TRUE|FALSE)/g,
      (_, first, second) => {
        return first === "TRUE" && second === "TRUE" ? "TRUE" : "FALSE";
      },
    );
  }
  private evaluateOr(expression: string): string {
    return expression.replace(
      /\b(TRUE|FALSE)\s+\bOR\s+\b(TRUE|FALSE)/g,
      (_, first, second) => {
        return first === "TRUE" || second === "TRUE" ? "TRUE" : "FALSE";
      },
    );
  }

  private evaluateNot(expression: string): string {
    return expression.replace(/\bNOT\s+\b(TRUE|FALSE)/g, (_, value) => {
      return value === "TRUE" ? "FALSE" : "TRUE";
    });
  }
}
