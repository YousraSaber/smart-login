//----------------------------- REGISTER PAGE -----------------------------
var regNameInput = document.querySelector("#userName");
var regEmailInput = document.querySelector("#userEmail");
var regPasswordInput = document.querySelector("#userPassword");
var signUpBtn = document.querySelector("#signUpBtn");
var successAlert = document.querySelector("#success");

// نتحقق إننا في صفحة register
if (regNameInput && regEmailInput && regPasswordInput && signUpBtn) {

    regNameInput.addEventListener("input", function () {
        validateUser(this);
    });
    regEmailInput.addEventListener("input", function () {
        validateUser(this);
    });
    regPasswordInput.addEventListener("input", function () {
        validateUser(this);
    });

    signUpBtn.addEventListener("click", function (e) {
        e.preventDefault();
        signUp();
        signUpSuccess();
    });
}

var users = JSON.parse(localStorage.getItem("users")) || [];

var regex = {
    userName: {
        value: /^[A-Za-z]{2,}$/,
        isValid: false
    },
    userEmail: {
        value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
        isValid: false
    },
    userPassword: {
        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i,
        isValid: false
    },
}


function signUp() {

    var user = {
        name: regNameInput.value,
        email: regEmailInput.value,
        password: regPasswordInput.value
    }
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users))
}

function validateUser(element) {
    if (regex[element.id].value.test(element.value)) {
        element.classList.add("is-valid")
        element.classList.remove("is-invalid")
        regex[element.id].isValid = true
        element.nextElementSibling.classList.replace("d-block", "d-none")
    } else {
        element.classList.add("is-invalid")
        element.classList.remove("is-valid")
        regex[element.id].isValid = false
        element.nextElementSibling.classList.replace("d-none", "d-block")
    }
    if (element.value == "") {
        element.classList.remove("is-valid")
        element.classList.remove("is-invalid")
        element.nextElementSibling.classList.replace("d-block", "d-none")
    }
    toggleBtn()
}

function toggleBtn() {
    if (regex.userName.isValid && regex.userEmail.isValid && regex.userPassword.isValid) {
        signUpBtn.disabled = false;
    }
    else {
        signUpBtn.disabled = true;
    }
}

function signUpSuccess() {
    successAlert.classList.replace("d-none", "d-block")
}
//-----------------------------------------------------------
//register -->> login

var signInLink = document.querySelector("#signInLink");
if (signInLink) {
    signInLink.addEventListener("click", function (e) {
        e.preventDefault();
        window.location.href = "index.html"
    })
}

//------------------------------------------------------------
// Login

var userEmailLogin = document.querySelector("#userEmailLogin");
var userPasswordLogin = document.querySelector("#userPasswordLogin");
var loginBtn = document.querySelector("#loginBtn");

var nameOfUser = ''

if (loginBtn) {
    loginBtn.addEventListener("click", function (e) {
        e.preventDefault();

        var userFound = false;

        for (var i = 0; i < users.length; i++) {
            if (
                users[i].email === userEmailLogin.value &&
                users[i].password === userPasswordLogin.value
            ) {
                userFound = true;
                nameOfUser = users[i].name
                break;
            }
        }

        if (userFound) {
            alert("Login successful!");
            localStorage.setItem("loggedUserName", nameOfUser);
            window.location.href = "home.html";
        } else {
            alert("Invalid email or password!");
        }
    });
}
//-----------------------------------------------------

// login -->> register
var signUpLink = document.querySelector("#signUpLink");
if (signUpLink) {
    signUpLink.addEventListener("click", function (e) {
        e.preventDefault();
        window.location.href = "register.html";
    });
}

//----------------------------------------------------------
//Home
var logOutBtn = document.querySelector("#logOutBtn");

if (logOutBtn) {
    logOutBtn.addEventListener("click", function () {
        window.location.href = "index.html";
    })
}
var loggedUserName = localStorage.getItem("loggedUserName");
var userNameHomeEl = document.getElementById("userNameHome");

if (userNameHomeEl && loggedUserName) {

    userNameHomeEl.textContent = `Welcome ${loggedUserName}`;
}

