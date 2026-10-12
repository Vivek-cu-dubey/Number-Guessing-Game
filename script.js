
let randomNumber = parseInt(Math.random() * 100 + 1);

const submit = document.getElementById("subt");
const userInput = document.getElementById("guessField");
const guessSlot = document.querySelector(".guesses");
const guessesRemaining = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");
const startOver = document.querySelector(".resultParas");

const p = document.createElement("p");

let prevGuess = [];
let numGuess = 0;
let playGame = true;

submit.addEventListener("click", function (e) {
    e.preventDefault();

    if (playGame) {
        const guess = parseInt(userInput.value);
        validateGuess(guess);
    }
});

function validateGuess(guess) {
    if (isNaN(guess)) {
        alert("Please enter a valid number");
    } else if (guess < 1) {
        alert("Please enter a number more than 0");
    } else if (guess > 100) {
        alert("Please enter a number less than 101");
    } else {
        prevGuess.push(guess);
        numGuess++;

        displayGuess(guess);
        checkGuess(guess);
    }
}

function checkGuess(guess) {
    if (guess === randomNumber) {
        displayMessage("You guessed it right!");
        endGame();
    } else if (numGuess === 10) {
        displayMessage(`Game Over! The number was ${randomNumber}`);
        endGame();
    } else if (guess < randomNumber) {
        displayMessage("Number is TOO LOW!");
    } else {
        displayMessage("Number is TOO HIGH!");
    }
}

function displayGuess(guess) {
    userInput.value = "";
    guessSlot.innerText = prevGuess.join(", ");
    guessesRemaining.innerText = 10 - numGuess;
}

function displayMessage(message) {
    lowOrHi.innerHTML = `<h2>${message}</h2>`;
}

function endGame() {
    userInput.value = "";
    userInput.disabled = true;
    submit.disabled = true;

    p.classList.add("button");
    p.innerHTML = '<h2 id="newGame">Start New Game</h2>';

    startOver.appendChild(p);
    playGame = false;

    newGame();
}

function newGame() {
    const newGameButton = document.getElementById("newGame");

    newGameButton.addEventListener("click", function () {
        randomNumber = parseInt(Math.random() * 100 + 1);

        prevGuess = [];
        numGuess = 0;

        guessSlot.innerText = "";
        guessesRemaining.innerText = 10;
        lowOrHi.innerHTML = "";

        userInput.disabled = false;
        submit.disabled = false;

        startOver.removeChild(p);
        playGame = true;
    });
}