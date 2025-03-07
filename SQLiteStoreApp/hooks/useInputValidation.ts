import { useState } from "react";

export const useInputFloat = (initialValue: string) => {
  const [value, setValue] = useState<string | GLfloat>(initialValue);

  const handleChange = (text: string) => {
    const numericValue = parseFloat(text);
    setValue(isNaN(numericValue) ? 0 : numericValue);
  };

  return { value, onChange: handleChange };
};

const priceRegex = /^[0-9]+(\.[0-9]+)?$/;

export function handlePriceInput(input: string): number | null {
  if (priceRegex.test(input)) {
    return parseFloat(input); // Convert to number if valid
  }
  console.error("Invalid price format");
  return 0; // Return null for invalid input
}
