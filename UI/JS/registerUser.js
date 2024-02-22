// const formRegister = document.querySelector(".formRegister") as HTMLElement;
var emailInputCont = document.getElementById("email");
var namesInputCont = document.getElementById("names");
var passwordInputCont = document.getElementById("password");
var cpasswordInputCont = document.getElementById("confirm-password");
var buttonSignUpBtn = document.querySelector(".button");
var errorMessageCont = document.querySelector(".error");
window.addEventListener("load", function () {
    var usersData = localStorage.getItem("userCredentials");
    var data = [];
    if (usersData) {
        data = JSON.parse(usersData);
        data.forEach(function (element) {
            if (element.authenticated) {
                window.location.href = "../../index.html";
            }
        });
    }
    console.log("hello");
});
buttonSignUpBtn.addEventListener("click", function (e) {
    e.preventDefault();
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInputCont.value === "" ||
        namesInputCont.value === "" ||
        passwordInputCont.value === "" ||
        cpasswordInputCont.value === "") {
        errorMessageCont.innerHTML = "Please fill all the fields";
        errorMessageCont.style.color = "#FF0000";
        setTimeout(function () {
            errorMessageCont.innerHTML = "";
        }, 3000);
    }
    else if (!emailRegex.test(emailInputCont.value)) {
        errorMessageCont.innerHTML = "Please enter a valid email address";
        errorMessageCont.style.color = "#FF0000";
        setTimeout(function () {
            errorMessageCont.innerHTML = "";
        }, 3000);
    }
    else if (passwordInputCont.value.length <= 6 ||
        namesInputCont.value.length <= 2) {
        errorMessageCont.innerHTML = "Please Enter Strong Password";
        errorMessageCont.style.color = "#FF0000";
        setTimeout(function () {
            errorMessageCont.innerHTML = "";
        }, 3000);
    }
    else if (passwordInputCont.value === cpasswordInputCont.value) {
        var userData = {
            id: Date.now(),
            email: emailInputCont.value,
            names: namesInputCont.value,
            password: passwordInputCont.value,
            confirmPassword: cpasswordInputCont.value,
            date: new Date().toISOString(),
            authenticated: false,
        };
        var contentData = localStorage.getItem("userCredentials");
        var existingData = void 0;
        if (contentData) {
            existingData = JSON.parse(contentData) || [];
        }
        existingData.push(userData);
        var updatedDataString = JSON.stringify(existingData);
        localStorage.setItem("userCredentials", updatedDataString);
        errorMessageCont.innerHTML = "User successfully registered.";
        errorMessageCont.style.color = "#059669";
        emailInputCont.value = "";
        namesInputCont.value = "";
        passwordInputCont.value = "";
        cpasswordInputCont.value = "";
        setTimeout(function () {
            window.location.href = "../pages/login.html";
        }, 1000);
    }
    else {
        errorMessageCont.innerHTML = "Password doesn't match";
        errorMessageCont.style.color = "#b91c1c";
        setTimeout(function () {
            errorMessageCont.innerHTML = "";
        }, 3000);
    }
});
