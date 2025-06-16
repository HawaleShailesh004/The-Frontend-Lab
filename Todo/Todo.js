// DOM Element References
const todoListElement = document.querySelector(".todo-list-ul");
const todoInput = document.getElementById("todo");
const addButton = document.getElementById("addtodobtn");
const deleteAllButton = document.getElementById("deleteallbtn");

// Data
let todoList = [];

// Load todos from LocalStorage
const getTodoList = () => {
  const storedTodos = JSON.parse(localStorage.getItem("todo"));
  if (storedTodos) {
    todoList = storedTodos;
    renderTodoList();
    return storedTodos;
  }
  return [];
};

// Save current list to LocalStorage
const saveToLocalStorage = () => {
  localStorage.setItem("todo", JSON.stringify(todoList));
};

// Add a new task
const addTask = (text) => {
  const newTask = {
    id: todoList.length + 1,
    task: text.trim(),
  };
  todoList.push(newTask);
  saveToLocalStorage();
};

// Delete a task by ID
const deleteTask = (id) => {
  todoList = todoList.filter((todo) => todo.id != id);
  saveToLocalStorage();
  alert(`Task Deleted: ${id}`);
};

// Render all tasks to the UI
const renderTodoList = () => {
  todoListElement.innerHTML = "";

  todoList.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.classList.add("todo-item");

    listItem.innerHTML = `${item.task}`;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "❌";
    deleteButton.dataset.id = item.id;

    listItem.appendChild(deleteButton);
    todoListElement.appendChild(listItem);
  });
};

// Event: Add Task
addButton.addEventListener("click", () => {
  const taskText = todoInput.value.trim();
  if (taskText) {
    addTask(taskText);
    todoInput.value = "";
    renderTodoList();
  }
});

// Event: Delete All Tasks
deleteAllButton.addEventListener("click", () => {
  todoList = [];
  saveToLocalStorage();
  renderTodoList();
});

// Event: Delete Single Task
todoListElement.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    deleteTask(e.target.dataset.id);
    renderTodoList();
  }
});

// Initial Load
todoList = getTodoList();
