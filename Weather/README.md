# 🌤️ Weather App

A modern weather app that fetches real-time weather data based on user input using the WeatherAPI.

## ✨ Features

- Search weather by city name  
- Displays city, state, country, and time zone  
- Shows current temperature and weather condition  
- Loading animation while fetching data  
- Clean, responsive UI  

## 🧠 Key Concepts

- DOM manipulation and event handling  
- API fetching with `async/await`  
- Error handling and loading states  
- Dynamic UI updates  

## ⚙️ Tech Stack

- HTML5  
- CSS3 (custom styled UI)  
- JavaScript (Vanilla)  
- [WeatherAPI](https://www.weatherapi.com/) for data  

## ▶️ How to Use

1. Enter a valid city name in the input box  
2. Click **Get Weather Update**  
3. View detailed weather info including temperature and conditions  
4. If input is empty or invalid, you'll see an error prompt  

---

🔑 **Note:** Make sure to replace the API key with your own in `Weather.js` for it to work:

```js
const res = await fetch(
  `http://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=${city}&aqi=yes`
);
