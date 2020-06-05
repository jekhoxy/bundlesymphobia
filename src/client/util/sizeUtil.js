/**
 * Format the given Byte to kByte with 1 decimal
 */
export function formatValue(octets) {
  let result = octets / 1024;
  if (result < 1) {
    result = octets;
  } else {
    result = Number(result.toFixed(1));
  }
  return result;
}
