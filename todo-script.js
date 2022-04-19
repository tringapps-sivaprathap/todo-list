const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const clearCompleted = document.querySelector(".clear-completed");
const clearList = document.querySelector(".clear-list");
const logout = document.querySelector(".logout");
const userName = document.querySelector(".username");
let todoComplete, todoTrash, loginDetails = {}, currentUser, taskDetails, userInput;

document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
clearCompleted.addEventListener("click", clearCompletedTodo);
clearList.addEventListener("click", clearAllTodo);
logout.addEventListener("click", userLogout);

// current username
loginDetails = JSON.parse(localStorage.getItem("logindetails"));
for(let user in loginDetails) {
    if(loginDetails.hasOwnProperty(user)) {
        if(loginDetails[user].currentuser == "true") {
            currentUser = loginDetails[user].username;
        }
    }
}
userName.innerHTML = currentUser;

// adding a task
function addTodo() {
    userInput = todoInput.value.trim();

    if(userInput != "") {
        const todoDiv = document.createElement("div");

        const newTodo = document.createElement("li");
        newTodo.classList.add("todo-item");
        newTodo.innerText = userInput;
        todoDiv.appendChild(newTodo);

        // completed button
        const compBtn = document.createElement("button");
        compBtn.innerText = "completed";
        compBtn.classList.add("todo-complete");
        compBtn.addEventListener("click", completeTodo);
        todoDiv.appendChild(compBtn);

        // trash button
        const trashBtn = document.createElement("button");
        trashBtn.innerText = "delete";
        trashBtn.classList.add("todo-trash");
        trashBtn.addEventListener("click", trashTodo);
        todoDiv.appendChild(trashBtn);

        todoList.appendChild(todoDiv);

        // saving new task localstorage
        taskDetails = JSON.parse(localStorage.getItem("taskdetails"));
        taskDetails[currentUser][userInput] = "false";
        localStorage.setItem("taskdetails", JSON.stringify(taskDetails));
    }

    todoInput.value = "";
}

// getting tasks after reload
function getTodos() {
    // selecting the current user from localstorage
    if(loginDetails[currentUser].currentuser == "true") {
        // getting current user tasks from localstorage
        taskDetails = JSON.parse(localStorage.getItem("taskdetails"));

        for(let task in taskDetails[currentUser]) {
            if(taskDetails[currentUser].hasOwnProperty(task)) {
                const todoDiv = document.createElement("div");

                const newTodo = document.createElement("li");
                newTodo.classList.add("todo-item");
                newTodo.innerText = task;
                if(taskDetails[currentUser][task] == "true")
                    newTodo.classList.add("completed");
                todoDiv.appendChild(newTodo);

                // completed button
                const compBtn = document.createElement("button");
                compBtn.innerText = "completed";
                compBtn.classList.add("todo-complete");
                if(taskDetails[currentUser][task] == "true")
                    compBtn.classList.add("completed-btn");
                compBtn.addEventListener("click", completeTodo);
                todoDiv.appendChild(compBtn);

                // trash button
                const trashBtn = document.createElement("button");
                trashBtn.innerText = "delete";
                trashBtn.classList.add("todo-trash");
                trashBtn.addEventListener("click", trashTodo);
                todoDiv.appendChild(trashBtn);

                todoList.appendChild(todoDiv);
            }
        }
    }
}

// if completed button clicked
function completeTodo(event) {
    let todoItem = event.target.parentNode;

    // changing styles of task and completed button
    event.target.classList.toggle("completed-btn");
    todoItem.firstChild.classList.toggle("completed");
    let todoTask = todoItem.firstChild.innerText;

    // storing to localstorage
    taskDetails = JSON.parse(localStorage.getItem("taskdetails"));
    if(todoItem.firstChild.classList.contains("completed"))
        taskDetails[currentUser][todoTask] = "true";
    else
        taskDetails[currentUser][todoTask] = "false";
    localStorage.setItem("taskdetails", JSON.stringify(taskDetails));
}

// if trash button clicked
function trashTodo(event) {
    let todoItem = event.target.parentNode;

    // removing the task from localstorage
    taskDetails = JSON.parse(localStorage.getItem("taskdetails"));
    delete taskDetails[currentUser][todoItem.firstChild.innerText];
    localStorage.setItem("taskdetails", JSON.stringify(taskDetails));

    // removing task from dom
    todoItem.remove();
}

// clearing all completed tasks
function clearCompletedTodo() {
    let completedTasks = document.querySelectorAll(".completed");

    // removing tasks from localstorage
    taskDetails = JSON.parse(localStorage.getItem("taskdetails"));
    for(let task of completedTasks) {
        delete taskDetails[currentUser][task.parentNode.firstChild.innerText];
        // removing tasks from dom
        task.parentNode.remove();
    }
    localStorage.setItem("taskdetails", JSON.stringify(taskDetails));
}

// clearing all tasks
function clearAllTodo() {
    let allTasks = document.querySelectorAll(".todo-list div");

    // removing all tasks from dom
    for(let task of allTasks)
        task.remove();

    // removing all tasks from currentuser in localstorage
    taskDetails = JSON.parse(localStorage.getItem("taskdetails"));
    taskDetails[currentUser] = {};
    localStorage.setItem("taskdetails", JSON.stringify(taskDetails));
}

// setting currentuser to false in localstorage if the user logout
function userLogout() {
    loginDetails[currentUser].currentuser = "false";
    localStorage.setItem("logindetails", JSON.stringify(loginDetails));
    
    location.href = "login.html";
}