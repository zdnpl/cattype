const element = document.querySelectorAll(".pilihan-tema");
const list = [];

function openThemeMenu() {
  document.querySelector(".tema").style.display = "block";
}

document.querySelector(".main-theme").classList.add(localStorage.getItem("color"));
document.querySelector(".nav-bertema").classList.add(localStorage.getItem("color"));

element.forEach((e) => {
  list.push(e.getAttribute("data-color"));

  e.addEventListener("click", function () {
    document.querySelector(".main-theme").classList.remove(...list);
    document.querySelector(".main-theme").classList.add(this.getAttribute("data-color"));
    document.querySelector(".nav-bertema").classList.remove(...list);
    document.querySelector(".nav-bertema").classList.add(this.getAttribute("data-color"));
    localStorage.setItem("color", this.getAttribute("data-color"));
    document.querySelector(".tema").style.display = "none";
  });
});
