type CalculatationResult = {
  min: number;
  max: number;
  length: number;
  avg: number;
};

export class StatsCalculator {
  calculate(numbers: number[]): CalculatationResult {
    if (numbers.length === 0) {
      throw new Error("InvalidInput");
    }

    const length = numbers.length;
    let [min, ...next] = numbers;
    let sum = min;
    let max = min;

    next.forEach((number) => {
      sum += number;
      if (!min || number < min) {
        min = number;
      }
      if (!max || number > max) {
        max = number;
      }
    });

    return { min, max, length, avg: Math.floor((sum * 100) / length) / 100 };
  }
}
