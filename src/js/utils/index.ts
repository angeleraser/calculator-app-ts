import { CALCULATOR_KEYS } from "../constants";

const getKey = (buttonEl: HTMLButtonElement) => {
  return buttonEl.dataset.key || "";
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

const isMathSymbol = (key: string) => {
  return !!key.match(/[-+/*]/);
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

const isOperation = (value: string) => {
  const operationRegexp = /^([\d\-?]+(\.\d+)?([-+\/*]\d+(\.\d+)?)*)$/g;
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

export {
  calculate,
  getKey,
  getLastDigit,
  hasComma,
  hasLeadingZero,
  isInteger,
  isMathSymbol,
  isOperation,
  isValidDigit,
  getOperationTerms,
  shouldPreventCommaKey,
};
