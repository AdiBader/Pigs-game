'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Creating variables with no values - They will get values in the init() function
let scores, currentScore, activePlayer, playing;

// Starting conditions
const init = function() {
    scores = [0, 0]
    currentScore = 0;
    activePlayer = 0;
    playing = true;
    
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    document.querySelector('.player--0 h2.name').textContent = "אבא";
    document.querySelector('.player--1 h2.name').textContent = "אדם";
   
    document.querySelector('.secretMSG--0').classList.add('hidden');
    document.querySelector('.secretMSG--1').classList.add('hidden');
    
};
init();

const switchPlayer = function() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

//Rolling dice Functionality
btnRoll.addEventListener('click', function() {
    if(playing) {
        // 1. Generating a random dice roll.
        const dice = Math.trunc(Math.random() * 6) + 1;
        // 2. Display dice roll.
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;

        // 3. Check for rolled 1: if true, switch to next player
        if(dice !== 1) {
            // Add dice to current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            // Switch to next player
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function() {
    if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 20) {
        // Finish the game
        playing = false;
        diceEl.src = `player--${activePlayer}.jpg`;
        //diceEl.classList.add('hidden');
        //console.log(`Player ${activePlayer + 1} won`);
        
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        
        let loserName = document.querySelector('.player:not(.player--winner) h2.name');
        loserName.textContent = loserName.textContent.concat(' הפסיד');

        document.querySelector('.player:not(.player--winner) .secretMSG').classList.remove('hidden');

        const winnerName = document.querySelector('.player--winner h2.name');
        winnerName.textContent = winnerName.textContent.concat(' המנצח');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');

    } else {
        //Switch  to the next player
        switchPlayer();
    }
}
});

btnNew.addEventListener('click', init);