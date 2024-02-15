const formLogin = document.querySelector(".formLogin");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const buttonSignIn = document.querySelector(".button");
const message = document.querySelector(".message");

buttonSignIn.addEventListener("click", (e) => {
  e.preventDefault();
  const loginCredentials = {
    email: emailInput.value,
    password: passwordInput.value,
  };
  const usersData = localStorage.getItem("userCredentials");
  const data = JSON.parse(usersData);

  let authenticated = false;

  if (data) {
    for (const user of data) {
      if (
        user.email === loginCredentials.email &&
        user.password === loginCredentials.password
      ) {
        authenticated = true;
        break;
      }
    }

    if (authenticated) {
      setTimeout(() => {
          message.innerHTML = "";
        window.location.href = "../pages/HomeDashboard.html";
      }, 1000);

      message.innerHTML = "Logged in Successfully";
      message.style.color = "#1e40af";
      // Clear input fields after checking credentials
      emailInput.value = "";
      passwordInput.value = "";
    } else {
      setTimeout(() => {
        message.innerHTML = "";
      }, 2000);

      message.innerHTML = "User Not Found, Try again";
      message.style.color = "#dc2626";
    }
  } else {
    setTimeout(() => {
      message.innerHTML = "";
    }, 2000);
    // If no data is found in localStorage
    message.innerHTML = "No user data found";
    message.style.color = "#dc2626";
  }
});
