const wrapper = document.createElement('div');
wrapper.id = 'wrapper';

const outputWrapper = document.createElement('div');
outputWrapper.id = 'output-wrapper';

const historyWrapper = document.createElement('ul');
historyWrapper.id = 'output-history';

const output = document.createElement('p');
output.id = 'output';

outputWrapper.append(historyWrapper, output);

wrapper.append(outputWrapper);

document.body.append(wrapper);

const types = {
    number: 'NUMBER',
    operator: "OPERATOR"
}

const operatorTypes = {
    CLEAR: 'C',
    ADD: '+',
    SUBSTRACT: '-',
    MULTIPLY: '*',
    DIVIDE: '/',
    EQUALS: '=',
    DOT: '.',
}

const generateOption = (value, type) => {
    return { value, type }
}

const numbers = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0].map((value) => generateOption(value, types.number));
const operators = Object.values(operatorTypes).map((value) => generateOption(value, types.operator));

const state = {
    firstNumber: null,
    secondNumber: null,
    operator: null,
    result: null,
};
const previousResults = [];


const onClickNumber = (event) => {
    const value = parseFloat(event.target.innerText);

    if (!state.operator) {
        state.firstNumber = state.firstNumber ? parseFloat(`${state.firstNumber}${value}`) : value;
        output.innerText = state.firstNumber;
    } else {
        state.secondNumber = state.secondNumber ? parseFloat(`${state.secondNumber}${value}`) : value;
        output.innerText = `${state.firstNumber} ${state.operator} ${state.secondNumber}`
    }

}

const onClickOperator = (event) => {
    if (!state.firstNumber || state.operator) {
        return;
    }
    state.operator = event.target.innerText;
    output.innerText = `${output.innerText} ${state.operator}`
}

const clearState = () => {
    state.firstNumber = null;
    state.operator = null;
    state.secondNumber = null;
    state.result = null;
}

const onClickClear = () => {
    clearState();
    historyWrapper.replaceChildren()
    output.replaceChildren()
}

const onClickEquals = () => {
    console.log(1, state)

    if (typeof state.firstNumber !== 'number' || typeof state.secondNumber !== 'number' || !state.operator) {
        return;
    }
    console.log(2)
    switch (state.operator) {
        case operatorTypes.ADD:
            state.result = state.firstNumber + state.secondNumber;
            break;
        case operatorTypes.CLEAR:
            state.firstNumber = null;
            state.secondNumber = null;
            state.result = null;
            break;
        case operatorTypes.SUBSTRACT:
            state.result = state.firstNumber - state.secondNumber;
            break;
        case operatorTypes.MULTIPLY:
            state.result = state.firstNumber * state.secondNumber;
            break;
        case operatorTypes.DIVIDE:
            console.log(3)
            if (state.secondNumber !== 0) {
                state.result = state.firstNumber / state.secondNumber;
            } else {
                console.log(4)
                clearState();
                output.innerText = 'You cannot divide with 0!'
                return;
            }

            break;
    }
    previousResults.push(state.result);

    const li = document.createElement('li');
    li.innerText = `${output.innerText} = ${state.result}`;
    output.innerText = state.result;
    historyWrapper.append(li);

    state.operator = null;
    state.firstNumber = state.result;
    state.secondNumber = null;
    state.result = null;
}

const numbersWrapper = document.createElement('div');
numbersWrapper.id = 'numbers-wrapper';
numbers.forEach((number) => {
    const button = document.createElement('button');
    button.innerText = number.value;
    button.onclick = onClickNumber;
    if (number.value === 0) {
        button.classList.add('zero');
    }
    numbersWrapper.append(button);
})

const operatorsWrapper = document.createElement('div');
operatorsWrapper.id = 'operators-wrapper';
operators.forEach((operator) => {
    const button = document.createElement('button');
    button.innerText = operator.value;

    switch (operator.value) {
        case operatorTypes.EQUALS:
            button.onclick = onClickEquals;
            break;
        case operatorTypes.CLEAR:
            button.onclick = onClickClear;
            break;
        default:
            button.onclick = onClickOperator;
            break;
    }

    operatorsWrapper.append(button);
})
const buttonsWrapper = document.createElement('div');
buttonsWrapper.id = 'buttons-wrapper';

buttonsWrapper.append(numbersWrapper, operatorsWrapper)
wrapper.append(buttonsWrapper)

    // 1
    // +
    // 2
    // =
    // 3
