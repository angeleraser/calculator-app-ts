const CALCULATOR_NUMBERS = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  0: 0,
};

const CALCULATOR_SYMBOLS = {
  "+": "+",
  "-": "-",
  "/": "/",
  "*": "*",
};

const ALL_CALCULATOR_KEYS = {
  ...CALCULATOR_NUMBERS,
  ...CALCULATOR_SYMBOLS,
  ".": ".",
  Enter: "Enter",
  Backspace: "Backspace",
};

export { ALL_CALCULATOR_KEYS, CALCULATOR_NUMBERS, CALCULATOR_SYMBOLS };
