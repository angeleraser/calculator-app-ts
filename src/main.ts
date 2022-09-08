import {
  CALCULATOR_KEYS,
  INVALID_INPUT_MSG,
  THEMES,
  MATH_ERROR_MSG,
} from "./js/constants";
import {
  isValidDigit,
  isInteger,
  calculate,
  hasValidInput,
  isInfinity,
  hasLeadingZero,
} from "./js/utils";
import "./styles/index.css";

const toggleBtnEl = document.getElementById(
  "toggle-button"
) as HTMLButtonElement;
const appEl = document.getElementById("app") as HTMLDivElement;
const formEl = document.getElementById("calculator-form") as HTMLFormElement;
const inputEl = document.getElementById("calculator-input") as HTMLInputElement;
const keypressSound = document.getElementById(
  "keypress-sound"
) as HTMLAudioElement;

const calculator = {
  theme: Number(localStorage.getItem("CALCULATOR_THEME") || THEMES[0]),
  isInvalid: false,
  hasInfinityResult: false,
};

// Input helpers
const updateLastInputDigit = (value: string) => {
  const val = getInputVal();
  setInputVal(`${val.substring(0, val.length - 1)}${value}`);
};

const deleteInputDigit = (caretPosition: number) => {
  const val = getInputVal();

  if (caretPosition === 0 || caretPosition === val.length) {
    setInputCaretPosition(val.length);
    return updateLastInputDigit("");
  }

  const index = caretPosition - 1;
  const digits = val.split("");
  delete digits[index];

  setInputVal(digits.join(""));
  setInputCaretPosition(index);
};

const getInputVal = () => inputEl.value || "";

const getInputCaretPosition = () => inputEl.selectionEnd || 0;

const setInputVal = (value: string) => (inputEl.value = value);

const setInputCaretPosition = (index: number) => {
  inputEl.focus();
  inputEl.setSelectionRange(index, index);
};

// Calculator helpers
const showInvalidInputMsg = () => {
  calculator.isInvalid = true;
  setInputVal(INVALID_INPUT_MSG);
};

const resetCalculator = () => {
  calculator.isInvalid = false;
  calculator.hasInfinityResult = false;
  setInputVal("");
};

const calculatorHasError = () => {
  return calculator.isInvalid || calculator.hasInfinityResult;
};

const setOperationResult = (value: string) => {
  const result = calculate(value);

  calculator.hasInfinityResult = isInfinity(result);
  calculator.isInvalid = result === MATH_ERROR_MSG;

  return setInputVal(result);
};

const getEventKey = (e: PointerEvent | KeyboardEvent) => {
  const eventType = getEventType(e);

  if (eventType === "click") {
    return (e.target as HTMLButtonElement).dataset.key || "";
  }

  return (e as KeyboardEvent).key;
};

const getEventType = (event: PointerEvent | KeyboardEvent) => {
  return event.type as "keydown" | "click";
};

const playKeypressSound = () => {
  keypressSound.currentTime = 0;
  keypressSound.play();
};

// Event handlers
const handleToggleTheme = () => {
  calculator.theme += 1;
  if (calculator.theme > 3) calculator.theme = 1;
  appEl.setAttribute("data-theme", String(calculator.theme));
  localStorage.setItem("CALCULATOR_THEME", String(calculator.theme));
};

const handleKeyPressEvent = (event: PointerEvent | KeyboardEvent) => {
  const key = getEventKey(event);
  const value = getInputVal();
  const target = event.target as HTMLElement;
  const type = getEventType(event);

  if (type === "click") inputEl.focus();

  if (type === "keydown" && key.includes("Arrow")) return;

  if (target.tagName === "BUTTON" && type === "click") playKeypressSound();

  if (key === CALCULATOR_KEYS.Reset || calculatorHasError()) {
    return resetCalculator();
  }

  if (key === CALCULATOR_KEYS.Backspace) {
    event.preventDefault();
    return deleteInputDigit(getInputCaretPosition());
  }

  if (key === CALCULATOR_KEYS.Enter) return setOperationResult(value);

  if ((!value && !isInteger(key)) || !isValidDigit(key)) {
    return event.preventDefault();
  }

  if (hasLeadingZero(value)) {
    event.preventDefault();
    return isInteger(key) && setInputVal(key);
  }

  if (type === "click") setInputVal(`${value}${key}`);
};

const handleInputPaste = (event: Event) => {
  const { inputType } = event as InputEvent;
  if (inputType !== "insertFromPaste") return;
  if (!hasValidInput(getInputVal())) showInvalidInputMsg();
};

// Event Listeners
formEl.addEventListener("click", (e) => handleKeyPressEvent(e as PointerEvent));
formEl.addEventListener("keydown", handleKeyPressEvent);
inputEl.addEventListener("input", handleInputPaste);
formEl.addEventListener("keyup", playKeypressSound);
formEl.addEventListener("submit", (event) => event.preventDefault());

toggleBtnEl.addEventListener("click", handleToggleTheme);
appEl.setAttribute("data-theme", String(calculator.theme));
