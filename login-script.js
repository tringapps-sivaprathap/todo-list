const username = document.getElementById("username");
const password = document.getElementById("password");
const submit = document.getElementById("submit");

submit.addEventListener("click", () => {
    let loginDetails = JSON.parse(localStorage.getItem("logindetails"));
    let tempName = username.value.trim().toLowerCase(), tempPass = password.value.trim();
    
    if(tempName == "" || tempPass == "") {
        alert("Fill all the details!");
    }
    else if(loginDetails[tempName] == undefined) {
        alert("Username doesn't Exist!");
    }
    else if(tempPass != loginDetails[tempName].password) {
        alert("Wrong password!");
    }
    else {
        loginDetails[tempName].currentuser = true;
        localStorage.setItem("logindetails", JSON.stringify(loginDetails));

        location.href = "todo.html";
    }
});