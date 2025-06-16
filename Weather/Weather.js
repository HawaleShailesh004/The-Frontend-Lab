let input = document.querySelector("input");
let btn = document.querySelector("button");
let errP = document.querySelector(".err");
let loader = document.querySelector(".loader");
let opContainer = document.querySelector(".output-container");

let dataToShow = ["city", "State", "Country", "Time-Zone"];

let data = {};

const displayData = (data) => {
  let cityP = document.getElementById("city");
  let regionP = document.getElementById("region");
  let countryP = document.getElementById("country");
  let tzP = document.getElementById("time-zone");

  let tempretureP = document.getElementById("tempreture");
  let conditionP = document.getElementById("condition");
  let image = document.querySelector("img");

  cityP.textContent = `City: ${data.location.name}`;
  regionP.textContent = `Region: ${data.location.region}`;
  countryP.textContent = `Country: ${data.location.country}`;
  tzP.textContent = `Time-Zone: ${data.location.tz_id}`;

  tempretureP.textContent = `Temprature: ${data.current.temp_c}`;
  conditionP.textContent = `Condition: ${data.current.condition.text}`;
  image.src = data.current.condition.icon;
  image.style.display = "block";
};
const fetchWeather = async (city) => {
  loader.style.display = "block";
  opContainer.style.display = "none";

  try {
    const res = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=08d05598363b4c2d9ca192903241704&q=${city}&aqi=yes`
    );

    if (!res.ok) throw Error("City not Found");
    const data = await res.json();
    displayData(data);
  } catch(err) {
    console.log(err)
  } finally {
    loader.style.display = "none";
    opContainer.style.display = "flex";
  }
};

btn.addEventListener("click", () => {
  if (input.value) {
    fetchWeather(input.value);
    errP.style.display = "none";
  } else {
    errP.style.display = "block";
  }
});
