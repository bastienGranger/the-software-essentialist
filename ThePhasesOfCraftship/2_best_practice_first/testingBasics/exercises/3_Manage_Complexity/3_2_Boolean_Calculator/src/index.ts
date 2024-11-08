export class BooleanCalculator {
  AND_EXP =
    /\b((?:NOT\s+)?(?:TRUE|FALSE))\s+AND\s+((?:NOT\s+)?(?:TRUE|FALSE))\b/g;
  OR_EXP =
    /\b((?:NOT\s+)?(?:TRUE|FALSE))\s+OR\s+((?:NOT\s+)?(?:TRUE|FALSE))\b/g;
  NOT_EXP = /\bNOT\s+\b(TRUE|FALSE)/g;
  PARENTHESIS_EXP = /\(([^()]+)\)/g;

  calculate(expression: string): boolean {
    const parenthesisResult = this.reduceParenthesis(expression);
    const andResult = this.reduceAnd(parenthesisResult);
    const orResult = this.reduceOr(andResult);
    const result = this.reduceNot(orResult);

    if (result === "TRUE") {
      return true;
    }
    if (result === "FALSE") {
      return false;
    }
    throw new Error("Invalid entry");
  }

  private reduceParenthesis(expression: string): string {
    let reducedExpression = expression;
    while (this.PARENTHESIS_EXP.test(reducedExpression)) {
      reducedExpression = reducedExpression.replace(
        this.PARENTHESIS_EXP,
        (_, innerExpression) => {
          const result = this.reduceAnd(innerExpression);
          return this.reduceOr(result);
        },
      );
    }

    return reducedExpression;
  }

  private reduceAnd(expression: string): string {
    let reducedExpression = expression;
    while (this.AND_EXP.test(reducedExpression)) {
      reducedExpression = reducedExpression.replace(
        this.AND_EXP,
        (_, first, second) => {
          const firstNotParsed = this.reduceNot(first);
          const secondNotParsed = this.reduceNot(second);
          return firstNotParsed == "TRUE" && secondNotParsed === "TRUE"
            ? "TRUE"
            : "FALSE";
        },
      );
    }

    return reducedExpression;
  }
  private reduceOr(expression: string): string {
    let reducedExpression = expression;
    while (this.OR_EXP.test(reducedExpression)) {
      reducedExpression = reducedExpression.replace(
        this.OR_EXP,
        (_, first, second) => {
          const firstNotParsed = this.reduceNot(first);
          const secondNotParsed = this.reduceNot(second);
          return firstNotParsed === "TRUE" || secondNotParsed === "TRUE"
            ? "TRUE"
            : "FALSE";
        },
      );
    }

    return reducedExpression;
  }

  private reduceNot(expression: string): string {
    return expression.replace(this.NOT_EXP, (_, value) => {
      return value === "TRUE" ? "FALSE" : "TRUE";
    });
  }
}
