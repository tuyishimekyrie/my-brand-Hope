const formForgot = document.querySelector(".formForgot");
const emailInputs = document.getElementById("email") as HTMLInputElement;
const passwordInputs = document.getElementById("password") as HTMLInputElement;
const cpasswordInputs = document.getElementById(
  "confirm-password"
) as HTMLInputElement;
const buttonSignIns = document.querySelector(".button") as HTMLButtonElement;
const messages = document.querySelector(".message") as HTMLElement;

buttonSignIns.addEventListener(
  "click",
  (e) => {
    e.preventDefault();
    const loginCredentials = {
      email: emailInputs.value,
      password: passwordInputs.value,
      confirmPassword: cpasswordInputs.value,
    };
    const usersData = localStorage.getItem("userCredentials");
    let data:any;
    if (usersData) {
      
      data = JSON.parse(usersData);
    }
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!emailRegex.test(emailInputs.value)) {
      messages.innerHTML = "Please enter a valid email address";
      messages.style.color = "#FF0000";
      setTimeout(() => {
        messages.innerHTML = "";
      }, 3000);
    } else {
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
                  messages.innerHTML = "";
                }, 2000);

                messages.innerHTML = "Password Doesn't Match";
                messages.style.color = "#dc2626";
              }
              // authenticated = true;
              setTimeout(() => {
                messages.innerHTML = "";
                window.location.href = "../pages/login.html";
              }, 1000);
              user.password = loginCredentials.password;
              user.confirmPassword = loginCredentials.confirmPassword;

              messages.innerHTML = "Password Updated";
              messages.style.color = "#10b981";
              emailInputs.value = "";
              passwordInputs.value = "";
              loginCredentials.confirmPassword = "";
              console.log("Email Exists");
              console.log(data);
              break;
            } else {
              setTimeout(() => {
                messages.innerHTML = "";
              }, 2000);

              messages.innerHTML = "User Doesn't Exist, Try Again";
              messages.style.color = "#dc2626";
            }
            // authenticated = true;
          }
        }
      } else {
        setTimeout(() => {
          messages.innerHTML = "";
        }, 2000);

        messages.innerHTML = "Please fill the fields";
        messages.style.color = "#dc2626";
      }
    }
  }
  // console.log(loginCredentials)
  // console.log(data)
);

