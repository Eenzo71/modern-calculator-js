const currentOperandText = document.getElementById('current-operand');
const previousOperandText = document.getElementById('previous-operand');

let currentOperand = '';
let previousOperand = '';
let operation = undefined;

function updateDisplay() {
    currentOperandText.innerText = currentOperand || '0';
    if (operation != null) {
        previousOperandText.innerText = `${previousOperand} ${operation}`;
    } else {
        previousOperandText.innerText = '';
    }
}

function appendNumber(number) {
    if (number === '.' && currentOperand.includes('.')) return;
    
    if (currentOperand.length > 12) return;

    currentOperand = currentOperand.toString() + number.toString();
    updateDisplay();
}

function appendOperator(op) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        calculate();
    }
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '';
    updateDisplay();
}

function calculate() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);

    if (isNaN(prev) || isNaN(current)) return;

    try {
        switch (operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                if (current === 0) {
                    alert("Não é possível dividir por zero!");
                    clearDisplay();
                    return;
                }
                computation = prev / current;
                break;
            default:
                return;
        }
        currentOperand = Math.round(computation * 1000000) / 1000000;
        operation = undefined;
        previousOperand = '';
        updateDisplay();
    } catch (error) {
        currentOperand = 'Erro';
        updateDisplay();
    }
}

function clearDisplay() {
    currentOperand = '';
    previousOperand = '';
    operation = undefined;
    updateDisplay();
}

function deleteNumber() {
    currentOperand = currentOperand.toString().slice(0, -1);
    updateDisplay();
}

document.addEventListener('keydown', (e) => {
    if ((e.key >= 0 && e.key <= 9) || e.key === '.') appendNumber(e.key);
    if (e.key === 'Backspace') deleteNumber();
    if (e.key === 'Escape') clearDisplay();
    if (e.key === '+' || e.key === '-') appendOperator(e.key);
    if (e.key === '*') appendOperator('*');
    if (e.key === '/') appendOperator('/');
    if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        calculate();
    }
});