"use strict";
const btnRollEl = document.querySelector(".btn--roll");
const imgEl = document.querySelector(".dice");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");
const holdEl = document.querySelector(".btn--hold");
const newEl = document.querySelector(".btn--new");
const diceEl = document.querySelector(".dice");

const random = function () {
  return Math.ceil(Math.random() * 6);
};

let score, currentTotal, current, activePlayer, playing;

// starter function
const init = function () {
  score = [0, 0];
  currentTotal = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.remove("hide");
  document.querySelectorAll(".current").forEach((el) => {
    el.classList.remove("hide");
  });
  btnRollEl.classList.remove("hide");
  holdEl.classList.remove("hide");
  imgEl.classList.add("hide");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};

init();

// function to switch the players
const switchPlayer = function () {
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentTotal = 0;
  activePlayer == 0 ? (current1El.innerHTML = 0) : (current0El.innerHTML = 0);
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// user roll dice
btnRollEl.addEventListener("click", () => {
  if (playing) {
    imgEl.classList.remove("hide");
    current = random();
    currentTotal += current;

    imgEl.src = `dice-${current}.png`;
    if (current != 1) {
      activePlayer == 0
        ? (current0El.innerHTML = currentTotal)
        : (current1El.innerHTML = currentTotal);

      // checking win here , because if the current total is higher than final score then player will win
      win(score[activePlayer] + currentTotal);
      return;
    } else {
      switchPlayer();
    }
  }
});

holdEl.addEventListener("click", () => {
  if (playing) {
    score[activePlayer] += currentTotal;
    activePlayer === 0
      ? (score0El.innerHTML = score[activePlayer])
      : (score1El.innerHTML = score[activePlayer]);

    // checking win condition
    win(score[activePlayer]);

    switchPlayer();
  }
});

function win(currentScore) {
  if (currentScore >= 50) {
    playing = false;
    diceEl.classList.add("hide");
    document.querySelectorAll(".current").forEach((el) => {
      el.classList.add("hide");
    });
    btnRollEl.classList.add("hide");
    holdEl.classList.add("hide");
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add("player--winner");
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove("player--active");

    document.querySelector(".player--winner .score").innerHTML = "🥇";
  }
}

newEl.addEventListener("click", init);
