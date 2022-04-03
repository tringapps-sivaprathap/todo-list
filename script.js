const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const clearCompTodo = document.querySelector(".clear-comp-todo");
const ClearTodo = document.querySelector(".clear-todo");
const saveTodo = document.querySelector(".save-todo");
const showTodo = document.querySelector(".show-todo");

document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
clearCompTodo.addEventListener("click", clearCompleted);
ClearTodo.addEventListener("click", clearTodo);
saveTodo.addEventListener("click", saveTodoList);
showTodo.addEventListener("click", () => {
    document.location.reload();
});

// user login
let currentuser = JSON.parse(localStorage.getItem("currentuser"));
let usernumbers = currentuser + "nos";
var takenitem = [];
var takenitemcheck = [];

function addTodo(event) {
    // prevent form from submitting
    event.preventDefault();
    // todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    
    takenitem.push(todoInput.value);
    // console.log(takenitem);
    // check mark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    // trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    // append todo list
    todoList.appendChild(todoDiv);
    // clear todoinput value
    todoInput.value = "";
}

function deleteCheck(event) {
    const item = event.target;
    if(item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        removeLocalTodos(todo);
        todo.remove();
    }
    //check mark
    if(item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function clearCompleted() {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        if(todo.classList.contains("completed")) {
            todo.style.display = "none";
        }
    });
}

function clearTodo() {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        todo.style.display = "none";
    });
    takenitem = [];
    takenitemcheck = [];
    localStorage.removeItem(currentuser);
    localStorage.removeItem(usernumbers);
}

function saveTodoList() {
    takenitemcheck = [];
    takenitem = [];
    // console.log(todoList.childNodes);
    
    const mr = todoList.childNodes;
    mr.forEach(function(todo) {
        takenitem.push(todo.innerText);
    });
    mr.forEach(function(todo) {
        if(todo.classList.contains("completed")) {
            takenitemcheck.push("yes");
        }
        else {
            takenitemcheck.push("no");
        }
    });

    let todos, todoscheck;
    if(localStorage.getItem(currentuser) === null || localStorage.getItem(usernumbers) == null) {
        todos = [];
        todoscheck = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem(currentuser));
        todoscheck = JSON.parse(localStorage.getItem(usernumbers));
    }
    todoscheck = takenitemcheck;
    todos = takenitem;

    localStorage.setItem(currentuser, JSON.stringify(todos));
    localStorage.setItem(usernumbers, JSON.stringify(todoscheck));
}

function getTodos() {
    // check i already have things in there...
    let todos, todoscheck;
    if(localStorage.getItem(currentuser) === null) {
        todos = [];
        todoscheck = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem(currentuser));
        todoscheck = JSON.parse(localStorage.getItem(usernumbers));
    }
    var g = 0;
    todos.forEach(function(todo) {
    // todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    // check mark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    // trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    // strick if completed
    if(todoscheck[g] === "yes") {
        newTodo.classList.add("completed");
        completedButton.classList.add("completed");
        trashButton.classList.add("completed");
    }
    g++;
    // append todo list
    todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo) {
    const todoIndex = todo.children[0].innerText;
    takenitem.splice(takenitem.indexOf(todoIndex), 1);
    takenitemcheck.splice(takenitemcheck.indexOf(todoIndex), 1);
}