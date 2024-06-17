document.addEventListener("DOMContentLoaded", () => {
  const dealer = document.querySelector(".dealer");
  const player = document.querySelector(".player");
  const hitBtn = document.querySelector(".hit");
  const stayBtn = document.querySelector(".stay");
  const output = document.querySelector(".output p");
  const yourSum = document.getElementById("yourSum");
  const dSum = document.getElementById("dSum");
  const btn = document.querySelector(".btn");
  let deck = [];
  let gameOver = false;
  let playerHand = [];
  let dealerHand = [];

  function createDeck() {
    for (let i = 0; i < 4; i++) {
      for (let j = 1; j <= 13; j++) {
        deck.push(j);
      }
    }
    deck = deck.sort(() => Math.random() - 0.5);
  }

  function getCardValue(card) {
    if (card === 11) {
      return "J";
    } else if (card === 12) {
      return "Q";
    } else if (card === 13) {
      return "K";
    } else if (card === 1) {
      return "A";
    } else {
      return card.toString();
    }
  }

  function displayCards(hand, element) {
    element.innerHTML = "";
    let sum = 0;
    hand.forEach((card) => {
      const cardDiv = document.createElement("div");
      cardDiv.classList.add("card");
      cardDiv.innerHTML = `<div class="value">${getCardValue(card)}</div>`;
      element.appendChild(cardDiv);
    });
  }

  function calcScore(hand) {
    let score = 0;
    hand.forEach((card) => {
      if (card === 11 || card === 12 || card === 13) {
        score += 10;
      } else {
        score += card;
      }
    });
    return score;
  }

  function scoreCard() {
    let playerScore = calcScore(playerHand);
    let dealerScore = calcScore(dealerHand);
    yourSum.textContent = `Sum: ${playerScore}`;
    dSum.textContent = `Sum: ${dealerScore}`;
    if (playerScore == 21 && dealerScore < 21) {
      output.textContent = "you win :)";
      gameOver = true;
    } else if (dealerScore == 21 && playerScore < 21) {
      output.textContent = "dealer win :(";
      gameOver = true;
    } else if (dealerScore > 21 && playerScore < dealerScore) {
      output.textContent = "you win :)";
      gameOver = true;
    } else if (playerScore > 21 && dealerScore < playerScore) {
      output.textContent = "dealer win :(";
      gameOver = true;
    } else if (dealerScore < 21 && playerScore === dealerScore) {
      output.textContent = "tie -_-";
    }
    if (gameOver) {
      hitBtn.disabled = true;
      stayBtn.disabled = true;
      // const replayBtn = document.createElement("button");
      // replayBtn.textContent = "Play again";
      // replayBtn.classList.add("hit");

      // btn.innerHTML = "";
      // btn.appendChild(replayBtn);

      // replayBtn.addEventListener("click", () => {
  
      //   deck = [];
      //   gameOver = false;
      //   playerHand = [];
      //   dealerHand = [];
      //   output.textContent = "";
      //   yourSum.textContent = "";
      //   dSum.textContent = "";
      //   hitBtn.disabled = false;
      //   stayBtn.disabled = false;
      //   startGame();

      // });
    }
  }

  function startGame() {
    createDeck();
    playerHand = [deck.pop(), deck.pop()];
    dealerHand = [deck.pop(), deck.pop()];
    displayCards(playerHand, player);
    displayCards(dealerHand, dealer);
    scoreCard();
  }

  hitBtn.addEventListener("click", () => {
    if (!gameOver) {
      playerHand.push(deck.pop());
      displayCards(playerHand, player);
      let playerScore = calcScore(playerHand);
      if (playerScore > 21) {
        output.textContent = "fuck off";
        gameOver = true;
      } else if (playerScore === 21) {
        output.textContent = "you wim";
        gameOver = true;
      }
      scoreCard();
    }
  });

  stayBtn.addEventListener("click", () => {
    if (!gameOver) {
      let dealerScore = calcScore(dealerHand);
      while (dealerScore < 17) {
        dealerHand.push(deck.pop());
        displayCards(dealerHand, dealer);
        dealerScore = calcScore(dealerHand);
      }
      gameOver = true;
      scoreCard();
    }
  });
  document.getElementById("reload").addEventListener("click", () => {
    window.location.href = "game.html";
  });

  startGame();
});
