import { MATH_ERROR_MSG } from "../constants";

const operationRegexp = /^([\d\-?]+(\.\d+)?([-+\/*]\d+(\.\d+)?)*)$/g;

const calculate = (operation: string) => {
  if (!operation) return "0";

  try {
    const calc = new Function(`return ${operation}`) as () => number;
    return calc().toString();
  } catch {
    return MATH_ERROR_MSG;
  }
};

const isInteger = (value: string) => {
  return Number.isInteger(Number(value));
};

const isInfinity = (value: string) => {
  return !Number.isFinite(Number(value));
};

const isValidDigit = (key: string) => {
  return /[0-9\.\+\-\/\*]/.test(key);
};

const hasLeadingZero = (value: string) => {
  return /^0/.test(value);
};

const hasValidInput = (value: string) => {
  return !!value.match(operationRegexp);
};

export {
  calculate,
  hasLeadingZero,
  hasValidInput,
  isInfinity,
  isInteger,
  isValidDigit,
};
