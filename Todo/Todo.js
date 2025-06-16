let todoListUl = document.querySelector(".todo-list-ul");
let input = document.getElementById("todo");
let addBTN = document.getElementById("addtodobtn");
let deleteAllBTN = document.getElementById("deleteallbtn");

let todoList = [];

const getTodoList = () => {
  todoList = JSON.parse(localStorage.getItem("todo"));

  if (todoList) {
    showList()
    return todoList;
  } else return [];
};

const saveToLocalStorage = () => {
  localStorage.setItem("todo", JSON.stringify(todoList));
};

const addTask = (text) => {
  const task = { id: todoList ? todoList.length + 1 : 1, task: text };
  todoList.push(task);
  saveToLocalStorage();
};

const deleteTask = (idn) => {
    todoList = todoList.filter(to => to.id != idn)
    saveToLocalStorage();
    alert(`Task Deleted ${idn}`)
}

const showList = () => {
  todoList = JSON.parse(localStorage.getItem("todo"));

  if (todoList) {
    todoListUl.innerHTML = "";

    todoList.forEach((item, key = ind) => {
      let li = document.createElement("li");
      let btn = document.createElement("button")
      btn.textContent = "❌"
      btn.dataset.id = item.id;
      li.innerHTML = `${item.task}`;
      li.appendChild(btn);
      
      li.classList.add("todo-item");
      todoListUl.appendChild(li);
    });
  }
};

addBTN.addEventListener("click", (e) => {
  addTask(input.value);
  input.value = "";
  showList();
  console.log(todoList);
});

deleteAllBTN.addEventListener("click", ()=> {
    todoList = [];
    saveToLocalStorage();
    showList()
})

todoListUl.addEventListener("click", (e) => {
    if(e.target.tagName === "BUTTON"){
        deleteTask(e.target.dataset.id);
        showList();
    }
})


todoList = getTodoList();
