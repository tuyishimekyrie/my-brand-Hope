var formLogin = document.querySelector(".formLogin");
var emailINPUT = document.getElementById("email");
var passwordINPUT = document.getElementById("password");
var buttonSignIn = document.querySelector(".button");
var message = document.querySelector(".message");

window.addEventListener("load", function () {
  var usersData = localStorage.getItem("adminCredentials");
  var data = [];
  if (usersData) {
    data = JSON.parse(usersData);
    data.forEach(function (element) {
      if (element.authenticated) {
        window.location.href = "../pages/HomeDashboard.html";
      }
    });
  }
  console.log("hello");
});
// var loginCredentials = {
//   email: "tuyishimehope01@gmail.com",
//   password: "1234567",
// authenticated: false
// };
// localStorage.setItem("adminCredentials", JSON.stringify(loginCredentials));
buttonSignIn.addEventListener("click", function (e) {
  e.preventDefault();

  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailINPUT.value)) {
    message.innerHTML = "Please enter a valid email address";
    message.style.color = "#FF0000";
    setTimeout(function () {
      message.innerHTML = "";
    }, 3000);
    return; // Exit early if validation fails
  }

  var loginCredentials = {
    email: emailINPUT.value,
    password: passwordINPUT.value,
  };

 let usersData = JSON.parse(localStorage.getItem("adminCredentials")) || [];
 // Ensure usersData is treated as an array
 usersData = Array.isArray(usersData) ? usersData : [usersData];

  var userFound = usersData.find(function (user) {
    return (
      user.email === loginCredentials.email &&
      user.password === loginCredentials.password
    );
  });

  if (userFound) {
    // Update the user's authenticated status
    userFound.authenticated = true;

    // Find the index of the user in the usersData array
    const index = usersData.findIndex(
      (user) => user.email === loginCredentials.email
    );
    if (index !== -1) {
      usersData[index] = userFound; // Update the user in the array
    }

    // Save the updated users array back to localStorage
    localStorage.setItem("adminCredentials", JSON.stringify(usersData));

    message.innerHTML = "Logged in Successfully";
    message.style.color = "#1e40af";
    setTimeout(function () {
      window.location.href = "../pages/HomeDashboard.html";
    }, 1000);

    // Optionally clear input fields
    emailINPUT.value = "";
    passwordINPUT.value = "";
  } else {
    message.innerHTML = "User Not Found, Try again";
    message.style.color = "#dc2626";
    setTimeout(function () {
      message.innerHTML = "";
    }, 2000);
  }
});
