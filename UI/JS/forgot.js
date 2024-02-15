const formForgot = document.querySelector(".formForgot");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const cpasswordInput = document.getElementById("confirm-password");
const buttonSignIn = document.querySelector(".button");
const message = document.querySelector(".message");

buttonSignIn.addEventListener(
  "click",
  (e) => {
    e.preventDefault();
    const loginCredentials = {
      email: emailInput.value,
      password: passwordInput.value,
      confirmPassword: cpasswordInput.value,
    };
    const usersData = localStorage.getItem("userCredentials");
    const data = JSON.parse(usersData);
    if (
      loginCredentials.email !== "" ||
      loginCredentials.password !== "" ||
      loginCredentials.confirmPassword !== ""
    ) {
      if (data) {
        for (const user of data) {
          if (user.email === loginCredentials.email) {
            if (
              loginCredentials.password !== loginCredentials.confirmPassword
            ) {
              setTimeout(() => {
                message.innerHTML = "";
              }, 2000);

              message.innerHTML = "Password Doesn't Match";
              message.style.color = "#dc2626";
            }
            // authenticated = true;
            setTimeout(() => {
              message.innerHTML = "";
              window.location.href="../pages/login.html"
            }, 1000);
            user.password = loginCredentials.password;
            user.confirmPassword = loginCredentials.confirmPassword;

            message.innerHTML = "Password Updated";
            message.style.color = "#10b981";
            emailInput.value = "";
            passwordInput.value = "";
            loginCredentials.confirmPassword = "";
            console.log("Email Exists");
            console.log(data);
            break;
          } else {
            setTimeout(() => {
              message.innerHTML = "";
            }, 2000);

            message.innerHTML = "User Doesn't Exist, Try Again";
            message.style.color = "#dc2626";
          }
          // authenticated = true;
        }
      }
    } else {
      setTimeout(() => {
        message.innerHTML = "";
      }, 2000);

      message.innerHTML = "Please fill the fields";
      message.style.color = "#dc2626";
    }
  }
  // console.log(loginCredentials)
  // console.log(data)
);
//   let authenticated = false;

//   if (data) {
//     for (const user of data) {
//       if (
//         user.email === loginCredentials.email &&
//         user.password === loginCredentials.password
//       ) {
//         authenticated = true;
//         break;
//       }
//     }

//     if (authenticated) {
//       setTimeout(() => {
//           message.innerHTML = "";
//         window.location.href = "../pages/HomeDashboard.html";
//       }, 1000);

//       message.innerHTML = "Logged in Successfully";
//       message.style.color = "#1e40af";
//       // Clear input fields after checking credentials
//       emailInput.value = "";
//       passwordInput.value = "";
//     } else {
//       setTimeout(() => {
//         message.innerHTML = "";
//       }, 2000);

//       message.innerHTML = "User Not Found, Try again";
//       message.style.color = "#dc2626";
//     }
//   } else {
//     setTimeout(() => {
//       message.innerHTML = "";
//     }, 2000);
//     // If no data is found in localStorage
//     message.innerHTML = "No user data found";
//     message.style.color = "#dc2626";
//   }
// });
