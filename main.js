window.addEventListener("load", init);

//global
let time = 5;
let score = 0;
let isPlaying;

//element
const wordInput = document.querySelector("#word-input");
const currentWord = document.querySelector("#current-word");
const scoreDisplay = document.querySelector("#score");
const timeDisplay = document.querySelector("#time");
const message = document.querySelector("#message");
const seconds = document.querySelector("#seconds");

const words = [
  "noob",
  "hello",
  "lmao",
  "lol",
  "lucky",
  "hwello",
  "sleep",
  "zoom",
  "hero",
  "monitor",
  "seconds",
  "river",
  "unlucky",
  "wish",
  "time",
  "timer",
  "keyboard",
  "keybind",
  "blind",
  "color",
  "mouse",
  "developer",
  "love",
  "link",
  "download",
  "bridge",
  "joke",
  "master",
  "computer",
  "programmer",
  "nerd",
  "difficult",
  "literally",
  "sixth",
];

//initialize game
function init() {
  //console.log("init");
  showWord(words);
  //start matching on input
  wordInput.addEventListener("input", startMatch);
  // call countdown every sec
  setInterval(countdown, 1000);
  //check game status
  setInterval(checkStatus, 1000);
}

//start match
function startMatch() {
  if (matchWords()) {
    isPlaying = true;
    time = 6;
    showWord(words);
    wordInput.value = "";
    score++;
  }
  scoreDisplay.innerHTML = score;
}
//match words
function matchWords() {
  if (wordInput.value === currentWord.innerHTML) {
    console.log("correct");
    return true;
  } else {
    console.log("wrong");
    return false;
  }
}

// pick n show ran word
function showWord(words) {
  //generate random
  const randIndex = Math.floor(Math.random() * words.length);
  //output random word
  currentWord.innerHTML = words[randIndex];
}

// countdown timer
function countdown() {
  //make sure time is not run out
  if (time > 0) {
    time--;
  } else if (time === 0) {
    //game over
    isPlaying = false;
  }
  //show time
  timeDisplay.innerHTML = time;
}
//check game status
function checkStatus() {
  if (!isPlaying && time === 0) {
    console.log("game over! your score is " + score);
    swal({
      title: "Game Over!",
      text: "Your score is " + score,
      icon: "success",
      buttons: "Try again",
    }).then((willDelete) => {
      if (willDelete) {
        score = 0;
        startMatch();
        time = 6;
      } else {
        console.log("else");
      }
    });
  }
}
