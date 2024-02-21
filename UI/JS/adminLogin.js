var formLogin = document.querySelector(".formLogin");
var emailINPUT = document.getElementById("email");
var passwordINPUT = document.getElementById("password");
var buttonSignIn = document.querySelector(".button");
var message = document.querySelector(".message");
buttonSignIn.addEventListener("click", function (e) {
  e.preventDefault();
  // Regular expression for email validation
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailINPUT.value)) {
    message.innerHTML = "Please enter a valid email address";
    message.style.color = "#FF0000";
    setTimeout(function () {
      message.innerHTML = "";
    }, 3000);
  } else {
    var loginCredentials = {
      email: emailINPUT.value,
      password: passwordINPUT.value,
    };
    var authenticated = false;
    // var usersData = localStorage.getItem("userCredentials");
    // var data = [];
    // if (usersData) {
    // data = JSON.parse(usersData);
    // }
    // if (data) {
    // for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
    // var user = data_1[_i];
    if (
      loginCredentials.email === "tuyishimehope01@gmail.com" &&
      loginCredentials.password === "kyrie"
    ) {
      authenticated = true;
      // Set authenticated to true for the logged-in user
      authenticated = true;
      // break;
      // }
      // }
      if (authenticated) {
        // Save the updated data back to localStorage
        // localStorage.setItem("userCredentials", JSON.stringify(data));
        setTimeout(function () {
          message.innerHTML = "";
          window.location.href = "../pages/HomeDashboard.html";
        }, 1000);
        message.innerHTML = "Logged in Successfully";
        message.style.color = "#1e40af";
        // Clear input fields after checking credentials
        emailINPUT.value = "";
        passwordINPUT.value = "";
      } else {
        setTimeout(function () {
          message.innerHTML = "";
        }, 2000);
        message.innerHTML = "User Not Found, Try again";
        message.style.color = "#dc2626";
      }
    } else {
      setTimeout(function () {
        message.innerHTML = "";
      }, 2000);
      // If no data is found in localStorage
      message.innerHTML = "No user data found";
      message.style.color = "#dc2626";
    }
  }
});
