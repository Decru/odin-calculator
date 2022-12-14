let display_num = '';
let current_operation = null;
let accumulator = null;
let show_accumulator = false;
let error_state = false;
let error_message = 'ERROR!!!! DIVIDED BY 0'

function updateDisplay() {
    let display = document.querySelector('#number_display');
    if (error_state) display.textContent = error_message;
    else display.textContent = display_num;
}

function raiseErrorState() {
    error_state = true;
}

function processInput(char) {
    if (char === 'clear') return clearAll();
    if (error_state || !validateInput(char)) return;
    if ('1234567890.'.includes(char)) return appendDigit(char);
    if (char === 'backspace') return backspace();
    if (char === 'equals') {
        operate();
        show_accumulator = true;
        displayAccumulator();
        clearAccumulatorAndOperations();
        return;
    }

    addOperator(char);

    if (show_accumulator) {
        displayAccumulator();
    }
}

function displayAccumulator() {
    display_num = (Math.round(accumulator * 10**9) /10**9).toString();
}

function clearDisplay() {
    display_num = '';
}

function clearAccumulatorAndOperations() {
    current_operation = null;
    accumulator = null;
}

function clearAll() {
    clearDisplay();
    clearAccumulatorAndOperations();
    show_accumulator = false;
    error_state = false;
}

function validateInput(input) {
    const operations = ['add', 'multiply', 'divide', 'subtract'];
    if (input === '.' && display_num.includes('.') && !show_accumulator) return false;
    return !(operations.includes(input) && display_num === '');
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
    operate();
    current_operation = operator;
    show_accumulator = true;
}

function operate() {
    const current_display_number = parseFloat(display_num);
    if (accumulator === null) return accumulator = current_display_number;

    if (current_operation === 'add') accumulator += current_display_number;
    if (current_operation === 'subtract') accumulator -= current_display_number;
    if (current_operation === 'multiply') accumulator *= current_display_number;
    if (current_operation === 'divide' && current_display_number === 0) {
        raiseErrorState();
        return;
    }
    if (current_operation === 'divide') accumulator /= current_display_number;
}

buttons = document.querySelectorAll('button')
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', () => {
        processInput(buttons[i].id);
        updateDisplay();
    })
}