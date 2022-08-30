import { CALCULATOR_KEYS } from "../constants";

const operationRegexp = /^([\d\-?]+(\.\d+)?([-+\/*]\d+(\.\d+)?)*)$/g;

const getKey = (btnEl: HTMLButtonElement) => {
  return btnEl.dataset.key || "";
};

const getLastDigit = (value: string | string[]) => {
  return value.at(-1) || "";
};

const calculate = (operation: string) => {
  const result = new Function("return " + operation)() as number;
  return result.toString();
};

const isInteger = (value: string) => {
  return Number.isInteger(Number(value));
};

const isInfinity = (value: string) => {
  return !Number.isFinite(Number(value));
};

const isMathSymbol = (key: string) => {
  return !!key.match(/[-+/*]/);
};

const isValidDigit = (key: string) => {
  return /[0-9\.\+\-\/\*]/.test(key);
};

const hasLeadingZero = (value: string) => {
  return /^0/.test(value);
};

const hasComma = (value: string) => {
  return value.includes(CALCULATOR_KEYS.Comma);
};

const isOperation = (value: string) => {
  return !!value.match(operationRegexp) && getOperationTerms(value).length > 1;
};

const getOperationTerms = (operation: string) => {
  const terms = operation.split(/[-+/*]/g);
  return terms.filter((val) => val);
};

const shouldPreventCommaKey = (value: string, key: string) => {
  const lastDigit = getLastDigit(getOperationTerms(value));

  return (
    (hasComma(lastDigit) || isMathSymbol(getLastDigit(value))) &&
    key === CALCULATOR_KEYS.Comma
  );
};

const hasValidInput = (value: string) => {
  return !!value.match(operationRegexp);
};

export {
  calculate,
  getKey,
  getLastDigit,
  getOperationTerms,
  hasComma,
  hasLeadingZero,
  hasValidInput,
  isInteger,
  isMathSymbol,
  isOperation,
  isValidDigit,
  shouldPreventCommaKey,
  isInfinity,
};
