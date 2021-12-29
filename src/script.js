//import "./styles.css";
//import { countdown } from "./countdown.js";

const phrases = [
  "According to consensus in modern genetics, anatomically modern humans first arrived on the Indian subcontinent from Africa between 73,000 and 55,000 years ago.",
  "In early second millennium BCE persistent drought caused the population of the Indus Valley to scatter from large urban centres to villages. Around the same time",
  "Most of the Indian subcontinent was conquered by the Maurya Empire during the 4th and 3rd centuries BCE. From the 3rd century BCE onwards"
];

let phrase = document.getElementById("phrase");
let refreshBtn = document.getElementById("refreshBtn");
let startButton = document.getElementById("startBtn");
let submitButton = document.getElementById("submitBtn");
let startCount;
let futureTime;
let typingSpeed;
let timeTakenInSec;

function init() {
  document.getElementById("typingarea").value = "";
  document.getElementById("typingarea").setAttribute("disabled", "");

  changePhrase();
}

const changePhrase = () => {
  let num = Math.floor(Math.random() * phrases.length);
  return (phrase.innerHTML = phrases[num]);
};

document.onload = init();

refreshBtn.addEventListener("click", changePhrase);

let selectedTime = document.getElementById("selectTime");
selectedTime.addEventListener("change", function () {
  let t = document.querySelector("#counter > h1 > span");

  t.innerHTML = selectedTime.value;
});

function setFutureTime() {
  futureTime = Date.now() + 60000 * parseInt(selectedTime.value);
  // countdown(future);
  startCount = setInterval(countdown, 1000);

  //countdown
  function countdown() {
    //let future = Date.parse("jun 12, 2022 01:30:00");
    let now = Date.now();
    //let future = now + 60000 * 1;
    //debugger;
    let diff = futureTime - now;

    let days = Math.floor(diff / (1000 * 60 * 60 * 24));
    let hours = Math.floor(diff / (1000 * 60 * 60));
    let mins = Math.floor(diff / (1000 * 60));
    let secs = Math.floor(diff / 1000);

    let d = days;
    let h = hours - days * 24;
    let m = mins - hours * 60;
    let s = secs - mins * 60;

    document.querySelector("#countdown").innerHTML =
      "<span>" + m + "</span>:" + s;
  }
}

//How many words in the phrase
let phraseWords = document.getElementById("phrase").innerHTML.split(" ");
let phraseWordsLength = phraseWords.length;

startButton.addEventListener("click", function () {
  //start countdown
  setFutureTime();
  selectedTime.setAttribute("disabled", "");
  this.classList.toggle("d-none");
  submitButton.classList.toggle("d-none");
  document.getElementById("typingarea").removeAttribute("disabled");
  document.getElementById("typingarea").focus();
  document.getElementById("refreshBtn").setAttribute("disabled", "");
});

submitButton.addEventListener("click", function () {
  //stop countdown
  clearInterval(startCount);
  //setFutureTime();
  let timeTaken =
    Date.now() + 60000 * parseInt(selectedTime.value) - futureTime;
  timeTakenInSec = Math.floor(timeTaken / 1000) + 1;
  let takenInMin = Math.floor(timeTakenInSec / 60);

  //How many words user typed in
  let typedWords = document.getElementById("typingarea").value.split(" ");
  let typedWordsLength = typedWords.length;
  typingSpeed = (typedWordsLength / timeTakenInSec) * 60;
  typingSpeed = Math.floor(typingSpeed);
  debugger;
  document.querySelector(".wpm").innerHTML = typingSpeed;
  document.querySelector(".min").innerHTML = takenInMin;
  document.querySelector(".sec").innerHTML = timeTakenInSec % 60;
  document.getElementById("result").classList.remove("d-none");
  document.getElementById("phrases").classList.add("d-none");
  this.setAttribute("disabled", "");
});
