let inputTime = document.getElementById("time");
let inputDate = document.querySelector("#date");

let dayDisplay = document.querySelector("#days");
let hrDisplay = document.querySelector("#hours");
let minDisplay = document.querySelector("#minutes");
let secDisplay = document.querySelector("#seconds");

let btn = document.querySelector("#submit-btn");

let futureDate;
let interval;

const saveToLocalStorage = () => {
  localStorage.setItem("fd", `${futureDate}`);
};

const getFromLS = () => {
  let d = localStorage.getItem("fd");

  if (d) {
    let dt = new Date(d);
    futureDate = dt;
    interval = setInterval(keepUpdating, 1000);
  }
};

let today = new Date();
const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, "0");
const dd = String(today.getDate()).padStart(2, "0");

const minDate = `${yyyy}-${mm}-${dd}`;
inputDate.min = minDate;

const hh = today.getHours();
const m = String(today.getMinutes()).padStart(2, "0");
const ss = String(today.getSeconds()).padStart(2, "0");

const minTime = `${hh}-${m}`;
inputTime.min = minTime;

const getDate = () => {
  let date = inputDate.value;
  let time = inputTime.value;

  const fd = new Date(`${date}T${time}`);

  return fd;
};

const keepUpdating = () => {
  let cd = new Date();

  let msRemaining = futureDate.getTime() - cd.getTime();

  if (msRemaining <= 0) {
    alert("Time Over");
    clearInterval(interval);
    inputDate.value = "";
    inputTime.value = "";
    return;
  }

  dayDisplay.textContent = String(
    Math.floor((msRemaining / (1000 * 60 * 60 * 24)) % 30)
  ).padStart(2, "0");
  hrDisplay.textContent = String(
    Math.floor((msRemaining / (1000 * 60 * 60)) % 24)
  ).padStart(2, "0");
  minDisplay.textContent = String(
    Math.floor((msRemaining / (1000 * 60)) % 60)
  ).padStart(2, "0");
  secDisplay.textContent = String(
    Math.floor((msRemaining / 1000) % 60)
  ).padStart(2, "0");
};

btn.addEventListener("click", () => {
  futureDate = getDate();
  saveToLocalStorage();

  interval = setInterval(keepUpdating, 1000);
});

getFromLS();
