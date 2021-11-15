const inputElement = document.forms[0].input;
const ulElement = document.querySelector("ul");

const todos = JSON.parse(localStorage.getItem("todos"));

if (todos) {
  todos.forEach((todo) => {
    todoAdd(todo);
  });
}
document.forms[0].addEventListener("submit", (event) => {
  event.preventDefault();
  todoAdd();
});
function todoAdd(todo) {
  const liElement = document.createElement("li");
  let todoElement = inputElement.value;

  if (todo) {
    if (todo.completed) liElement.classList.add("completed");
    todoElement = todo.text;
  }
  if (todoElement) {
    liElement.textContent = todoElement;
  }
  liElement.addEventListener("click", (e) => {
    liElement.classList.toggle("completed");
    updateLocalStorage(); //to update in local storage the state of canceled
  });
  liElement.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    liElement.remove();
    updateLocalStorage(); //to update in local storage the state of removed
  });
  ulElement.append(liElement);
  inputElement.value = "";
  updateLocalStorage();
}

// function toggleFunction(e) {
//   if (e.target.tagName === "LI") {
//     e.target.classList.toggle("completed");
//   }
// }
// ulElement.addEventListener("click", toggleFunction);
function updateLocalStorage() {
  const todoElements = document.querySelectorAll("li");
  const todos = [];
  todoElements.forEach((todo) => {
    todos.push({
      text: todo.textContent,
      completed: todo.classList.contains("completed"),
    });
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}
