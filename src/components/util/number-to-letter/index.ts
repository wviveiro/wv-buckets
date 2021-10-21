/**
 * Transform a interger number into letter
 */
export const numberToLetter = (num: number) => {
  let s = '';

  while (num > 0) {
    const t = (num - 1) % 26;
    s = `${String.fromCharCode(65 + t)}${s}`;
    num = ((num - t) / 26) | 0;
  }
  return s;
};
