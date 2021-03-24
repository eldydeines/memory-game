//Eldy Deines
//Memory Game (JavaScript)
//March 16
//Only was able to complete Part 1 and Part 2. :(

const gameContainer = document.getElementById("game");
let click = 0;
let firstCard = "";
let secondCard = "";
let firstColor = "";
let secondColor = "";
let firstChecker = "";


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

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  event.preventDefault();
  // you can use event.target to see which element was clicked
  console.log("you just clicked", event.target);

  //adds one to the click
  click += 1;

  //first click on the round assigns values to firstCard
  if (click === 1) {
    firstColor = event.target.classList.value;
    firstCard = event.target;
    firstCard.style.backgroundColor = firstColor;

  }
  else if (click === 2) {
    secondColor = event.target.classList.value;
    secondCard = event.target;

    if (secondColor === firstColor) {
      secondCard.style.backgroundColor = secondColor;
      console.log("match");
      click = 0;
    }//end else if
    else if (secondColor !== firstColor) {
      secondCard.style.backgroundColor = secondColor;
      setTimeout(function () {
        firstCard.setAttribute("style", "");
        secondCard.setAttribute("style", "");
      }, 1000);
      console.log("no match");
      click = 0;
    }
    else {
      firstCard.setAttribute("style", "");
      secondCard.setAttribute("style", "");
      click = 0;
    }
  }
  else {
    firstCard.setAttribute("style", "");
    secondCard.setAttribute("style", "");
    click = 0;
  }
};


// when the DOM loads
createDivsForColors(shuffledColors);
