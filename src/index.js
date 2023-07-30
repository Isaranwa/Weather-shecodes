function getWeather(response) {
  console.log(response);
  let city = document.querySelector("#city");
  city.innerHTML = response.data.city;
  let temperatureCelsius = document.querySelector("#temperature");
  temperatureCelsius.innerHTML = Math.round(response.data.temperature.current);
  let description = document.querySelector("#description");
  description.innerHTML = response.data.condition.description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML =
    "Humidity:" + " " + response.data.temperature.humidity + "%rh";
  let wind = document.querySelector("#wind");
  wind.innerHTML = "Wind:" + " " + response.data.wind.speed + "Km/hr";
  let pressure = document.querySelector("#pressure");
  pressure.innerHTML =
    "Pressure:" + " " + response.data.temperature.pressure + "Pa";
}

let apiKey = "e0t7f950c7oaba3945b7deeaff3001ac";
let city = "New York";
let backEnd = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
axios.get(backEnd).then(getWeather);
