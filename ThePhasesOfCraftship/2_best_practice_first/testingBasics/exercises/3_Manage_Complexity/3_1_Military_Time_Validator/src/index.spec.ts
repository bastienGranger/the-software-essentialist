import { MilitaryTimeValidator } from "./index";

describe("military time validator", () => {
  let militaryTimeValidator: MilitaryTimeValidator;

  beforeEach(() => {
    militaryTimeValidator = new MilitaryTimeValidator();
  });

  it.each([
    ["01:12 - 14:32", true],
    ["22:00 - 23:12", true],
    ["00:00 - 23:59", true],
  ])(
    "should know that '%s' is a valid military time range",
    (input, expected) => {
      expect(militaryTimeValidator.isValidMilitaryTimeRange(input)).toBe(
        expected,
      );
    },
  );
  it.each([
    ["25:00 - 12:23", false],
    ["23:12 - 22:00", false],
    ["23:12 - 23:00", false],
    ["23:59 - 25:59", false],
    ["1:12 - 14:32", false],
    ["01:2 - 14:32", false],
    ["01:12 - 4:32", false],
    ["01:12 - 14:2", false],
    ["01:12 - 14:32:00", false],
    ["01:12:32 - 14:32", false],
    ["", false],
    ["randomestring", false],
    ["00:00 23:59", false],
  ])(
    "should know that '%s' is a invalid military time range",
    (input, expected) => {
      expect(militaryTimeValidator.isValidMilitaryTimeRange(input)).toBe(
        expected,
      );
    },
  );
});
