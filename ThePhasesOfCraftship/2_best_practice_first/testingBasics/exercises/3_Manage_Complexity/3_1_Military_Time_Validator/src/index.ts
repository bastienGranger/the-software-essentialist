export class MilitaryTimeValidator {
  public isValidMilitaryTimeRange(timeRange: string): boolean {
    const [start, end] = timeRange.split(" - ");

    if (!this.isValidTime(start) || !this.isValidTime(end)) return false;

    return this.isStartBeforeEnd(start, end);
  }

  private isValidTime(time: string): boolean {
    if (time.length !== 5) return false;
    const [hour, minute] = time.split(":").map(Number);
    return this.isValidHour(hour) && this.isValidMinute(minute);
  }

  private isValidHour(hour: number): boolean {
    return hour >= 0 && hour <= 23;
  }

  private isValidMinute(minute: number): boolean {
    return minute >= 0 && minute <= 59;
  }

  private isStartBeforeEnd(start: string, end: string): boolean {
    const [startHour, startMinute] = start.split(":").map(Number);
    const [endHour, endMinute] = end.split(":").map(Number);

    if (startHour > endHour) return false;
    if (startHour === endHour && startMinute > endMinute) return false;

    return true;
  }
}
