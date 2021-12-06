window.addEventListener("load", init);

//when signed in
function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  //$("#name").text(profile.getName());
  $(".game-div").css("display", "block");
  $(".opening-bef-log").css("display", "none");
  $(".start-btn").css("display", "block");
  //starting game
  //init();
  //window.addEventListener("load", init);
}

//sign out
function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    alert("You have been signed out!");
    $(".game-div").css("display", "none");
    $(".opening-bef-log").css("display", "block");
    $(".back-btn").css("display", "block");
  });
}

//global
let time = 60;
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
  "sixth", //on v1.3
  "click", //on v1.4
  "main",
  "press",
  "tab",
  "people",
  "function",
  "any",
  "between",
  "leave",
  "eat",
  "ate",
  "what",
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
    //time = 31;
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
      title: score + " WPM",
      text: "Nice Try!",
      icon: "success",
      buttons: "Try again",
    }).then((willDelete) => {
      if (willDelete) {
        score = 0;
        startMatch();
        time = 61;
      } else {
        console.log("else");
      }
    });
  }
}
