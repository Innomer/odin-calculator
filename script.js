var textInputArea = document.querySelector('#userInputArea');
var ans = 0;
var prevOperation = 0;
var firstOperand = 0;
var haveFirst = false;
var haveSecond = false;
var secondOperand = 0;

function evalAns(f, o, s) {
    switch (o) {
        case '+':
            return Math.round(f + s);
            break;
        case '-':
            return Math.round(f - s);
            break;
        case '/':
            if (s != 0)
                return Math.round(f / s);
             else
                return "Cannot divide by 0";
            break;
        case '*':
            return Math.round(f * s);
            break;
        default:

    }
}


function changeResult(clickedBut) {
    ans = Number(textInputArea.innerText);
    var val = clickedBut.innerText;
    if (val != 'Clear' && val != 'Delete') {
        if (!isNaN(val)) {
            if (!haveFirst) {
                firstOperand = firstOperand * 10 + Number(val);
                textInputArea.innerText = `${firstOperand}`;
            }
            else {
                secondOperand = secondOperand * 10 + Number(val);
                textInputArea.innerText = `${firstOperand} ${prevOperation} ${secondOperand}`;
                haveSecond = true;
            }
        }
        else if (val != '.' && val != '=') {
            if (!haveSecond) {
                haveFirst = true;
                switch (val) {
                    case '+':
                        prevOperation = '+';
                        textInputArea.innerText = `${firstOperand} ${prevOperation}`;
                        break;
                    case '-':
                        prevOperation = '-';
                        textInputArea.innerText = `${firstOperand} ${prevOperation}`;
                        break;
                    case '/':
                        prevOperation = '/';
                        textInputArea.innerText = `${firstOperand} ${prevOperation}`;
                        break;
                    case '*':
                        prevOperation = '*';
                        textInputArea.innerText = `${firstOperand} ${prevOperation}`;
                        break;
                    default:
                        textInputArea.innerText = "Not Valid Operation";
                }
            }
            else {
                ans = evalAns(firstOperand, prevOperation, secondOperand);
                textInputArea.innerText = ans;
                firstOperand = ans;
                haveSecond = false;
                prevOperation = val;
            }
        }
        else if (val == '=') {
            ans = evalAns(firstOperand, prevOperation, secondOperand);
            textInputArea.innerText = ans;
            prevOperation = undefined;
            secondOperand = 0;
            haveFirst = false;
            haveSecond = false;
            firstOperand = ans;
        }
    }
    else if (val == 'Clear') {
        firstOperand = 0;
        ans = 0;
        textInputArea.innerText = ans;
        prevOperation = 0;
        secondOperand = 0;
        haveFirst = false;
    }
    else if (val == 'Delete') {
        if (haveSecond) {
            haveSecond = false;
            secondOperand = 0;
            textInputArea.innerText = `${firstOperand} ${prevOperation}`;
        }
        else if (haveFirst) {
            prevOperation = 0;
            textInputArea.innerText = `${firstOperand}`;
            haveFirst = false;
        }
        else {
            firstOperand = 0;
            textInputArea.innerText = `0`;
        }
    }
}