import { CALCULATOR_KEYS, SYMBOLS } from "../constants";

const isInteger = (value: string) => {
  return Number.isInteger(Number(value));
};

const isMathSymbol = (key: string) => {
  return Object.values(SYMBOLS).includes(key);
};

const getKeyValue = (key: HTMLButtonElement) => {
  return key.dataset.key || "";
};

const hasLeadingZero = (value: string) => {
  return value[0] === CALCULATOR_KEYS.Zero;
};

const hasComma = (value: string) => {
  return value.includes(CALCULATOR_KEYS.Comma);
};

const hasText = (value: string) => {
  const regexp = /[a-z]/gi;
  return regexp.test(value);
};

const isOperation = (value: string) => {
  const operators = new RegExp("[/*+-]", "gi");
  const endsWithNumber = /\d$/gi;
  return operators.test(value) && endsWithNumber.test(value) && !hasText(value);
};

const getLastValueDigit = (value: string) => {
  return value[value.length - 1] || "";
};

const calculate = (operation: string, fractionDigits?: number) => {
  const result = new Function("return " + operation)() as number;
  const fixedResult = result.toFixed(fractionDigits || 0);
  return fixedResult;
};

const shouldPreventWriting = (key: string, value: string) => {
  const isCommaKey = key === CALCULATOR_KEYS.Comma;
  const lastDigit = getLastValueDigit(value);

  return (
    (!value && (isMathSymbol(key) || isCommaKey)) ||
    (isMathSymbol(lastDigit) && isCommaKey)
  );
};

export {
  isInteger,
  getKeyValue,
  calculate,
  hasLeadingZero,
  hasComma,
  isOperation,
  hasText,
  isMathSymbol,
  shouldPreventWriting,
  getLastValueDigit,
};
