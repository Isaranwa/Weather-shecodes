function formatDate(timeStamp) {
  let date = new Date();
  let days = ["Sunday", "Monday", "Tuesday", "Thursday", "Wednesday", "Friday"];
  let day = days[date.getDay()];
  let hour = date.getHours();

  function greetUser() {
    let greeting = ("Good Morning", "Good Afternoon", "Good Evening");
    if (hour < 12) {
      return "Good Morning!";
    } else if (hour >= 12 && hour <= 18) {
      return "Good Afternoon!";
    } else {
      return "Good Evening!";
    }
  }

  let greeting = document.querySelector("#greet");
  greeting.innerHTML = greetUser();

  if (hour < 10) {
    hour = "0" + hour;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  return `Last updated: ${day}, ${hour}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  let day = days[date.getDay()];
  return day;
}

function daysForecast(response) {
  let forecast = document.querySelector("#forecast");
  let daysForecast = response.data.daily;
  let forecastHTML = `<div class="row">`;
  daysForecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2" id="border">
              <h5 id="one">${formatDay(forecastDay.time)}</h5>
              <img src="${forecastDay.condition.icon_url}" alt="${
          forecastDay.condition.icon
        }" />
              <p><span class="maxTemp">${Math.round(
                forecastDay.temperature.maximum
              )}</span> <span class="minTemp">${Math.round(
          forecastDay.temperature.minimum
        )}</span></p>
            </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecast.innerHTML = forecastHTML;
}
//use coordinates to ge the weather forecast for city
function getForecast(coordinates) {
  let apiKey = "e0t7f950c7oaba3945b7deeaff3001ac";
  let backEnd = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}`;
  axios.get(backEnd).then(daysForecast);
}
//Display of the weather app
function getWeather(response) {
  let city = document.querySelector("#city");
  let temperatureCelsius = document.querySelector("#temperature");
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let pressure = document.querySelector("#pressure");
  let day = document.querySelector("#date");
  let icon = document.querySelector("#icon");
  description.innerHTML = response.data.condition.description;
  celciusTemperature = response.data.temperature.current;
  city.innerHTML = response.data.city;
  temperatureCelsius.innerHTML = Math.round(celciusTemperature);
  humidity.innerHTML =
    "Humidity:" + " " + response.data.temperature.humidity + "%rh";
  wind.innerHTML = "Wind:" + " " + response.data.wind.speed + "Km/hr";
  pressure.innerHTML =
    "Pressure:" + " " + response.data.temperature.pressure + "Pa";
  day.innerHTML = formatDate(response.data.time * 1000);

  icon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  icon.setAttribute("alt", response.data.condition.icon);
  getForecast(response.data.coordinates);
}
function getCity(city) {
  let apiKey = "e0t7f950c7oaba3945b7deeaff3001ac";
  let backEnd = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(backEnd).then(getWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search");
  getCity(city.value);
}
let form = document.querySelector("#form-search");
form.addEventListener("submit", handleSubmit);
getCity("New York");
let city = "New york";

function displayInFarenheit(event) {
  event.preventDefault();
  let farenheitTemp = Math.round((celciusTemperature * 9) / 5 + 32);
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = farenheitTemp;
}
let celciusTemperature = null;
let farenheit = document.querySelector("#farenheit");
farenheit.addEventListener("click", displayInFarenheit);

function displayInCelcius(event) {
  event.preventDefault();
  let celciusTemp = document.querySelector("#temperature");
  celciusTemp.innerHTML = Math.round(celciusTemperature);
}
let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", displayInCelcius);
