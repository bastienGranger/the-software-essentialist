import { PalindromeChecker } from "./index";

describe("palindrome checker", () => {
  let palindromeChecker: PalindromeChecker;
  beforeEach(() => {
    palindromeChecker = new PalindromeChecker();
  });

  it("should be defined", () => {
    expect(palindromeChecker).toBeDefined();
  });

  it('should know "mom" is a palindrome', () => {
    expect(palindromeChecker.isPalindrom("mom")).toBeTruthy();
  });

  it('should know "Mom" is a palindrome', () => {
    expect(palindromeChecker.isPalindrom("Mom")).toBeTruthy();
  });

  it('should know "MoM" is a palindrome', () => {
    expect(palindromeChecker.isPalindrom("MoM")).toBeTruthy();
  });

  it('should know "Momx" is NOT a palindrome', () => {
    expect(palindromeChecker.isPalindrom("Momx")).toBeFalsy();
  });

  it('should know "xMomx" is a palindrome', () => {
    expect(palindromeChecker.isPalindrom("xMomx")).toBeTruthy();
  });

  it('should know "bill" is NOT a palindrome', () => {
    expect(palindromeChecker.isPalindrom("bill")).toBeFalsy();
  });

  it('should know "Was It A Rat I Saw" is a palindrome', () => {
    expect(palindromeChecker.isPalindrom("Was It A Rat I Saw")).toBeTruthy();
  });

  it('should know "Never Odd or Even" is a palindrome', () => {
    expect(palindromeChecker.isPalindrom("Never Odd or Even")).toBeTruthy();
  });

  it('should know "Never Odd or Even1" is NOT a palindrome', () => {
    expect(palindromeChecker.isPalindrom("Never Odd or Even1")).toBeFalsy();
  });

  it('should know "1Never Odd or Even1" is a palindrome', () => {
    expect(palindromeChecker.isPalindrom("1Never Odd or Even1")).toBeTruthy();
  });

  it('should know "A Santa at NASA" is a palindrome', () => {
    expect(palindromeChecker.isPalindrom("A Santa at NASA")).toBeTruthy();
  });
});

