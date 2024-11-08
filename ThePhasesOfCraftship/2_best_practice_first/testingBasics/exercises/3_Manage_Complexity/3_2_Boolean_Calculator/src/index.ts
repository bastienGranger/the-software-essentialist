export class BooleanCalculator {
  AND_EXP = /\b(TRUE|FALSE)\s+\bAND\s+\b(TRUE|FALSE)/g;
  OR_EXP = /\b(TRUE|FALSE)\s+\bOR\s+\b(TRUE|FALSE)/g;
  NOT_EXP = /\bNOT\s+\b(TRUE|FALSE)/g;

  calculate(expression: string): boolean {
    const andResult = this.reduceAnd(expression);
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

  private reduceAnd(expression: string): string {
    let reducedExpression = expression;
    while (this.AND_EXP.test(reducedExpression)) {
      reducedExpression = reducedExpression.replace(
        this.AND_EXP,
        (_, first, second) => {
          return first === "TRUE" && second === "TRUE" ? "TRUE" : "FALSE";
        },
      );
    }

    return reducedExpression;
  }
  private evaluateOr(expression: string): string {
    let reducedExpression = expression;
    while (this.OR_EXP.test(reducedExpression)) {
      reducedExpression = reducedExpression.replace(
        this.OR_EXP,
        (_, first, second) => {
          return first === "TRUE" || second === "TRUE" ? "TRUE" : "FALSE";
        },
      );
    }

    return reducedExpression;
  }

  private evaluateNot(expression: string): string {
    return expression.replace(this.NOT_EXP, (_, value) => {
      return value === "TRUE" ? "FALSE" : "TRUE";
    });
  }
}
