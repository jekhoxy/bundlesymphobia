/**
 * Format the given Byte to kByte with n decimal (n = 1 by default)
 */
export function formatValue(octets, decimal = 1) {
  return Number((octets / 1024).toFixed(decimal));
}
