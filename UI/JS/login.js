// const formLogin = document.querySelector(".formLogin") as HTMLFormElement;
var emailINPUTCont = document.getElementById("email");
var passwordINPUTCont = document.getElementById("password");
var buttonSignInSubmit = document.querySelector(".button");
var messagesCont = document.querySelector(".message");
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
buttonSignInSubmit.addEventListener("click", function (e) {
    e.preventDefault();
    // Regular expression for email validation
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailINPUTCont.value)) {
        messagesCont.innerHTML = "Please enter a valid email address";
        messagesCont.style.color = "#FF0000";
        setTimeout(function () {
            messagesCont.innerHTML = "";
        }, 3000);
    }
    else {
        var loginCredentials = {
            email: emailINPUTCont.value,
            password: passwordINPUTCont.value,
        };
        var authenticated = false;
        var usersData = localStorage.getItem("userCredentials");
        var data = [];
        if (usersData) {
            data = JSON.parse(usersData);
        }
        if (data) {
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var user = data_1[_i];
                if (user.email === loginCredentials.email &&
                    user.password === loginCredentials.password) {
                    authenticated = true;
                    // Set authenticated to true for the logged-in user
                    user.authenticated = true;
                    break;
                }
            }
            if (authenticated) {
                // Save the updated data back to localStorage
                localStorage.setItem("userCredentials", JSON.stringify(data));
                setTimeout(function () {
                    messagesCont.innerHTML = "";
                    window.location.href = "../../index.html";
                }, 1000);
                messagesCont.innerHTML = "Logged in Successfully";
                messagesCont.style.color = "#1e40af";
                // Clear input fields after checking credentials
                emailINPUTCont.value = "";
                passwordINPUTCont.value = "";
            }
            else {
                setTimeout(function () {
                    messagesCont.innerHTML = "";
                }, 2000);
                messagesCont.innerHTML = "User Not Found, Try again";
                messagesCont.style.color = "#dc2626";
            }
        }
        else {
            setTimeout(function () {
                messagesCont.innerHTML = "";
            }, 2000);
            // If no data is found in localStorage
            messagesCont.innerHTML = "No user data found";
            messagesCont.style.color = "#dc2626";
        }
    }
});
