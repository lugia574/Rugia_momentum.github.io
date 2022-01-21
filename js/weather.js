const API_KEY = "f676441882de8ba82ca3efb542721bd9";

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const temp = document.querySelector("#weather .temp");
      const city = document.querySelector(
        "#weather .cityAndWeather span:first-child"
      );
      const weather = document.querySelector(
        "#weather .cityAndWeather span:last-child"
      );

      const humidity = document.querySelector("#humidity span:first-child");
      const wind = document.querySelector("#wind span:first-child");

      temp.innerHTML = `${Math.round(data.main.temp * 10) / 10}`;
      city.innerText = data.name;
      weather.innerText = data.weather[0].main;
      humidity.innerText = `${data.main["humidity"]}%`;
      wind.innerText = data.wind["speed"];

      const icon = document.querySelector("#weather_icon i");

      if (data.weather[0].main === "Clouds") {
        icon.classList.add("fa-cloud");
      } else if (data.weather[0].main === "Rain") {
        icon.classList.add("fa-cloud-showers-heavy");
      } else if (data.weather[0].main === "Snow") {
        icon.classList.add("fa-snowflake");
      } else if (data.weather[0].main === "Clear") {
        icon.classList.add("fa-sun");
      } else {
        icon.classList.add("fa-poo-storm");
      }
    });
}

function onGeoError() {
  alert("can't find you. No wether for you");
}
navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
