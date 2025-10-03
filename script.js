let acc = 0;
let operand = "";
let operator = "add";
let history = [];

let resultClickedFlag = false;

function updateHistory(text) {
  history.push(text);
}

function clearHistory() {
  history = [];
}

function operate(operandOne, operandTwo, operator) {
  let a = parseInt(operandOne);
  let b = parseInt(operandTwo);
  switch (operator) {
    case "add":
      return a + b;
    case "subtract":
      return a - b;
    case "multiply":
      return a * b;
    case "division":
      return a / b; // error checking division by Zero
    case "modulo":
      return a % b; // error checking division by Zero
    default:
      break;
  }
}

function displayOperand(operand) {
  currentInputDisplay.textContent = operand;
}

function displayHistory(text) {
  updateHistory(text);
  historyDisplay.textContent = history.join("");
}

function operatorClicked(e) {
  if (resultClickedFlag) {
    operand = "";
    operator = e.target.dataset.value;
    clearHistory();
    displayHistory(acc);
    displayHistory(e.target.textContent);
    resultClickedFlag = false;
  }
  if (operand === "") return;
  // When an operator is clicked, evaluate result
  acc = operate(acc, operand, operator); // Update accumulator
  operator = e.target.dataset.value;
  displayHistory(operand);
  displayHistory(e.target.textContent);
  displayOperand(acc);
  operand = "";
}

function operandClicked(e) {
  if (resultClickedFlag) {
    acc = 0;
    operand = "";
    clearHistory();
    resultClickedFlag = false;
  }
  operand += e.target.dataset.value;
  displayOperand(operand);
}

function resultClicked(e) {
  if (acc === "") return;
  if (operator === "") return;
  if (operand === "") return;
  displayHistory(operand);
  acc = operate(acc, operand, operator);
  displayOperand(acc);
  operand = "";
  operator = "add";
  resultClickedFlag = true;
}

// current input display
const currentInputDisplay = document.querySelector(".current_input");
const historyDisplay = document.querySelector(".history");

// All the data buttons
const operandButtons = Array.from(document.querySelectorAll(".operand"));
operandButtons.forEach((button) =>
  button.addEventListener("click", operandClicked)
);

const operatorButtons = Array.from(document.querySelectorAll(".operator"));
operatorButtons.forEach((button) =>
  button.addEventListener("click", operatorClicked)
);

const resultButton = document.querySelector(".result");
resultButton.addEventListener("click", resultClicked);
