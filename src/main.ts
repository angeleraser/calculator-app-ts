import { ALL_CALCULATOR_KEYS } from "./js/constants";
import {
  calculate,
  getKeyValue,
  hasLeadingZero,
  hasText,
  isInteger,
  isOperation,
  isMathSymbol,
  shouldPreventNewComma,
} from "./js/utils";
import "./styles/index.css";

const toggleBtnEl = document.getElementById(
  "toggle-button"
) as HTMLButtonElement;
const appEl = document.getElementById("app") as HTMLDivElement;
const formEl = document.getElementById("calculator-form") as HTMLFormElement;
const inputEl = document.getElementById("calculator-input") as HTMLInputElement;

const lastThemeSaved = localStorage.getItem("CALCULATOR_THEME_KEY");
const state = {
  theme: lastThemeSaved ? Number(lastThemeSaved) : 1,
  themes: { primary: 1, secondary: 2, tertiary: 3 },
  result: 0,
};

const updateLastInputDigit = (value: string) => {
  const val = getInputValue();
  setInputValue(`${val.substring(0, val.length - 1)}${value}`);
};

const getInputValue = () => {
  return inputEl.value || "";
};

const setInputValue = (value: string) => {
  inputEl.value = value;
};

const getLastInputDigit = () => {
  const value = getInputValue();
  return value[value.length - 1] || "";
};

const setOperationResult = (operation: string) => {
  inputEl.focus();

  if (!isOperation(operation)) return;

  const result = calculate(operation, 4);

  setInputValue(result);
};

const initApp = () => {
  appEl.setAttribute("data-theme", String(state.theme));
  formEl.addEventListener("submit", (event) => event.preventDefault());

  appEl.addEventListener("click", (ev) => {
    const event = ev as PointerEvent;
    const keyBtn = event.target as HTMLButtonElement;

    const key = getKeyValue(keyBtn) || "";
    const lastDigit = getLastInputDigit();
    const inputVal = getInputValue();

    if (
      (!inputVal && isMathSymbol(key)) ||
      shouldPreventNewComma(key, inputVal)
    ) {
      return;
    }

    if (hasText(inputVal) || hasLeadingZero(inputVal)) {
      return setInputValue(key);
    }

    if (!isInteger(lastDigit) && isMathSymbol(key)) {
      return updateLastInputDigit(key);
    }

    if (key === ALL_CALCULATOR_KEYS.Backspace) return updateLastInputDigit("");

    if (key === ALL_CALCULATOR_KEYS.Enter) return setOperationResult(inputVal);

    return setInputValue(`${inputVal}${key}`);
  });

  toggleBtnEl.addEventListener("click", () => {
    state.theme += 1;
    if (state.theme > 3) state.theme = 1;
    appEl.setAttribute("data-theme", String(state.theme));
    localStorage.setItem("CALCULATOR_THEME_KEY", String(state.theme));
  });

  formEl.addEventListener("keyup", (event) => {
    const { key } = event;
    const inputVal = getInputValue();
    const lastDigit = getLastInputDigit();

    if (hasText(inputVal) || hasLeadingZero(inputVal)) {
      return setInputValue(key);
    }

    if (!isInteger(lastDigit) && isMathSymbol(key)) {
      return updateLastInputDigit(key);
    }
  });

  formEl.addEventListener("keydown", (event) => {
    const { key } = event;
    const inputVal = getInputValue();

    if (
      !(key in ALL_CALCULATOR_KEYS) ||
      (!inputVal && isMathSymbol(key)) ||
      shouldPreventNewComma(key, inputVal)
    ) {
      return event.preventDefault();
    }

    if (key === ALL_CALCULATOR_KEYS.Enter) setOperationResult(inputVal);
  });
};

initApp();
