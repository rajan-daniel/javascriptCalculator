const calc = document.getElementById("calculator");
const display = document.getElementById("display");
const history = document.getElementById("history");

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

const handleButtonPress = (symbol) => {
    const currentDisplay = display.textContent.split("");
    const lastChar = currentDisplay[currentDisplay.length - 1];
    console.log(`Last Character is: ${lastChar}`);
    //console.log(currentDisplay);

    //----------------HANDLES INITIAL BUTTON PRESS TO CLEAR DISPLAY------------------------//
    if (lastChar == 0 && currentDisplay.length == 1 && (symbol != "=" && symbol != "C")) {
        console.log("stars zero");
        display.textContent = "";
        display.textContent += symbol;
        return;
        //---------------------------------------------------------------//

        //----------------HANDLES CLEAR AND EQUAL------------------------//
    } else if (symbol == "C") {
        history.textContent = "0";
        display.textContent = "0";
    } else if (symbol == "=") {
        history.textContent = display.textContent;
        display.textContent = eval(display.textContent);
        return;
        //---------------------------------------------------------------//


        //----------------HANDLES "-" EDGE CASES------------------------//    
    } else if (symbol == "-") {
        if (lastChar == "-") {
            currentDisplay[(currentDisplay.length - 1)] = symbol;
            display.textContent = currentDisplay.join("");
            return;
        } else if (lastChar == "+" || lastChar == "*" || lastChar == "/") {
            display.textContent += symbol;
            return;
        } else {
            display.textContent += symbol;
            return;
        }
    } else if (lastChar == "-") {
        if (symbol == "+" || symbol == "-" || symbol == "*" || symbol == "/") {
            currentDisplay.pop()
            currentDisplay[(currentDisplay.length - 1)] = symbol;
            display.textContent = currentDisplay.join("");
            return;
        } else {
            display.textContent += symbol;
            return;
        }
        //---------------------------------------------------------------//

        //----------------HANDLES OPERATORS------------------------//
    } else if (symbol == "+" || symbol == "-" || symbol == "*" || symbol == "/") {
        if (lastChar == "+" || lastChar == "-" || lastChar == "*" || lastChar == "/") {
            currentDisplay[(currentDisplay.length - 1)] = symbol;
            display.textContent = currentDisplay.join("");
            return;
        } else {
            display.textContent += symbol;
            return;
        }
    }
    //---------------------------------------------------------------//
    //----------------HANDLES DOT OPERATOR-----------------------------//
    else if (symbol == ".") {
        const currentDisplay = display.textContent.split(/[\+\-\*\/]/);
        if (!currentDisplay[currentDisplay.length - 1].includes(".")) {
            display.textContent += symbol;
        } else {
            return;
        }
        //---------------------------------------------------------------//
        //----------------HANDLES INPUTTING NUMBERS------------------------//
    } else {
        display.textContent += symbol;
        return;
    }
    //---------------------------------------------------------------//
};

drawButtons();

window.onload = function () {
    history.textContent = "0";
    display.textContent = "0";
};