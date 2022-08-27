import { CALCULATOR_KEYS, THEMES } from "./js/constants";
import {
  getKeyValue,
  hasLeadingZero,
  isValidDigit,
  endsWithComma,
  isMathSymbol,
  endsWithMathSymbol,
  isInteger,
  shouldPreventCommaKey,
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

formEl.addEventListener("click", (event) => {
  const key = getKeyValue(event.target as HTMLButtonElement);
  const value = getInputValue();

  if (key === CALCULATOR_KEYS.Backspace) return updateLastInputDigit("");

  if (key === CALCULATOR_KEYS.Enter) return; // calculate()

  if (key === CALCULATOR_KEYS.Reset) return; // resetOperation()

  if (hasLeadingZero(value)) return setInputValue(key);

  if (
    isMathSymbol(key) &&
    (endsWithComma(value) || endsWithMathSymbol(value))
  ) {
    return updateLastInputDigit(key);
  }

  if (shouldPreventCommaKey(value, key)) return setInputValue(value);

  return setInputValue(`${value}${key}`);
});

formEl.addEventListener("keydown", (e) => {
  const event = e;
  const { key } = event;
  const value = getInputValue();

  if (!value && !isInteger(key)) return event.preventDefault();

  if (key === CALCULATOR_KEYS.Backspace) return; // delete;

  if (key === CALCULATOR_KEYS.Enter) return; // calculate()

  if (key === CALCULATOR_KEYS.Reset) return; // resetOperation()

  if (!isValidDigit(key)) return event.preventDefault();

  if (hasLeadingZero(value)) {
    event.preventDefault();
    return setInputValue(key);
  }

  if (
    isMathSymbol(key) &&
    (endsWithComma(value) || endsWithMathSymbol(value))
  ) {
    event.preventDefault();
    return updateLastInputDigit(key);
  }

  if (shouldPreventCommaKey(value, key)) {
    event.preventDefault();
    return setInputValue(value);
  }
});

let currentTheme = Number(
  localStorage.getItem("CALCULATOR_THEME") || THEMES[0]
);

toggleBtnEl.addEventListener("click", () => {
  currentTheme += 1;
  if (currentTheme > 3) currentTheme = 1;
  appEl.setAttribute("data-theme", String(currentTheme));
  localStorage.setItem("CALCULATOR_THEME", String(currentTheme));
});

formEl.addEventListener("submit", (event) => event.preventDefault());
appEl.setAttribute("data-theme", String(currentTheme));
