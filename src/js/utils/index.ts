import { CALCULATOR_KEYS } from "../constants";

const getKeyValue = (key: HTMLButtonElement) => {
  return key.dataset.key || "";
};

const getLastDigit = (value: string | string[]) => {
  return value[value.length - 1] || "";
};

const calculate = (operation: string, fractionDigits?: number) => {
  const result = new Function("return " + operation)() as number;
  const fixedResult = result.toFixed(fractionDigits || 0);
  return fixedResult;
};

const endsWithComma = (value: string) => {
  return /(\.)$/.test(value);
};

const isInteger = (value: string) => {
  return Number.isInteger(Number(value));
};

const isMathSymbol = (key: string) => {
  return !!key.match(/[-+/*]/);
};

const endsWithMathSymbol = (value: string) => {
  return /([-+/*])$/.test(value);
};

const isValidDigit = (key: string) => {
  const regexp = /[0-9\.\+\-\/\*]/;
  return regexp.test(key);
};

const hasLeadingZero = (value: string) => {
  return /^0/.test(value);
};

const hasComma = (value: string) => {
  return value.includes(CALCULATOR_KEYS.Comma);
};

const hasText = (value: string) => {
  const regexp = /[a-z]/gi;
  return regexp.test(value);
};

const isOperation = (value: string) => {
  const operationRegexp = /^(\d+(\.\d+)?([-+\/*]\d+(\.\d+)?)*)$/g;
  return !!value.match(operationRegexp) && value;
};

const getOperationTerms = (operation: string) => {
  const terms = operation.split(/[-+/*]/g);
  return terms.filter((val) => val);
};

const shouldPreventCommaKey = (value: string, key: string) => {
  return (
    hasComma(getLastDigit(getOperationTerms(value))) &&
    key === CALCULATOR_KEYS.Comma
  );
};

export {
  calculate,
  endsWithComma,
  endsWithMathSymbol,
  getKeyValue,
  getLastDigit,
  hasComma,
  hasLeadingZero,
  hasText,
  isInteger,
  isMathSymbol,
  isOperation,
  isValidDigit,
  getOperationTerms,
  shouldPreventCommaKey,
};
