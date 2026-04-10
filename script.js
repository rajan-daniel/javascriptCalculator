const calc = document.getElementById("calculator");
const display = document.getElementById("display");
const history = document.getElementById("history");

let result = "";
let initialState = 0;
let lastButtonPressed = "";

const buttons = [
    { id: "equals", symbol: "=" },
    { id: "zero", symbol: "0" },
    { id: "one", symbol: "1" },
    { id: "two", symbol: "2" },
    { id: "three", symbol: "3" },
    { id: "four", symbol: "4" },
    { id: "five", symbol: "5" },
    { id: "six", symbol: "6" },
    { id: "seven", symbol: "7" },
    { id: "eight", symbol: "8" },
    { id: "nine", symbol: "9" },
    { id: "add", symbol: "+" },
    { id: "subtract", symbol: "-" },
    { id: "multiply", symbol: "*" },
    { id: "divide", symbol: "/" },
    { id: "decimal", symbol: "." },
    { id: "clear", symbol: "C" }
];

const drawButtons = () => {
    buttons.forEach((button) => {
        const btn = document.createElement("button");
        btn.id = button.id;
        btn.textContent = button.symbol;
        btn.addEventListener("click", () => handleButtonPress(button.symbol));
        calc.appendChild(btn);
    })
}

const convertResultToArray = () => {
    const charHolder = []
    for (const char of result) {
        charHolder.push(char);
    }
    return charHolder;
}

const removeConsecutiveSymbols = () => {
    const inputArr = convertResultToArray();
    const operator = ["+", "-", "*", "/"];
    let outputArr = [];

    for (let i = 0; i < inputArr.length; i++) {
        if (operator.includes(inputArr[i])) {
            // if prev is a symbol
            if (operator.includes(outputArr[outputArr.length - 1])) {
                outputArr[outputArr.length - 1] = inputArr[i];
            } else {
                // when it catches first symbol
                outputArr.push(inputArr[i]);
            }
        } else {
            // if its a num
            outputArr.push(inputArr[i]);
        }
    }
    result = outputArr.join("");
}

const removeConsecutiveDecimals = () => {
    const inputArr = convertResultToArray();
    const operator = ["."];
    let outputArr = [];

    for (let i = 0; i < inputArr.length; i++) {
        if (operator.includes(inputArr[i])) {
            if (operator.includes(outputArr[outputArr.length - 1])) {
                outputArr[outputArr.length - 1] = inputArr[i];
            } else {

                outputArr.push(inputArr[i]);
            }
        } else {
            outputArr.push(inputArr[i]);
        }
        result = outputArr.join("");
    }
}

const handleButtonPress = (symbol) => {
    if (result.startsWith(0)) {
        result = ""
        lastButtonPressed = symbol;
    }
    if (symbol === "C") {
        result = `${initialState}`;
        lastButtonPressed = symbol;
    } else if (symbol === "=") {
        removeConsecutiveSymbols();
        removeConsecutiveDecimals();
        history.textContent = result;
        result = eval(result).toString();
        lastButtonPressed = symbol;
    } else if (symbol === ".") {
        if (lastButtonPressed === ".") {
            null;
        } else {
            result += symbol;
            lastButtonPressed = symbol;
        }
    } else {
        result += symbol;
        lastButtonPressed = symbol;
    }
    display.textContent = result;
    console.log(lastButtonPressed);
};

drawButtons();