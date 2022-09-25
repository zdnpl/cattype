// inputting data
const typingText = document.querySelector(".typing-text p"),
  inpField = document.querySelector(".wrapper .input-field"),
  timeTag = document.querySelector(".time"),
  TaBtn = document.querySelector("button .TaBtn"),
  playground = document.querySelector(".playground"),
  result = document.querySelector(".result");

// playground.style.display = "none";
result.style.display = "none";

let timer,
  maxTime = 60,
  timeLeft = maxTime,
  charIndex = (mistakes = isTyping = 0);
function loadParagraph() {
  const ranIndex = Math.floor(Math.random() * paragraphs.length);
  typingText.innerHTML = "";
  paragraphs[ranIndex].split("").forEach((char) => {
    let span = `<span>${char}</span>`;
    typingText.innerHTML += span;
  });
  typingText.querySelectorAll("span")[0].classList.add("active");
  document.addEventListener("keydown", () => inpField.focus());
  typingText.addEventListener("click", () => inpField.focus());
}
function initTyping() {
  let characters = typingText.querySelectorAll("span");
  let typedChar = inpField.value.split("")[charIndex];
  timeTag.style.opacity = "1";
  if (charIndex < characters.length - 1 && timeLeft > 0) {
    if (!isTyping) {
      timer = setInterval(initTimer, 1000);
      isTyping = true;
    }
    if (typedChar == null) {
      if (charIndex > 0) {
        charIndex--;
        if (characters[charIndex].classList.contains("incorrect")) {
          mistakes--;
        }
        characters[charIndex].classList.remove("correct", "incorrect");
      }
    } else {
      if (characters[charIndex].innerText == typedChar) {
        characters[charIndex].classList.add("correct");
      } else {
        mistakes++;
        characters[charIndex].classList.add("incorrect");
      }
      charIndex++;
    }
    characters.forEach((span) => span.classList.remove("active"));
    characters[charIndex].classList.add("active");
  } else {
    // stop timer
    clearInterval(timer);
    inpField.value = "";
    // ngitung hasil wpm
    let wpm = Math.round(((charIndex - mistakes) / 5 / (maxTime - timeLeft)) * 60);
    wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;

    wpmTag.innerText = wpm;
    mistakeTag.innerText = mistakes;
    let cpm = charIndex - mistakes;

    // ngitung akurasi
    let persentaseKesalahan = (mistakes / cpm) * 100;
    let acc = 100 - persentaseKesalahan;

    if (acc < 0) {
      acc = 0;
    }

    playground.style.display = "none";
    result.style.display = "flex";
    document.getElementById("mistakeTag").innerHTML = mistakes;
    document.getElementById("wpmTag").innerText = wpm;
    document.getElementById("cpmTag").innerText = cpm; //cpm will not count mistakes
    document.getElementById("accakhir").innerText = acc; //cpm will not count mistakes
  }
}
function initTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    timeTag.innerText = timeLeft;
    let wpm = Math.round(((charIndex - mistakes) / 5 / (maxTime - timeLeft)) * 60);
    wpmTag.innerText = wpm;
  } else {
    clearInterval(timer);
    inpField.value = "";

    playground.style.display = "none";
    result.style.display = "flex";
    document.getElementById("mistakeTag").innerHTML = mistakes;
    document.getElementById("wpmTag").innerText = wpm;
    document.getElementById("cpmTag").innerText = cpm; //cpm will not count mistakes
    document.getElementById("accakhir").innerText = acc; //cpm will not count mistakes
  }
}
function resetGame() {
  loadParagraph();
  clearInterval(timer);
  timeLeft = maxTime;
  charIndex = mistakes = isTyping = 0;
  inpField.value = "";
  timeTag.innerText = timeLeft;
  wpmTag.innerText = 0;
  mistakeTag.innerText = 0;
  cpmTag.innerText = 0;
}
loadParagraph();
inpField.addEventListener("input", initTyping);
// tryAgainBtn.addEventListener("click", resetGame);
