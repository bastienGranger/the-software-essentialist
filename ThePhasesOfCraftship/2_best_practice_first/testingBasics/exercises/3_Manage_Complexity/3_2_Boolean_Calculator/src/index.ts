export class BooleanCalculator {
  AND_EXP =
    /\b((?:NOT\s+)?(?:TRUE|FALSE))\s+AND\s+((?:NOT\s+)?(?:TRUE|FALSE))\b/g;
  OR_EXP =
    /\b((?:NOT\s+)?(?:TRUE|FALSE))\s+OR\s+((?:NOT\s+)?(?:TRUE|FALSE))\b/g;
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
          const firstNotParsed = this.evaluateNot(first);
          const secondNotParsed = this.evaluateNot(second);
          return firstNotParsed == "TRUE" && secondNotParsed === "TRUE"
            ? "TRUE"
            : "FALSE";
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
          const firstNotParsed = this.evaluateNot(first);
          const secondNotParsed = this.evaluateNot(second);
          return firstNotParsed === "TRUE" || secondNotParsed === "TRUE"
            ? "TRUE"
            : "FALSE";
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
