let display_num = '';
let current_operation = null;
let accumulator = null;
let show_accumulator = false;

function updateDisplay() {
    document.querySelector('#number_display').textContent = display_num;
}

function processInput(char) {
    if (!validateInput()) return;
    if (char === 'clear') return clearAll();
    if ('1234567890'.includes(char)) return appendDigit(char);
    if (char === 'backspace') return backspace();
    if (char === 'equals') {
        operate();
        display_num = accumulator;
        clearAccumulatorAndOperations();
    }

    addOperator(char);

    if (show_accumulator) {
        display_num = accumulator;
    }
}

function clearDisplay() {
    display_num = '';
}

function clearAccumulatorAndOperations() {
    current_operation = null;
    accumulator = null;
    show_accumulator = false;
}

function clearAll() {
    clearDisplay();
    clearAccumulatorAndOperations();
}

function validateInput(input) {
    if (input === 'decimal' && display_num.includes('.')) return false;
    return true;
}

function backspace() {
    display_num = display_num.slice(0, -1);
}

function appendDigit(digit) {
    if (digit === '0' && display_num == 0) return;
    if (display_num.length > 20) return;
    if (show_accumulator) {
        clearDisplay();
        show_accumulator = false;
    }

    display_num += digit;
}

function addOperator(operator) {
    if (operator === 'add') {
        current_operation = 'add';
        show_accumulator = true;
    }
    operate();
}

function operate() {
    if (current_operation === 'add') {
        accumulator = accumulator ?? 0;
        accumulator += parseFloat(display_num);
    }
}


buttons = document.querySelectorAll('button')
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', () => {
        processInput(buttons[i].id);
        updateDisplay();
    })
}