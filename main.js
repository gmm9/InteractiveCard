'use strict'
// CARDHOLDER nome
const nameCard = document.querySelector('.card__details-name');
const nameInput = document.querySelector('#cardholder');
const nameErrorDiv = document.querySelector('.form__cardholder--error');

// CARD NUMBER
const numberCard = document.querySelector('.card__number');
const numberInput = document.querySelector('#cardNumber');
const numberErrorDiv = document.querySelector('.form__inputnumber--error');

// MM
const monthCard = document.querySelector('.card__month');
const monthInput = document.querySelector('#cardMonth');
const monthErrorDiv = document.querySelector('.form__input-mm--error');

// YY
const yearCard = document.querySelector('.card__year');
const yearInput = document.querySelector('#cardYear');
const yearErrorDiv = document.querySelector('.form__input-yy--error');

// CVC
const cvcCard = document.querySelector('.card-back__cvc');
const cvcInput = document.querySelector('#cardCvc');
const cvcErrorDiv = document.querySelector('.form__input-cvc--error');


nameInput.addEventListener('input', ()=>{
    if(nameInput.value == ''){
        nameCard.innerText = 'JANE APPLESEED'
    }else{
        nameCard.innerText = nameInput.value;
    }
});

numberInput.addEventListener('input', ()=>{

    let regExp = /[A-z]/g;
    if(regExp.test(numberInput.value)){
        showError(numberInput, numberErrorDiv, 'Wrong format, numbers only');
    }else{
        numberInput.value = numberInput.value.replace(/\s/g, '').replace(/([0-9]{4})/g, '$1 ').trim();
        showError(numberInput, numberErrorDiv, '', false);
    }

    numberCard.innerText = numberInput.value;

    if(numberInput.value == ''){
        numberCard.innerText = '0000 0000 0000 0000';
    }
});

monthInput.addEventListener('input', ()=>{
    monthCard.innerText = monthInput.value;
    validateLetters(monthInput, monthErrorDiv);
});

yearInput.addEventListener('input', ()=>{
    yearCard.innerText = yearInput.value;
    validateLetters(yearInput, yearErrorDiv);
});

cvcInput.addEventListener('input', ()=>{
    cvcCard.innerText = cvcInput.value;
    validateLetters(cvcInput, cvcErrorDiv);
});



let confirmBtn = document.querySelector('.form__submit')

let nameValidation = false;
let numberValidation = false;
let monthValidation = false;
let yearValidation = false;
let cvcValidation = false;

let formSection = document.querySelector('.form');
let thanksSection = document.querySelector('.thanks-section');

confirmBtn.addEventListener('click', event=>{
    event.preventDefault();

    if(verifyIsFilled(nameInput, nameErrorDiv)){
        nameValidation = true;
    }else{
        nameValidation = false;
    }

    if(verifyIsFilled(numberInput, numberErrorDiv) == true){
        if(numberInput.value.length == 19){
            showError(numberInput, numberErrorDiv, '', false);
            numberValidation = true;
        }else{
            showError(numberInput, numberErrorDiv, 'Wrong number');
            numberValidation = false;
        }
    }

    if(verifyIsFilled(monthInput, monthErrorDiv)){
        if(parseInt(monthInput.value)>0 && parseInt(monthInput.value)<=12){
            showError(monthInput, monthErrorDiv, '', false);
            monthValidation = true;
        }else{
            showError(monthInput, monthErrorDiv, 'Wrong Month');
            monthValidation = false;
        }
    }

    if(verifyIsFilled(yearInput, yearErrorDiv)){
        if(parseInt(yearInput.value)> 22 && parseInt(yearInput.value)<= 27){
            showError(yearInput, yearErrorDiv, '', false);
            yearValidation = true;
        }else{
            showError(yearInput, yearErrorDiv, 'Wrong Year');
            yearValidation = false;
        }
    }

    if(verifyIsFilled(cvcInput, cvcErrorDiv)){
        if(cvcInput.value.length == 3 ){
            showError(cvcInput, cvcErrorDiv, '', false);
            cvcValidation = true;
        }else{
            showError(cvcInput, cvcErrorDiv, 'Wrong CVC');
            cvcValidation = false;
        }
    }

    if(nameValidation && numberValidation && monthValidation && yearValidation && cvcValidation){
        formSection.style.display = 'none';
        thanksSection.style.display = 'block';
    }

});



// Funçõess:

function showError(divInput, divError, msgError, show = true){
    if(show){
        divError.innerText = msgError;
        divInput.style.borderColor = '#FF0000';
    }else{
        divError.innerText = msgError;
        divInput.style.borderColor = 'hsl(270, 3%, 87%)';
    }
}

function verifyIsFilled(divInput, divError){
    if(divInput.value.length > 0){
        showError(divInput, divError, "", false);
        return true;
    }else{
        showError(divInput, divError, "Can't be blank");
        return false;
    }
}

function validateLetters(input, divError){
    let regExp = /[A-z]/g;
    if(regExp.test(input.value)){
        showError(input, divError, 'Wrong format, numbers only');
    }else{
        showError(input, divError, '', false);
    }
}