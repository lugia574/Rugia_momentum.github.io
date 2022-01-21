const clock = document.querySelector("#clock");
const weekToday = document.querySelector("#week-today span");
const week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Webnesday",
  "thursday",
  "friday",
  "Saturday",
];

function getClock() {
  const date = new Date();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  clock.innerText = `${hours}:${minutes}`;
}

function getDate() {
  const date = new Date();
  const dayOfWeek = week[date.getDay()];
  weekToday.innerText = `${dayOfWeek}  ${date.getDate()}`;
}

getDate();
getClock();
setInterval(getClock, 1000);
