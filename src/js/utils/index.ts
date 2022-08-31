const operationRegexp = /^([\d\-?]+(\.\d+)?([-+\/*]\d+(\.\d+)?)*)$/g;

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
  return /\./.test(value);
};

const hasValidInput = (value: string) => {
  return !!value.match(operationRegexp);
};

const isOperation = (value: string) => {
  return hasValidInput(value) && getOperationTerms(value).length > 1;
};

const getOperationTerms = (operation: string) => {
  const terms = operation.split(/[-+/*]/g);
  return terms.filter((val) => val);
};

export {
  calculate,
  getLastDigit,
  getOperationTerms,
  hasComma,
  hasLeadingZero,
  hasValidInput,
  isInfinity,
  isInteger,
  isMathSymbol,
  isOperation,
  isValidDigit,
};
