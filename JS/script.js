// inputting data
const typingText = document.querySelector(".typing-text p"),
  inpField = document.querySelector(".wrapper .input-field"),
  timeTag = document.querySelector(".time"),
  mistakeTag = document.querySelector(".mistake span"),
  wpmTag = document.querySelector(".wpm span"),
  cpmTag = document.querySelector(".cpm span"),
  TaBtn = document.querySelector("button .TaBtn");

//  data
let timer,
  maxTime = 30,
  timeLeft = maxTime,
  charIndex = (mistakes = isTyping = 0);

function randomParaghraph() {
  // getting random number
  let randIndex = Math.floor(Math.random() * paragraphs.length);
  typingText.innerHTML = "";
  // show random text
  paragraphs[randIndex].split("").forEach((span) => {
    let spanTag = `<span>${span}</span>`;
    typingText.innerHTML += spanTag;
  });
  //   focus input field on keydown or click event
  document.addEventListener("keydown", () => inpField.focus());
  typingText.addEventListener("click", () => inpField.focus());
}

function initTyping() {
  const characters = typingText.querySelectorAll("span");
  let typedChar = inpField.value.split("")[charIndex];
  timeTag.style.opacity = "1";

  if (charIndex < characters.length - 1 && timeLeft > 0) {
    //kalo timernya jalan, gaakan restart lagi kalo diketik
    if (!isTyping) {
      timer = setInterval(initTimer, 1000);
      isTyping = true;
    }

    //   if user hasnt entered any char or pressed backspace
    if (typedChar == null) {
      charIndex--; //hapus charindex
      if (characters[charIndex].classList.contains("incorrect")) {
        mistakes--;
      }
      characters[charIndex].classList.remove("correct", "incorrect");
    } else {
      if (characters[charIndex].innerText === typedChar) {
        characters[charIndex].classList.add("correct");
      } else {
        mistakes++;
        characters[charIndex].classList.add("incorrect");
      }
      charIndex++;
    }
    characters.forEach((span) => span.classList.remove("active"));
    characters[charIndex].classList.add("active");

    // counting CPM
    let cpm = (charIndex - mistakes) * 2;

    //   counting WPM
    // let wpm = Math.round(((charIndex - mistakes) / 5 / (maxTime - timeLeft)) * 60);
    let wpm = cpm / 5;
    wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;

    mistakeTag.innerText = mistakes;
    wpmTag.innerText = wpm;
    cpmTag.innerText = cpm; //cpm will not count mistakes
  } else {
    inpField.value = "";
    clearInterval(timer);
  }
}

function initTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    timeTag.innerText = timeLeft;
  } else {
    clearInterval(timer);
  }
}

// calling function
randomParaghraph();
inpField.addEventListener("input", initTyping);
