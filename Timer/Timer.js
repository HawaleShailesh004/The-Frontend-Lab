// DOM Elements
const inputTime = document.getElementById("time");
const inputDate = document.querySelector("#date");

const dayDisplay = document.querySelector("#days");
const hrDisplay = document.querySelector("#hours");
const minDisplay = document.querySelector("#minutes");
const secDisplay = document.querySelector("#seconds");

const btn = document.querySelector("#submit-btn");

let futureDate;
let interval;

// Save future date to LocalStorage
const saveToLocalStorage = () => {
  localStorage.setItem("fd", `${futureDate}`);
};

// Load date from LocalStorage
const getFromLS = () => {
  const stored = localStorage.getItem("fd");

  if (stored) {
    futureDate = new Date(stored);
    interval = setInterval(keepUpdating, 1000);
  }
};

// Setup today's min date
const today = new Date();
const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, "0");
const dd = String(today.getDate()).padStart(2, "0");
inputDate.min = `${yyyy}-${mm}-${dd}`;

// Setup current time as minTime (optional)
const hh = String(today.getHours()).padStart(2, "0");
const m = String(today.getMinutes()).padStart(2, "0");
inputTime.min = `${hh}:${m}`;

// Get future date from inputs
const getDate = () => {
  const date = inputDate.value;
  const time = inputTime.value;
  return new Date(`${date}T${time}`);
};

// Countdown update function
const keepUpdating = () => {
  const current = new Date();
  const msRemaining = futureDate.getTime() - current.getTime();

  if (msRemaining <= 0) {
    alert("⏰ Time Over");
    clearInterval(interval);
    localStorage.removeItem("fd");
    inputDate.value = "";
    inputTime.value = "";
    return;
  }

  const days = Math.floor((msRemaining / (1000 * 60 * 60 * 24)) % 30);
  const hours = Math.floor((msRemaining / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((msRemaining / (1000 * 60)) % 60);
  const seconds = Math.floor((msRemaining / 1000) % 60);

  dayDisplay.textContent = String(days).padStart(2, "0");
  hrDisplay.textContent = String(hours).padStart(2, "0");
  minDisplay.textContent = String(minutes).padStart(2, "0");
  secDisplay.textContent = String(seconds).padStart(2, "0");
};

// Button click: Start countdown
btn.addEventListener("click", () => {
  futureDate = getDate();
  if (!futureDate || isNaN(futureDate)) return;

  saveToLocalStorage();
  clearInterval(interval); // prevent multiple intervals
  interval = setInterval(keepUpdating, 1000);
});

// On load
getFromLS();
