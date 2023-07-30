function formatDate(timeStamp) {
  let date = new Date();
  console.log(date);
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Friday"];
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
function getWeather(response) {
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
  let day = document.querySelector("#date");
  day.innerHTML = formatDate(response.data.time * 1000);
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  icon.setAttribute("alt", response.data.condition.icon);
}

let apiKey = "e0t7f950c7oaba3945b7deeaff3001ac";
let city = "New York";
let backEnd = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
axios.get(backEnd).then(getWeather);
