const NUMBERS = {
  One: "1",
  Two: "2",
  Three: "3",
  Four: "4",
  Five: "5",
  Six: "6",
  Seven: "7",
  Eight: "8",
  Nine: "9",
  Zero: "0",
};

const SYMBOLS = {
  Add: "+",
  Susbtract: "-",
  Divide: "/",
  Multiply: "*",
};

const CALCULATOR_KEYS = {
  ...NUMBERS,
  ...SYMBOLS,
  Comma: ".",
  Enter: "Enter",
  Backspace: "Backspace",
};

const THEMES = ["1", "2", "3"];

export { CALCULATOR_KEYS, NUMBERS, SYMBOLS, THEMES };
