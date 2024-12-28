export function formatWithThousandSeparator(input) {
  // Convert input to a number
  const price = Number(input);

  // Check if the conversion was successful
  if (isNaN(price)) {
    throw new Error('Input must be a valid number or convertible to a number');
  }

  // Format the number with thousand separators
  return price.toLocaleString('en-US');
}
