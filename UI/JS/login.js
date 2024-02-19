const formLogin = document.querySelector(".formLogin");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const buttonSignIn = document.querySelector(".button");
const message = document.querySelector(".message");

buttonSignIn.addEventListener("click", (e) => {
  e.preventDefault();
  // Regular expression for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailInput.value)) {
    message.innerHTML = "Please enter a valid email address";
    message.style.color = "#FF0000";
    setTimeout(() => {
      message.innerHTML = "";
    }, 3000);
  } else {
    const loginCredentials = {
      email: emailInput.value,
      password: passwordInput.value,
    };
    let authenticated = false;

    const usersData = localStorage.getItem("userCredentials");
    let data = [];
    if (usersData) {
      data = JSON.parse(usersData);
    }

    if (data) {
      for (const user of data) {
        if (
          user.email === loginCredentials.email &&
          user.password === loginCredentials.password
        ) {
          authenticated = true;
          // Set authenticated to true for the logged-in user
          user.authenticated = true;
          break;
        }
      }

      if (authenticated) {
        // Save the updated data back to localStorage
        localStorage.setItem("userCredentials", JSON.stringify(data));

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
  }
});
