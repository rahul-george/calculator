let acc = 0;
let operand = "";
let operator = "+";
let history = [];

let resultClickedFlag = false;

function updateHistory(text) {
  history.push(text);
}

function clearHistory() {
  history = [];
}

function debugPrint(label) {
  console.group(label);
  console.log({ acc });
  console.log({ operand });
  console.log({ operator });
  console.log({ history });
  console.groupEnd();
}

function operate(operandOne, operandTwo, operator) {
  debugPrint("Start of operate method");
  let a = parseInt(operandOne);
  let b = parseInt(operandTwo);
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      if (!b) {
        alert("Cannot perform division by 0");
        return "";
      }
      return a / b; // error checking division by Zero
    case "%":
      if (!b) {
        alert("Cannot perform division by 0");
        return "";
      }
      return a % b; // error checking division by Zero
    default:
      console.error(`Invalid operator ${operator}`);
      break;
  }
}

function displayOperand(operand) {
  currentInputDisplay.textContent = operand;
}

function displayHistory(text) {
  if (text) updateHistory(text);
  historyDisplay.textContent = history.join("");
}

function operatorClicked(e) {
  if (resultClickedFlag) {
    // If last operation was to evaluate result.
    // User wants to chain operations
    // So, copy over the accumulator and store the operator.
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
    // If last operation was to evaluate result.
    // This operation should be a new evaluation
    // So, reset operator, operand and accumulator
    acc = 0;
    operator = "+";
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
  if (resultClickedFlag) {
    displayHistory(operator);
  }
  displayHistory(operand);
  acc = operate(acc, operand, operator);
  displayOperand(acc);
  resultClickedFlag = true;
}

function clearClicked(e) {
  acc = 0;
  operator = "+";
  operand = "";
  clearHistory();
  resultClickedFlag = false;
  displayOperand(operand);
  displayHistory();
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

const clearButton = document.querySelector(".clear");
clearButton.addEventListener("click", clearClicked);
