export class PalindromeChecker {
  public isPalindrom(str: string): boolean {
    const stripped = str.split(" ").join("").toLowerCase();
    const reversed = stripped.split("").reverse().join("");
    return stripped === reversed;
  }
}
