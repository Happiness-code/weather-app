

function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
   celsiusTemperature = response.data.main.temp;
    document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
     let iconElement = document.querySelector("#icon");
     iconElement.setAttribute(
       "src",
       `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
     );
     iconElement.setAttribute("alt", response.data.weather[0].description);
getForecast(response.data.coord)
}

function displayForecast(response) {
  console.log(response.data.daliy)
  let forecastElement = document.querySelector("#forecast");
  forecastHTML = `<div class="row">`;
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      ` <div class="col">
              <div class="WeatherForecastPreview">
                <div class="forecast-time">${day}</div>
          <img
                  src="http://openweathermap.org/img/wn/50d@2x.png"
                  alt=""
                  width="42">
          <div class="forecast-temperature">
            <span class="forecast-temperature-max">28°</span>
            <span class="forecast-temperature-min">17°</span>
          </div>
          </div>
        </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "d33243fa11c3284dcffcf337fc75caaa";
  let apiUrl = ` https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=matric`;
  axios.get(apiUrl).then(displayForecast);
}

function search(city) {
  let apiKey = "d33243fa11c3284dcffcf337fc75caaa";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let celsiusTemperature = null;
search("Madrid, Spain");

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", showCity);
function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "d33243fa11c3284dcffcf337fc75caaa";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&`;
  axios.get(apiUrl).then(displayWeather);
}
function locationButton(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", locationButton);


let date = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thurday",
  "Friday",
  "Saturday",
];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let year = date.getFullYear();
let day = days[date.getDay()];
let month = months[date.getMonth()];
let formateDate = date.getDate();
let hours = date.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = date.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let h3 = document.querySelector("h3");
h3.innerHTML = `${day}, ${month} ${formateDate}, ${year}. ${hours}:${minutes}`;

