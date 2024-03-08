// numberToWords.js

export const convertToWords = (number) => {
  if (!number) {
    return '';
  }

  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const tens = ['', 'Ten', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];

  let result = '';

  if (number.length === 1) {
    return ones[number];
  }

  // Split the number into digits
  const digits = number.split('').map(Number);

  // Handle thousands
  if (digits.length > 3) {
    result += ones[digits[digits.length - 4]] + ' Thousand ';
  }

  // Handle hundreds
  if (digits.length > 2) {
    result += ones[digits[digits.length - 3]] + ' Hundred ';
  }

  // Handle tens and ones
  if (digits[digits.length - 2] === 1) {
    result += teens[digits[digits.length - 1]];
  } else {
    result += tens[digits[digits.length - 2]] + ' ' + ones[digits[digits.length - 1]];
  }

  return result.trim();
};
