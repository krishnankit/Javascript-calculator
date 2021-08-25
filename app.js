// ALL VARIABLES DECLARATIONS
let previousOperand = '';
let currentOperand = '';
let operator = undefined;
const numberList = document.querySelectorAll(".data-number");
const operatorList = document.querySelectorAll(".data-operation");
const equalsButton = document.querySelector(".data-equals");
const clearButton = document.querySelector(".data-all-clear");
const deleteButton = document.querySelector(".data-delete");
const preOperand = document.querySelector(".previous-operand");
const currOperand = document.querySelector(".current-operand");

// FUNCTION TO TAKE INPUT OPERAND
function appendOperand(number){
  if (number === '.' && currentOperand.includes('.')) return;
  currentOperand = currentOperand.toString() + number.toString();
}

// FUNCTION TO TAKE INPUT OPERATOR AND SET OPERATION
function setOperator(op){
  if (currentOperand === '') return;
  if (previousOperand != '') calculate();
  operator = op;
  previousOperand = currentOperand;
  currentOperand = '';
}

// FUNCTION TO ADD COMMAS IN THE OPERAND
function format(number){
  const strNum = number.toString();
  const integers = parseFloat(strNum.split('.')[0]);
  const decimals = strNum.split('.')[1];
  let intDisplay;
  if (isNaN(integers)){
    intDisplay = '';
  } 
  else {
    intDisplay = integers.toLocaleString('en', {maximumFractionDigits: 0})
  }
  if (decimals != null){
    return `${intDisplay}.${decimals}`;
  }
  else {
    return intDisplay;
  }
}

// FUNCTION TO DISPLAY OPERAND, OPERATOR AND RESULT
function display(){
  currOperand.innerHTML = format(currentOperand);
  if (operator != null){
    preOperand.innerHTML = `${format(previousOperand)} ${operator}`;
  }
  else {
    preOperand.innerHTML = '';
  }
}

// FUNCTION TO CLEAR THE DISPLAY
function clearDisplay(){
  currentOperand = '';
  previousOperand = '';
  operator = undefined;
  display();
}

// FUNCTION TO DELETE THE LAST ENTERED DIGIT
function deleteLast(){
  currentOperand = (currentOperand.toString()).slice(0, -1);
  display();
}

// ACTUAL FUNCTION TO PERFROM CALCULATION
function calculate(){
  let opp = parseFloat(previousOperand);
  let opc = parseFloat(currentOperand);
  if (isNaN(opp) || isNaN(opc)) return;
  switch(operator){
    case '+': 
      currentOperand = (opp + opc).toString();
      break;
    case 'x':
      currentOperand = (opp * opc).toString();
      break;
    case '-':
      currentOperand = (opp - opc).toString();
      break;
    case '÷':
      currentOperand = (opp / opc).toString();
  }
  previousOperand = '';
  operator = undefined;
}

// ADDING EVENT LISTENERS TO BUTTONS
numberList.forEach(number => number.addEventListener("click", function(){
  appendOperand(this.innerHTML);
  display();
}));
operatorList.forEach(op => op.addEventListener("click", function(){
  setOperator(this.innerHTML);
  display();
}));
equalsButton.addEventListener("click", function(){
  calculate();
  display();
});
clearButton.addEventListener("click", clearDisplay);
deleteButton.addEventListener("click", deleteLast);