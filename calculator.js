const savedCalculation = document.querySelector('#saved-calculation');
const currentCalculation = document.querySelector('#current-calculation');
let savedValue = '';
let currentOperator = '';
let bottomDisplay = ''
let operatorExists = false;
let alreadyCalculated = false;
let memorizedOperator = '';             //variables to be usd when chaining the same operation
let memorizedValue = '';            
const numberButtons = document.querySelectorAll('.number-button');
    numberButtons.forEach((numberButton) => {
        numberButton.addEventListener('click', () => {
            if (bottomDisplay === '...' || alreadyCalculated == true){
                clearAll();
                alreadyCalculated = false;
            }
            if(bottomDisplay.length <= 20){
                bottomDisplay += numberButton.textContent;
            }
            updateDisplay();
        });
    });         //updates display when number is clicked, if calculation tooks place clears display first
const dotButton = document.querySelector('#dot-button');
    dotButton.addEventListener('click', () => {
        if (bottomDisplay === '...' || alreadyCalculated == true){
            clearAll();
            alreadyCalculated = false;
        }
        if(!bottomDisplay.includes('.')){
            if(bottomDisplay === ''){
                bottomDisplay += '0';
            }
            bottomDisplay += dotButton.textContent;
            updateDisplay();
        }
    });     //updates display when dot is clicked, if calculation tooks place clears display first
            //prevents more than one dot to be clicked and ads '0' at the start if dot is first on the display

const allClear = document.querySelector('#all-clear');
    allClear.addEventListener('click', clearAll)

const clearLast = document.querySelector('#clear-last');
    clearLast.addEventListener('click', () =>{
        bottomDisplay = bottomDisplay.slice(0, -1);
        updateDisplay();
    });                 //removes last character from bottom display when clicked

const operators = document.querySelectorAll('.operator');
    operators.forEach((operator) => {
        operator.addEventListener('click', () =>{
            alreadyCalculated = false;
            if(!operatorExists){
                if(bottomDisplay.toString().charAt(bottomDisplay.length - 1) === '.'){
                    bottomDisplay += '0';
                }   //if last character of bottom display is dot adds 0 at the end of a string
                operatorExists = true;
                currentOperator = operator.textContent;
                savedValue = bottomDisplay;
                bottomDisplay = ''
                updateDisplay();
            } else if(savedValue != '' && bottomDisplay != ''){
                calculate();
                if(bottomDisplay === '...'){
                    currentOperator = '';
                } else{
                    currentOperator = operator.textContent;
                }
                updateDisplay();
            }
        });
    });         //if there's no operator in memory updates display, if operator exists calculates

const equalSign = document.querySelector('#equal-sign');
    equalSign.addEventListener('click', () =>{
        if(savedValue !== ''){
            if(bottomDisplay === ''){
                bottomDisplay = savedValue;
                savedValue = '' //if clicked when bottom is empty, but number exists in top display displays the number from the top display as a result
            } else{
                memorizedOperator = currentOperator;
                memorizedValue = bottomDisplay;
                calculate();
                if(bottomDisplay !== '...'){
                    bottomDisplay = savedValue;
                    savedValue = ''
                    }
            }   //calculates and memorizes previously used values
            } else if(memorizedValue !== '' && memorizedOperator !== ''){
                savedValue = bottomDisplay;
                bottomDisplay = memorizedValue;
                currentOperator = memorizedOperator;
                calculate();
                bottomDisplay = savedValue;
                savedValue = ''
            }       //chaining the same operation when clicking '=' continously
            currentOperator = '';
            operatorExists = false;
            alreadyCalculated = true;
            updateDisplay();
    }); 

function calculate() {
    switch(currentOperator) {
        case '+':
            savedValue = parseFloat(savedValue) + parseFloat(bottomDisplay);
            bottomDisplay = ''
            break;
        case '-':
            savedValue = parseFloat(savedValue) - parseFloat(bottomDisplay);
            bottomDisplay = ''
            break;
        case '*':
            savedValue = parseFloat(savedValue) * parseFloat(bottomDisplay);
            bottomDisplay = ''
            break;
        case '/':
            switch(bottomDisplay){
                case '0':
                    savedValue = '';
                    bottomDisplay ='...';
                    break;  //if user tries to divide by 0 displays the message
                default:
                    savedValue = Math.round(parseFloat(savedValue) / parseFloat(bottomDisplay) * 10000) / 10000;
                    bottomDisplay = ''
                    break;
            }
            break;
        case '%':
            savedValue = parseFloat(savedValue) * parseFloat(bottomDisplay) * 0.01;
            bottomDisplay = ''
            break;
    }
}

function updateDisplay() {
    currentCalculation.textContent = bottomDisplay;
    savedCalculation.textContent = `${savedValue} ${currentOperator}`;  //updates bottom and top display
}

function clearAll() {
    bottomDisplay = '';
    savedValue = '';
    currentOperator = '';
    operatorExists = false;
    alreadyCalculated = false;
    memorizedOperator = '';
    memorizedValue = '';
    updateDisplay();    //resets every value used
}
