"use strict";

const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");

//  Return default Score to Zero
const p1Score = document.getElementById("score--0");
const p2Score = document.getElementById("score--1");
const diceP1 = document.querySelector(".dice");

const currentP0 = document.getElementById("current--0");
const currentP1 = document.getElementById("current--1");

// Roll Dice
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");



let scores, currentScore, activePlayer, playGame;

// Fun Initialization
const inti = function () {
  p1Score.textContent = 0;
  p2Score.textContent = 0;
  // Roll Dice image is hidden
  diceP1.classList.add("hidden");

  scores = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  playGame = true;


  currentP0.textContent = 0;
  currentP1.textContent = 0;

  diceP1.classList.add("hidden");
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
  player0.classList.add("player--active");
  player1.classList.remove("player--active");
};


inti();

// switch the player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
};

btnRoll.addEventListener("click", function () {
  // roll dice is set to display image on click of btn--roll button
  if (playGame) {
    diceP1.classList.remove("hidden");
    // generate random number
    const dice = Math.floor(Math.random() * 6) + 1;

    // Generate random images
    diceP1.src = `./image/dice-${dice}.png`;

    // Check for roll dice
    if (dice !== 1) {
      // display score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch prayer
      switchPlayer();
    }
  }
});

// Hold button
btnHold.addEventListener("click", function () {
  if (playGame) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];


    if (scores[activePlayer] >= 100) {
      playGame = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      //   if user win, hide the dice image
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--active");
      diceP1.classList.add("hidden");

      // Play sound if active user win
      playSound2();

    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", inti);
