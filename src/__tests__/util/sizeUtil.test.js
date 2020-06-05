import { formatValue } from "../../client/util/sizeUtil";

describe("Test sizeUtil", () => {
  it("should format value in kB", () => {
    expect(formatValue(4096)).toBe(4.0);
    expect(formatValue(0)).toBe(0);
    expect(formatValue(500)).toBe(0.5);
    expect(formatValue(5000)).toBe(4.9);
    expect(formatValue(-1)).toBe(-0);
    expect(formatValue("abc")).toBe(NaN);
  });
});
