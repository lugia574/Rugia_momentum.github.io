const toDoForm = document.getElementById("todo-form");
const toDoList = document.getElementById("todo-list");
// const toDoForm = document.querySelector("#todo-form");
// const toDoList = document.querySelector("#todo-list");

const toDoInput = toDoForm.querySelector("input");
// 이거랑 같음  document.querySelector("#todo-form input");

const TODOS_KEY = "toDos";

let toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
  const delLi = event.target.parentElement.parentElement;
  delLi.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(delLi.id));
  saveToDos();
}

const LINETHROUGH = "lineThrough";

function lineThrough(event) {
  const lineThrough = event.target.parentElement.parentElement;
  const lineThroughClass = lineThrough.classList;

  if (lineThroughClass.value.includes(LINETHROUGH)) {
    lineThrough.classList.remove(LINETHROUGH);
  } else {
    lineThrough.classList.add(LINETHROUGH);
  }
}

function paintToDo(newToDo) {
  const toDoLi = document.createElement("li");
  toDoLi.id = newToDo.id;

  if (newToDo.cheack === LINETHROUGH) {
    toDoLi.classList.add(LINETHROUGH);
  }

  const toDoSpan = document.createElement("span");
  toDoSpan.innerText = newToDo.text;

  const toDoIcon = document.createElement("div");
  const ToDoButton = document.createElement("button");
  const ToDoButton2 = document.createElement("button");
  ToDoButton.innerText = "✔";
  ToDoButton2.innerText = "✖";

  toDoIcon.appendChild(ToDoButton);
  toDoIcon.appendChild(ToDoButton2);

  ToDoButton.addEventListener("click", lineThrough);
  ToDoButton2.addEventListener("click", deleteToDo);

  toDoLi.append(toDoSpan);
  toDoLi.appendChild(toDoIcon);

  toDoList.appendChild(toDoLi);
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newToDo = toDoInput.value;
  toDoInput.value = "";

  const newToDoObj = {
    text: newToDo,
    id: Date.now(),
    cheack: false,
  };

  toDos.push(newToDoObj);
  paintToDo(newToDoObj);
  saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;

  parsedToDos.forEach(paintToDo);
}
