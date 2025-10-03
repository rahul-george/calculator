/* All buttons */

let operandOne = "";
let operandTwo = "";
let operand = ""; // store the number input from the user temporarily

function displayOperand(operand) {
  currentInputDisplay.textContent = operand;
}

function operandClicked(e) {
  operand += e.target.dataset.value;
  displayOperand(operand);
}

// current input display
const currentInputDisplay = document.querySelector(".current_input");

// All the data buttons
const operandButtons = Array.from(document.querySelectorAll(".operand"));
operandButtons.forEach((button) =>
  button.addEventListener("click", operandClicked)
);

console.log({ operandButtons });
