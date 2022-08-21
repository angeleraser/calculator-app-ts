import { CALCULATOR_KEYS, THEMES } from "./js/constants";
import {
  calculate,
  getKeyValue,
  hasLeadingZero,
  hasText,
  isInteger,
  isOperation,
  isMathSymbol,
  shouldPreventWriting,
  getLastValueDigit,
} from "./js/utils";
import "./styles/index.css";

const toggleBtnEl = document.getElementById(
  "toggle-button"
) as HTMLButtonElement;
const appEl = document.getElementById("app") as HTMLDivElement;
const formEl = document.getElementById("calculator-form") as HTMLFormElement;
const inputEl = document.getElementById("calculator-input") as HTMLInputElement;

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

formEl.addEventListener("submit", (event) => event.preventDefault());
formEl.addEventListener("keydown", (event) => event.preventDefault());

let isDone = false;

formEl.addEventListener("click", (ev) => {
  const event = ev as PointerEvent;
  const keyBtn = event.target as HTMLButtonElement;

  const key = getKeyValue(keyBtn);
  const value = getInputValue();
  const lastDigit = getLastValueDigit(value);

  if (shouldPreventWriting(key, value)) return;

  if (
    hasText(value) ||
    hasLeadingZero(value) ||
    isMathSymbol(value[0]) ||
    isDone
  ) {
    isDone = false;
    return setInputValue(key);
  }

  if (!isInteger(lastDigit) && isMathSymbol(key)) {
    return updateLastInputDigit(key);
  }

  if (key === CALCULATOR_KEYS.Backspace) return updateLastInputDigit("");

  if (key === CALCULATOR_KEYS.Enter && isOperation(value)) {
    const result = calculate(value, 4);
    isDone = true;
    return setInputValue(result);
  }

  return setInputValue(`${value}${key}`);
});

let currentTheme = Number(
  localStorage.getItem("CALCULATOR_THEME") || THEMES[0]
);
appEl.setAttribute("data-theme", String(currentTheme));
toggleBtnEl.addEventListener("click", () => {
  currentTheme += 1;
  if (currentTheme > 3) currentTheme = 1;
  appEl.setAttribute("data-theme", String(currentTheme));
  localStorage.setItem("CALCULATOR_THEME", String(currentTheme));
});
