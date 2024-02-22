// const formLogin = document.querySelector(".formLogin") as HTMLFormElement;
const emailINPUTCont = document.getElementById("email") as HTMLInputElement;
const passwordINPUTCont = document.getElementById("password") as HTMLInputElement;
const buttonSignInSubmit = document.querySelector(".button") as HTMLButtonElement;
const messagesCont = document.querySelector(".message") as HTMLElement;
window.addEventListener("load", () => {
  const usersData = localStorage.getItem("userCredentials");
  let data: any[] = [];
  if (usersData) {
    data = JSON.parse(usersData);
    data.forEach(element => {
      if (element.authenticated) {
         window.location.href = "../../index.html";
      }
    });
  }
  
  console.log("hello")
})
buttonSignInSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  // Regular expression for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailINPUTCont.value)) {
    messagesCont.innerHTML = "Please enter a valid email address";
    messagesCont.style.color = "#FF0000";
    setTimeout(() => {
      messagesCont.innerHTML = "";
    }, 3000);
  } else {
    interface LoginCredentials {
      email: string;
      password: string;
    }
    const loginCredentials: LoginCredentials = {
      email: emailINPUTCont.value,
      password: passwordINPUTCont.value,
    };
    let authenticated = false;

    const usersData = localStorage.getItem("userCredentials");
    let data:any[] = [];
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
          messagesCont.innerHTML = "";
          window.location.href = "../../index.html";
        }, 1000);

        messagesCont.innerHTML = "Logged in Successfully";
        messagesCont.style.color = "#1e40af";
        // Clear input fields after checking credentials
        emailINPUTCont.value = "";
        passwordINPUTCont.value = "";
      } else {
        setTimeout(() => {
          messagesCont.innerHTML = "";
        }, 2000);

        messagesCont.innerHTML = "User Not Found, Try again";
        messagesCont.style.color = "#dc2626";
      }
    } else {
      setTimeout(() => {
        messagesCont.innerHTML = "";
      }, 2000);
      // If no data is found in localStorage
      messagesCont.innerHTML = "No user data found";
      messagesCont.style.color = "#dc2626";
    }
  }
});
