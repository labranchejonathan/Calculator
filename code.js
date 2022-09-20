class Calculator {
  //we create a class in order to store all the information from the current operand in order to reflect them in the previous operand part
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    //function to clear our calculator display
    this.previousOperand = "";
    this.currentOperand = "";

    this.operation = undefined;
  }

  delete() {
    //function to delete elements in our display
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    //function that allows to display when we click on a button
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    //function that choose the operation when we click on the operation button
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    //function that will take the values that we have and compute them so we can obtain the result
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "/":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    // const floatNumber = parseFloat(number);
    // if (isNaN(floatNumber)) return "";
    // return floatNumber.toLocaleString("en");

    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    //update our display

    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = "";
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equal]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

numberButtons.forEach((buttton) => {
  buttton.addEventListener("click", () => {
    calculator.appendNumber(buttton.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((buttton) => {
  buttton.addEventListener("click", () => {
    calculator.chooseOperation(buttton.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", (buttton) => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener("click", (buttton) => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", (buttton) => {
  calculator.delete();
  calculator.updateDisplay();
});
