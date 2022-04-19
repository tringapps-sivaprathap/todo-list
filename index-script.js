const username = document.getElementById("username");
const password = document.getElementById("password");
const submit = document.getElementById("submit");

submit.addEventListener("click", () => {
    let loginDetails, user, taskDetails, tempName = username.value.trim().toLowerCase(), tempPass = password.value.trim();
    user = {
        "username": "",
        "password": "",
        "currentuser": true
    }

    // creating logindetails object in localstorage
    if(localStorage.getItem("logindetails") == null) {
        loginDetails = {};
    }
    else {
        loginDetails = JSON.parse(localStorage.getItem("logindetails"));
    }

    // validating input and storing in localstorage
    if(tempName == "" || tempPass == "") {
        alert("Fill all the details!");
    }
    else if(tempName in loginDetails) {
        alert("Username already Exist!");
    }
    else {
        user.username = tempName;
        user.password = tempPass;
        loginDetails[tempName] = user;
        localStorage.setItem("logindetails", JSON.stringify(loginDetails));

        // creating taskdetails object in localstorage
        if(localStorage.getItem("taskdetails") == null) {
            taskDetails = {};
        }
        else { // creating object for the currentuser inside taskdetails object
            taskDetails = JSON.parse(localStorage.getItem("taskdetails"));
        }
        taskDetails[tempName] = {};
        localStorage.setItem("taskdetails", JSON.stringify(taskDetails));

        location.href = "todo.html";
    }
});