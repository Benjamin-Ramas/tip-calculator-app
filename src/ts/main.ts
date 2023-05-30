const billInput = <HTMLInputElement>document.querySelector('#billInput');

const peopleInput = <HTMLInputElement>document.querySelector('#peopleInput');

let bill = Number(billInput.value);

let numPeople = Number(peopleInput.value);

let tipPercent = 0;

let tipAmount = Number();

billInput?.addEventListener('change', billFunc);

function billFunc(){
    setNum(billInput, 2);
    bill = Number(billInput.value);
    tipCalc();
}

peopleInput?.addEventListener('input', peopleFunc);

function peopleFunc(){
    setNum(peopleInput, 0);
    numPeople = Number(peopleInput.value);
    tipCalc();
}

const tipButtons = document.querySelectorAll<HTMLButtonElement>(".percentButton");
tipButtons[0].classList.add("activeButton");
for(let i of tipButtons){
    i.addEventListener('click', () => {
        setTip(Number(i.value));
        i.classList.add("activeButton");
    })
}

const customTipButton = <HTMLInputElement>document.querySelector(".customTip")?.querySelector('input');

customTipButton?.addEventListener('focus', () =>{
    setTip(Number(customTipButton.value));
    customTipButton.classList.add("activeButton");
});

customTipButton?.addEventListener('input', () =>{
    setTip(Number(customTipButton.value));
    customTipButton.classList.add("activeButton");
    console.log(customTipButton.classList);
});

const customTip = <HTMLInputElement>document.querySelector(".customTip");

customTip?.addEventListener('focus', tipCheck);

function setTip(tipValue: number){
    customTipButton.classList.remove("activeButton");
    tipPercent = tipValue;
    for(let i of tipButtons){
        i.classList.remove("activeButton");
    }
    tipCalc();
}

function setNum(inputElement: HTMLInputElement, decimalPlace: number, typeOfInput?: string){
    const pElement = inputElement.parentElement;
    const errorMessage = <HTMLParagraphElement>pElement?.querySelector(".errorMessage")
    if(Number(inputElement.value)){
        inputElement.value = Number.parseFloat(inputElement.value).toFixed(decimalPlace);
        pElement?.classList.add('validInput');
        pElement?.classList.remove('invalidInput');
    }
    else{
        pElement?.classList.remove('validInput');
        pElement?.classList.add('invalidInput');
    }
    if(errorMessage != null){
        errorMessage.textContent = billCheck(inputElement.value);
    }
}

function tipCheck(){
    if(customTip.value == ''){
        customTip.classList.remove('currentTip');
    }
    else{
        customTip.classList.add('currentTip');
    }
}

function billCheck(input: string){
    if(input == '0'){
        return `Can't be zero`
    }else{
        return `Invalid number`
    }
}

const tipAmountDisplay = <Element>document.querySelector('#tipPerPerson');

const total = <Element>document.querySelector('#tipTotal')

function tipCalc(){
    let output = bill/numPeople;
    let tipAmount = output * tipPercent * 0.01;
    tipAmountDisplay.textContent = '$' + String(tipAmount.toFixed(2));
    total.textContent = '$' + String((output + tipAmount).toFixed(2));

    if(tipAmountDisplay.textContent == "$NaN" || total.textContent == "$Infinity"){
        tipAmountDisplay.textContent = '$0.00'
    }
    if(total.textContent == "$NaN" || total.textContent == "$Infinity"){
        total.textContent = '$0.00'
    }
}

tipCalc();

const resetButton = <Element>document.querySelector('#resetButton')

resetButton.addEventListener('click', reset);

function reset(){
    billInput.value = '';
    peopleInput.value = '';
    customTipButton.value = '';
    tipAmountDisplay.textContent = '$0.00';
    total.textContent = '$0.00'
    tipAmount = 5;
    for(let i of tipButtons){
    i.classList.remove('activeButton');
    i.addEventListener('click', () => {
        setTip(Number(i.value));
        i.classList.add("activeButton");
    })
    }
    tipButtons[0].classList.add("activeButton");
}

reset();