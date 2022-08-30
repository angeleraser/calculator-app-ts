import { CALCULATOR_KEYS, INVALID_INPUT, THEMES } from "./js/constants";
import {
  getKey,
  hasLeadingZero,
  isValidDigit,
  isMathSymbol,
  isInteger,
  shouldPreventCommaKey,
  isOperation,
  calculate,
  getLastDigit,
  hasValidInput,
  isInfinity,
} from "./js/utils";
import "./styles/index.css";

const toggleBtnEl = document.getElementById(
  "toggle-button"
) as HTMLButtonElement;
const appEl = document.getElementById("app") as HTMLDivElement;
const formEl = document.getElementById("calculator-form") as HTMLFormElement;
const inputEl = document.getElementById("calculator-input") as HTMLInputElement;

const calculator = {
  theme: Number(localStorage.getItem("CALCULATOR_THEME") || THEMES[0]),
  isInvalid: false,
  hasInfinityResult: false,
};

const updateLastInputDigit = (value: string) => {
  const val = getInputVal();
  setInputVal(`${val.substring(0, val.length - 1)}${value}`);
};

const getInputVal = () => {
  return inputEl.value || "";
};

const setInputVal = (value: string) => {
  inputEl.value = value;
};

const showInvalidInputMsg = () => {
  calculator.isInvalid = true;
  setInputVal(INVALID_INPUT);
};

const resetCalculator = () => {
  calculator.isInvalid = false;
  calculator.hasInfinityResult = false;
  setInputVal("");
};

const calculatorHasError = () => {
  return calculator.isInvalid || calculator.hasInfinityResult;
};

const calculateOperation = (value: string) => {
  const result = calculate(value);
  calculator.hasInfinityResult = isInfinity(result);
  return setInputVal(result);
};

const handleToggleTheme = () => {
  calculator.theme += 1;
  if (calculator.theme > 3) calculator.theme = 1;
  appEl.setAttribute("data-theme", String(calculator.theme));
  localStorage.setItem("CALCULATOR_THEME", String(calculator.theme));
};

formEl.addEventListener("click", (event) => {
  const key = getKey(event.target as HTMLButtonElement);
  const value = getInputVal();

  if (key === CALCULATOR_KEYS.Reset || calculatorHasError()) {
    return resetCalculator();
  }

  if ((!value && !isInteger(key)) || shouldPreventCommaKey(value, key)) {
    return event.preventDefault();
  }

  if (hasLeadingZero(value)) return setInputVal(key);

  if (isMathSymbol(key) && !isInteger(getLastDigit(value))) {
    return updateLastInputDigit(key);
  }

  if (key === CALCULATOR_KEYS.Backspace) return updateLastInputDigit("");

  if (key === CALCULATOR_KEYS.Enter && isOperation(value)) {
    return calculateOperation(value);
  }

  return isValidDigit(key) && setInputVal(`${value}${key}`);
});

formEl.addEventListener("keydown", (event) => {
  const { key } = event;
  const value = getInputVal();

  if (calculatorHasError()) {
    event.preventDefault();
    return resetCalculator();
  }

  if (key === CALCULATOR_KEYS.Backspace) return;

  if (key === CALCULATOR_KEYS.Enter && isOperation(value)) {
    return calculateOperation(value);
  }

  if (!isValidDigit(key) || shouldPreventCommaKey(value, key)) {
    return event.preventDefault();
  }

  if (hasLeadingZero(value)) {
    event.preventDefault();
    return setInputVal(key);
  }

  if (isMathSymbol(key) && !isInteger(getLastDigit(value))) {
    event.preventDefault();
    return updateLastInputDigit(key);
  }

  if (calculator.isInvalid) return resetCalculator();
});

inputEl.addEventListener("input", (event) => {
  const { inputType } = event as InputEvent;
  if (inputType !== "insertFromPaste") return;
  if (!hasValidInput(getInputVal())) showInvalidInputMsg();
});

appEl.setAttribute("data-theme", String(calculator.theme));
formEl.addEventListener("submit", (event) => event.preventDefault());
toggleBtnEl.addEventListener("click", handleToggleTheme);
