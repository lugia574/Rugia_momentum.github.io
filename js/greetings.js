const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

function onLoginSubmit(event) {
  event.preventDefault();
  const username = loginInput.value;
  localStorage.setItem(USERNAME_KEY, username);

  loginForm.classList.add(HIDDEN_CLASSNAME);

  paintGreetings(username);
}

function paintGreetings(username) {
  const date = new Date();
  const hours = date.getHours();

  if (hours >= 5 && hours <= 11) {
    greeting.innerText = `Good morning ${username}`;
  } else if (hours >= 12 && hours <= 5) {
    greeting.innerText = `Good afternoon ${username}`;
  } else {
    greeting.innerText = `Good evening ${username}`;
  }
  greeting.classList.remove(HIDDEN_CLASSNAME);
}

const saverUsername = localStorage.getItem(USERNAME_KEY);

if (saverUsername === null) {
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  loginForm.addEventListener("submit", onLoginSubmit);
} else {
  paintGreetings(saverUsername);
}
