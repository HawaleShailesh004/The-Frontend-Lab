// Element references
const inputField = document.querySelector("input");
const fetchButton = document.querySelector("button");
const errorMessage = document.querySelector(".err");
const loader = document.querySelector(".loader");
const outputContainer = document.querySelector(".output-container");
const weatherImage = document.querySelector("img");

// Display weather data on screen
const displayWeather = (weatherData) => {
  outputContainer.style.display = "flex";
  document.getElementById(
    "city"
  ).textContent = `City: ${weatherData.location.name}`;
  document.getElementById(
    "region"
  ).textContent = `Region: ${weatherData.location.region}`;
  document.getElementById(
    "country"
  ).textContent = `Country: ${weatherData.location.country}`;
  document.getElementById(
    "time-zone"
  ).textContent = `Time-Zone: ${weatherData.location.tz_id}`;

  document.getElementById(
    "tempreture"
  ).textContent = `Temperature: ${weatherData.current.temp_c}°C`;
  document.getElementById(
    "condition"
  ).textContent = `Condition: ${weatherData.current.condition.text}`;

  weatherImage.src = weatherData.current.condition.icon;
  weatherImage.style.display = "block";
};

// Fetch weather data from API
const fetchWeatherData = async (cityName) => {
  loader.style.display = "block";
  outputContainer.style.display = "none";

  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=08d05598363b4c2d9ca192903241704&q=${cityName}&aqi=yes`
    );

    if (!response.ok) throw new Error("City not found");

    const weatherData = await response.json();
    displayWeather(weatherData);
  } catch (error) {
    console.error("Fetch error:", error);
    errorMessage.style.display = "block";
  } finally {
    loader.style.display = "none";
    outputContainer.style.display = "flex";
  }
};

// Button click event
fetchButton.addEventListener("click", () => {
  const city = inputField.value.trim();

  if (city) {
    errorMessage.style.display = "none";
    fetchWeatherData(city);
  } else {
    errorMessage.style.display = "block";
  }
});
