export class BooleanCalculator {
  public calculate(expression: string): boolean {
    const expressionParts = expression.split(" ").map((part) => part.trim());

    if (expressionParts.length < 1 || expressionParts.length > 3) {
      throw new Error("Invalid entry");
    }

    if (expressionParts.length === 1) {
      return this.getBooleanValue(expressionParts[0]);
    }

    if (expressionParts.length % 2 === 0) {
      throw new Error("Invalid entry");
    }

    const first = this.getBooleanValue(expressionParts[0]);
    const second = this.getBooleanValue(expressionParts[2]);

    if (!this.isValidOperator(expressionParts[1])) {
      throw new Error("Invalid entry");
    }
    return this.isAndOperator(expressionParts[1])
      ? first && second
      : first || second;
  }

  private getBooleanValue(str: string): boolean {
    if (str === "TRUE" || str === "FALSE") {
      return str === "TRUE";
    }
    throw new Error("Invalid entry");
  }

  private isAndOperator(str: string): boolean {
    return str === "AND";
  }

  private isOrOperator(str: string): boolean {
    return str === "OR";
  }

  private isValidOperator(str: string): boolean {
    return this.isAndOperator(str) || this.isOrOperator(str);
  }
}
