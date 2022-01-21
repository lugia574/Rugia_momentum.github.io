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
  const delLi = event.target.parentElement;
  delLi.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(delLi.id));
  saveToDos();
}

function paintToDo(newToDo) {
  const toDoLi = document.createElement("li");
  toDoLi.id = newToDo.id;
  const toDoSpan = document.createElement("span");
  toDoSpan.innerText = newToDo.text;

  const ToDoButton = document.createElement("button");
  ToDoButton.innerText = "✔";

  ToDoButton.addEventListener("click", deleteToDo);

  toDoLi.append(toDoSpan);
  toDoLi.appendChild(ToDoButton);

  toDoList.appendChild(toDoLi);
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newToDo = toDoInput.value;
  toDoInput.value = "";

  const newToDoObj = {
    text: newToDo,
    id: Date.now(),
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
