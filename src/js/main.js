"use strict";
var _a;
const billInput = document.querySelector('#billInput');
const peopleInput = document.querySelector('#peopleInput');
let bill = Number(billInput.value);
let numPeople = Number(peopleInput.value);
let tipPercent = 0;
let tipAmount = Number();
billInput === null || billInput === void 0 ? void 0 : billInput.addEventListener('change', billFunc);
function billFunc() {
    setNum(billInput, 2);
    bill = Number(billInput.value);
    tipCalc();
}
peopleInput === null || peopleInput === void 0 ? void 0 : peopleInput.addEventListener('input', peopleFunc);
function peopleFunc() {
    setNum(peopleInput, 0);
    numPeople = Number(peopleInput.value);
    tipCalc();
}
const tipButtons = document.querySelectorAll(".percentButton");
tipButtons[0].classList.add("activeButton");
for (let i of tipButtons) {
    i.addEventListener('click', () => {
        setTip(Number(i.value));
        i.classList.add("activeButton");
    });
}
const customTipButton = (_a = document.querySelector(".customTip")) === null || _a === void 0 ? void 0 : _a.querySelector('input');
customTipButton === null || customTipButton === void 0 ? void 0 : customTipButton.addEventListener('focus', () => {
    setTip(Number(customTipButton.value));
    customTipButton.classList.add("activeButton");
});
customTipButton === null || customTipButton === void 0 ? void 0 : customTipButton.addEventListener('input', () => {
    setTip(Number(customTipButton.value));
    customTipButton.classList.add("activeButton");
    console.log(customTipButton.classList);
});
const customTip = document.querySelector(".customTip");
customTip === null || customTip === void 0 ? void 0 : customTip.addEventListener('focus', tipCheck);
function setTip(tipValue) {
    customTipButton.classList.remove("activeButton");
    tipPercent = tipValue;
    for (let i of tipButtons) {
        i.classList.remove("activeButton");
    }
    tipCalc();
}
function setNum(inputElement, decimalPlace, typeOfInput) {
    const pElement = inputElement.parentElement;
    const errorMessage = pElement === null || pElement === void 0 ? void 0 : pElement.querySelector(".errorMessage");
    if (Number(inputElement.value)) {
        inputElement.value = Number.parseFloat(inputElement.value).toFixed(decimalPlace);
        pElement === null || pElement === void 0 ? void 0 : pElement.classList.add('validInput');
        pElement === null || pElement === void 0 ? void 0 : pElement.classList.remove('invalidInput');
    }
    else {
        pElement === null || pElement === void 0 ? void 0 : pElement.classList.remove('validInput');
        pElement === null || pElement === void 0 ? void 0 : pElement.classList.add('invalidInput');
    }
    if (errorMessage != null) {
        errorMessage.textContent = billCheck(inputElement.value);
    }
}
function tipCheck() {
    if (customTip.value == '') {
        customTip.classList.remove('currentTip');
    }
    else {
        customTip.classList.add('currentTip');
    }
}
function billCheck(input) {
    if (input == '0') {
        return `Can't be zero`;
    }
    else {
        return `Invalid number`;
    }
}
const tipAmountDisplay = document.querySelector('#tipPerPerson');
const total = document.querySelector('#tipTotal');
function tipCalc() {
    let output = bill / numPeople;
    let tipAmount = output * tipPercent * 0.01;
    tipAmountDisplay.textContent = '$' + String(tipAmount.toFixed(2));
    total.textContent = '$' + String((output + tipAmount).toFixed(2));
    if (tipAmountDisplay.textContent == "$NaN" || total.textContent == "$Infinity") {
        tipAmountDisplay.textContent = '$0.00';
    }
    if (total.textContent == "$NaN" || total.textContent == "$Infinity") {
        total.textContent = '$0.00';
    }
}
tipCalc();
const resetButton = document.querySelector('#resetButton');
resetButton.addEventListener('click', reset);
function reset() {
    billInput.value = '';
    peopleInput.value = '';
    customTipButton.value = '';
    tipAmountDisplay.textContent = '$0.00';
    total.textContent = '$0.00';
    tipAmount = 5;
    for (let i of tipButtons) {
        i.classList.remove('activeButton');
        i.addEventListener('click', () => {
            setTip(Number(i.value));
            i.classList.add("activeButton");
        });
    }
    tipButtons[0].classList.add("activeButton");
}
reset();
