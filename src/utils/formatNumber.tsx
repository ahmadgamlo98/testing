export const formatNumber = (
  value: string | number,
  decimalPrecision: number = 2
): string => {
  const number = typeof value === "string" ? parseFloat(value) : value;

  // Return an empty string if the value cannot be converted to a valid number
  if (isNaN(number)) {
    return "";
  }

  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimalPrecision
  }).format(number);
};
