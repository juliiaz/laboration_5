"use strict";
/*
 * Laboration 5 - Studentkortsgenerator
 * Namn: DITT NAMN
 */

// Hämta element från DOM
const form = document.querySelector("#studentform");
const clearButton = document.querySelector("#clear");

const fullnameInput = document.querySelector("#fullname");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const fontSelect = document.querySelector("#font");

const previewFullname = document.querySelector("#previewfullname");
const previewEmail = document.querySelector("#previewemail");
const previewPhone = document.querySelector("#previewphone");
const card = document.querySelector(".card");

const errorList = document.querySelector("#errorlist");
const historySection = document.querySelector("#history");
const deleteHistoryButton = document.querySelector("#delete");


// Array som används för felmeddelanden
let errors = [];

// Array som innehåller sparade studentkort
let history = [];

/**
 * Validerar formulärets inmatning.
 * @returns {boolean}
 */
function validateForm() {

    errors = [];
    // Kontrollera formulärets obligatoriska fält
    if (fullnameInput.value.trim() === ""){
        errors.push("Du måste fylla i namn");
    }

    if (emailInput.value.trim() === ""){
        errors.push("Du måste fylla i e-post");
    }

    if (phoneInput.value.trim() === ""){
        errors.push("Du måste fylla i telefonnummer");
    }

    // Visa eventuella felmeddelanden
    displayErrors();

    

    // Returnera resultatet (true eller false) av valideringen
      if (errors.length === 0){
        return true;
        } else {
        return false;
        }
}


/**
 * Visar felmeddelanden på sidan.
 */
function displayErrors() {
    // Rensa tidigare felmeddelanden
    errorList.innerHTML = "";

    // Skriv ut aktuella felmeddelanden till DOM
    for (let i = 0; i<errors.length; i++){

        const liElement = document.createElement("li");

        liElement.textContent = errors[i];

        errorList.appendChild(liElement);
    }
}


/**
 * Skapar ett studentkort och visar det på sidan.
 */
function createStudentCard() {
    // Hämta information från formuläret
    const fullname = fullnameInput.value.trim();

    const email = emailInput.value.trim();

    const phone = phoneInput.value.trim();

    const font = fontSelect.value;

    // Uppdatera studentkortet
    previewFullname.textContent = fullname;
    previewEmail.textContent = email;
    previewPhone.textContent = phone;
    card.style.fontFamily = font;

    // Lägg till studentkortet i historiken
    const studentCard = {
        fullname: fullname,
        email: email, 
        phone: phone, 
        font: font
    };
    
    history.unshift(studentCard);

    // Spara och uppdatera historiken
    saveHistory();
}


/**
 * Sparar historiken i localStorage.
 */
function saveHistory() {
    // Spara history i localStorage
    localStorage.setItem("history", JSON.stringify(history));
}


/**
 * Läser in tidigare historik från localStorage.
 */
function loadHistory() {
    // Hämta eventuell sparad historik
    const savedHistory = localStorage.getItem("history");

    // Uppdatera history
     if (savedHistory){
        history = JSON.parse(savedHistory);
    }
}


/**
 * Visar historiken på sidan.
 */
function renderHistory() {
    // Rensa tidigare visad historik
    historySection.innerHTML = "";

    // Skriv ut innehållet i history till DOM
    history.forEach(function(studentCard){
        
    const article = document.createElement("article");
    const name = document.createElement("p");
    const email = document.createElement("p");
    const phone = document.createElement("p");
    const font = document.createElement("p");

    name.textContent = studentCard.fullname;
    email.textContent = studentCard.email;
    phone.textContent = studentCard.phone;
    font.textContent = studentCard.font;

    article.appendChild(name);
    article.appendChild(email);
    article.appendChild(phone);
    article.appendChild(font);

    historySection.appendChild(article);
    });

}


/**
 * Rensar formulär, aktuellt studentkort och felmeddelanden.
 */
function clearForm() {
    // Återställ formulär och studentkort

    // Rensa eventuella felmeddelanden
}


/**
 * Raderar hela historiken.
 */
function deleteHistory() {
    // Radera sparad historik

    // Uppdatera history och visningen på sidan
}


// Eventlyssnare

// När formuläret skickas:
form.addEventListener("submit", function(event) {
    event.preventDefault();

    if (validateForm()){
    createStudentCard();
}

});

// - validera inmatningen
// - skapa studentkort om valideringen lyckas



// När användaren klickar på "Rensa"
clearButton.addEventListener("click", function(){
    clearForm();

});

// När användaren klickar på "Radera historik"
deleteHistoryButton.addEventListener("click", function(){
    deleteHistory();
    
});


// När sidan laddas:

// - läs in och visa eventuell tidigare historik
loadHistory();


