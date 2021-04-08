//Eldy Deines
//Memory Game (JavaScript)
//April 8
//in this version, I was able to complete the following requirements:

//Following variables pull HTML Elements from the DOM
const gameContainer = document.getElementById("game");
const guess = document.getElementById("guess");
const startBtn = document.getElementById("start");
const resetBtn = document.getElementById("reset");
//Following variables will help with updating scores
//and with comparing any saved local storage scores
const scoreBoard = document.querySelector("h2");
const p = document.createElement("p");
const bestScore = JSON.parse(localStorage.getItem("data-lowest"));

//Following variables are initialized to track counts for game.
let click = 0; //use to track which click you are on in the game
let guessCounter = 0; //for every guess you take, this counts it
let numMatches = 0; //counts how many matches you have comepleted
let card1; //saves the first card click event
let card2; //saves the second card click event
let myUrl = "https://www.kindpng.com/picc/m/80-806553_transparent-check-box-clipart-check-mark-symbol-png.png"


const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;
  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);
    // Decrease counter by 1
    counter--;
    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

let shuffledColors = shuffle(COLORS);

//determines if game is over by seeing if all matches have been made
const matchesNeeded = COLORS.length / 2;
let gameOver = (numMatches) => numMatches === matchesNeeded;

//Prepends a new paragraph element as the first child to the scoreboard 
//Then, we check to see if there is a best score saved in local storage
//If there is an existing score, we then let the user know there is a score to beat
scoreBoard.prepend(p);
const gameUpdate = scoreBoard.firstElementChild;
let scoreExists = () => localStorage.length > 0;
if (scoreExists() === true) {
  const bestScore = JSON.parse(localStorage.getItem("data-lowest"));
  gameUpdate.innerText = `Try to beat the best score to date: ${bestScore}`;
}

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");
    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}//end createDivsForColors Function

//resets variables needed after clicking on the same card 
//and after a match has been found
function resetClickNCards() {
  card1.setAttribute("style", "");
  delete card1.dataset.flipped;
  if (card2.style.backgroundColor !== null) {
    card2.setAttribute("style", "");
  }
  click = 0;
}//end resetClickNCards Function


//everytime a guess is made we add to the overall guessCounter
function updateGuess() {
  guessCounter += 1;
  guess.innerText = guessCounter;
}//end updateGuess Function


// TODO: Implement this function!
function handleCardClick(event) {

  event.preventDefault();

  if (click === 0) {
    //do these definitions upon first click and change card to its color
    card1 = event.target;
    card1.style.backgroundImage = 'none';
    card1.style.backgroundColor = `${event.target.classList.value}`;
    card1.setAttribute("data-flipped", "yes");
    click += 1;
  }//end if for first click
  else if (click === 1) {
    //for the second click, save this to second card
    card2 = event.target;
    card2.style.backgroundImage = 'none';
    card2.style.backgroundColor = `${event.target.classList.value}`;

    if (card2.isEqualNode(card1)) {
      //if same card is clicked, reset values
      setTimeout(resetClickNCards, 100);
    }//end if
    else if (card2.classList.value === card1.classList.value) {
      //This is a match with two different cards clicked.
      //This will leave styles in place, removes click listener, 
      //resets click count, adds to overall guess count and adds to match counter
      card1.removeEventListener("click", handleCardClick);
      card2.removeEventListener("click", handleCardClick);
      click = 0;
      updateGuess();

      //This section of the match determines if the game is over and if the user 
      //beat the existing saved score or not. If there was not existing score, it will
      //add to the local storage for future use.
      numMatches += 1;
      const bestScore = JSON.parse(localStorage.getItem("data-lowest"));
      if (gameOver(numMatches) && (bestScore < guessCounter) && scoreExists()) {
        gameUpdate.innerText = `Game Over! Try Harder Next Time! Best Score to Date: ${bestScore}`;
      }//end else if
      else if (gameOver(numMatches) && (bestScore > guessCounter) && scoreExists()) {
        gameUpdate.innerText = `Congrats, you beat the best! Best Score to Date: ${guessCounter}`;
      }//end else
      else if (gameOver(numMatches)) {
        gameUpdate.innerText = `Game Over! Best Score to Date: ${guessCounter}`;
        localStorage.setItem("data-lowest", `${guessCounter}`);
        scoreExists();
      }
    }//end else if for second click
    else {
      //No Match & flips back to hiding position
      //Adds to overall guess county
      setTimeout(resetClickNCards, 1000);
      updateGuess();
    }
  }
  else {//catch all
    setTimeout(resetClickNCards, 100);
  }
}




// when the DOM loads
createDivsForColors(shuffledColors);

//if user hits start game it will enable the click functionality to the cards
startBtn.addEventListener("click", function () {
  const children = gameContainer.children;
  for (let child of children) {
    child.addEventListener("click", handleCardClick);
  }
});//end start button

//if user clicks on reset, it will reinitialized all variables
resetBtn.addEventListener("click", function () {
  gameContainer.innerHTML = '';
  shuffledColors = shuffle(COLORS);
  createDivsForColors(shuffledColors);
  click = 0;
  guessCounter = 0;
  guess.innerText = guessCounter;
  numMatches = 0;
});//end reset button 



