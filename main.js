// /window.addEventListener("load", init);

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

const openingText = document.querySelector("#opening-text");
const startBtn = document.querySelector(".start-btn");
const gameSection = document.querySelector(".game-section");
const resultBtn = document.querySelector(".result-btn");
const formDataScore = document.querySelector(".formDataScore");
const fullName = document.querySelector(".fullName");
const wpmScore = document.querySelector(".wpmScore");

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  $("#name").text(profile.getName());
  $(".start-btn").css("display", "block");
  $(".g-signin2").css("display", "none");
  $(".logout-btn").css("display", "block");

  // startBtn.style.display = "none";
  // gameSection.style.display = "block";
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    alert("You have been signed out!");
    $(".g-signin2").css("display", "block");
    $(".logout-btn").css("display", "none");

    openingText.style.display = "block";
    startBtn.style.display = "none";
    gameSection.style.display = "none";
  });
}

//initialize game
function init() {
  gameSection.style.display = "block";
  startBtn.style.display = "none";
  openingText.classList.toggle("d-none");
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

    //show button to show score
    gameSection.style.display = "none";
    resultBtn.style.display = "block";
    formDataScore.style.display = "block";

    //inputing value
    fullName.value(profile.getName());
    wpmScore.value = score;

    //swal
    // swal({
    //   title: score + " WPM",
    //   text: "Nice Try!",
    //   icon: "success",
    //   buttons: "Try again",
    // }).then((willDelete) => {
    //   if (willDelete) {
    //     score = 0;
    //     startMatch();
    //     time = 61;
    //   } else {
    //     console.log("else");
    //   }
    // });
  }
}

//sending data
const scriptURL = "https://script.google.com/macros/s/AKfycbxUZ1yO-2YcxAIeLu-KfqfPZxEZ_WlaQ0yOo2EOS_T3mczhgSGYbHNNbL92vxXzToQtog/exec";
const form = document.forms["data-score"];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => console.log("Success!", response))
    .catch((error) => console.error("Error!", error.message));
});
