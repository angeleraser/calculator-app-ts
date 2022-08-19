import { ALL_CALCULATOR_KEYS, CALCULATOR_SYMBOLS } from "../constants";

const textRegexp = /[a-z]/gi;

const isKeyRole = (key: string, role: "number" | "delete" | "sign") => {
  return key === role;
};

const isInteger = (value: string) => {
  return Number.isInteger(Number(value));
};

const isMathSymbol = (key: string) => {
  return key in CALCULATOR_SYMBOLS;
};

const getKeyValue = (key: HTMLButtonElement) => {
  return key.dataset.key;
};

const hasLeadingZero = (value: string) => {
  return value.startsWith("0");
};

const hasComma = (value: string) => {
  return value.includes(".");
};

const hasText = (value: string) => {
  return textRegexp.test(value);
};

const isOperation = (value: string) => {
  const operators = new RegExp("[/*+-]", "gi");
  const endsWithNumber = /\d$/gi;

  return operators.test(value) && endsWithNumber.test(value) && !hasText(value);
};

const calculate = (operation: string, fractionDigits?: number) => {
  try {
    const result = new Function("return " + operation)() as number;
    const fixedResult = result.toFixed(fractionDigits || 0);
    const [integer, floatNums] = String(fixedResult).split(".");
    const onlyZeroFloats = floatNums === "".padStart(fractionDigits || 0, "0");

    if (onlyZeroFloats) return integer;

    return fixedResult;
  } catch {
    return "MATH ERROR";
  }
};

const shouldPreventNewComma = (keyToEval: string, value: string) => {
  return keyToEval === ALL_CALCULATOR_KEYS["."] && hasComma(value);
};

export {
  isInteger,
  isKeyRole,
  getKeyValue,
  calculate,
  hasLeadingZero,
  hasComma,
  isOperation,
  hasText,
  textRegexp,
  isMathSymbol,
  shouldPreventNewComma,
};
