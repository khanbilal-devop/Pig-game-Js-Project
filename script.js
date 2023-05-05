'use strict';

const rollBtn = document.querySelector('.btn-roll');
const holdBtn = document.querySelector('.btn-hold');
const image = document.querySelector('img');
const player1 = document.querySelector('.player-0');
const player2 = document.querySelector('.player-1');
const current1 = document.querySelector('.current-0');
const current2 = document.querySelector('.current-1');
const score1 = document.querySelector('.score-0');
const score2 = document.querySelector('.score-1');
const name1 = document.querySelector('.name-0');
const name2 = document.querySelector('.name-1');
const newGameBtn = document.querySelector('.btn-new');
let playing = true;

const generateRandomNo = () => Math.floor(Math.random() * 6) + 1;

const isPlayer1Active = () => player1.classList.contains('player-active');


const init = () => {
   playing = true;
   current1.innerHTML = 0;
   current2.innerHTML=0;
   score1.innerHTML=0;
   score2.innerHTML=0;
   const winningPlayer = document.querySelectorAll('.player-winner');
   winningPlayer.length > 0  &&
   winningPlayer.classList.remove('player-winner');
   player1.classList.add('player-active');
   player2.classList.remove('player-active');
   image.classList.add('hidden');
}

const rollBtnClicked = () => {
  if (playing) {
    const diceNo = generateRandomNo();
    image.src = `dice-${diceNo}.png`;
    image.classList.remove('hidden');
    if (diceNo === 1) {
      isPlayer1Active()
        ? changingPlayer(player1, player2, current1)
        : changingPlayer(player2, player1, current2);
    } else {
      isPlayer1Active()
        ? (current1.innerHTML = Number(current1.innerHTML) + diceNo)
        : (current2.innerHTML = Number(current2.innerHTML) + diceNo);
    }
  }
};

const holdBtnClicked = () => {
  if (playing) {
    let totalScore = 0;
    if (isPlayer1Active()) {
      totalScore = addingScore(current1, score1);
      totalScore < 100 && changingPlayer(player1, player2, current1);
    } else {
      totalScore = addingScore(current2, score2);
      totalScore < 100 && changingPlayer(player2, player1, current2);
    }
    if (totalScore >= 100) {
      playing = false;
      if (isPlayer1Active()) {
        showingWinner(player1,name1);
      } else {
        showingWinner(player2,name2);
      }
    }
  }
};

const showingWinner = (winnerplayer,name) => {
  winnerplayer.classList.remove('.player-active');
  winnerplayer.classList.add('player-winner');
  name.classList.add('winner-name');
  image.classList.add('hidden');
};

const changingPlayer = (currentActive, newActive, currentActiveScore) => {
  currentActive.classList.remove('player-active');
  newActive.classList.add('player-active');
  currentActiveScore.innerHTML = 0;
};

const addingScore = (currentScore, totalScore) => {
  const score = Number(currentScore.innerHTML);
  totalScore.innerHTML = Number(totalScore.innerHTML) + score;
  return totalScore.innerHTML;
};

newGameBtn.addEventListener('click',init)
holdBtn.addEventListener('click', holdBtnClicked);
rollBtn.addEventListener('click', rollBtnClicked);
