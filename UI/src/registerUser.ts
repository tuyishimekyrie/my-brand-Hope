// const formRegister = document.querySelector(".formRegister") as HTMLElement;
const emailInputCont = document.getElementById("email") as HTMLInputElement;
const namesInputCont = document.getElementById("names") as HTMLInputElement;
const passwordInputCont = document.getElementById("password") as HTMLInputElement;
const cpasswordInputCont = document.getElementById(
  "confirm-password"
) as HTMLInputElement;
const buttonSignUpBtn = document.querySelector(".button") as HTMLButtonElement;
const errorMessageCont = document.querySelector(".error") as HTMLElement;

window.addEventListener("load", () => {
  const usersData = localStorage.getItem("userCredentials");
  let data: any[] = [];
  if (usersData) {
    data = JSON.parse(usersData);
    data.forEach((element) => {
      if (element.authenticated) {
        window.location.href = "../../index.html";
      }
    });
  }

  console.log("hello");
});


buttonSignUpBtn.addEventListener("click", (e: Event) => {
  e.preventDefault();

  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (
    emailInputCont.value === "" ||
    namesInputCont.value === "" ||
    passwordInputCont.value === "" ||
    cpasswordInputCont.value === ""
  ) {
    errorMessageCont.innerHTML = "Please fill all the fields";
    errorMessageCont.style.color = "#FF0000";
    setTimeout(() => {
      errorMessageCont.innerHTML = "";
    }, 3000);
  } else if (!emailRegex.test(emailInputCont.value)) {
    errorMessageCont.innerHTML = "Please enter a valid email address";
    errorMessageCont.style.color = "#FF0000";
    setTimeout(() => {
      errorMessageCont.innerHTML = "";
    }, 3000);
  } else if (
    passwordInputCont.value.length <= 6 ||
    namesInputCont.value.length <= 2
  ) {
    errorMessageCont.innerHTML = "Please Enter Strong Password";
    errorMessageCont.style.color = "#FF0000";
    setTimeout(() => {
      errorMessageCont.innerHTML = "";
    }, 3000);
  } else if (passwordInputCont.value === cpasswordInputCont.value) {
    const userData = {
      id: Date.now(),
      email: emailInputCont.value,
      names: namesInputCont.value,
      password: passwordInputCont.value,
      confirmPassword: cpasswordInputCont.value,
      date: new Date().toISOString(),
      authenticated: false,
    };
    let contentData = localStorage.getItem("userCredentials");
    let existingData;
    if (contentData) {
      existingData = JSON.parse(contentData) || [];
    }
      

    existingData.push(userData);

    const updatedDataString: string = JSON.stringify(existingData);

    localStorage.setItem("userCredentials", updatedDataString);

    errorMessageCont.innerHTML = "User successfully registered.";
    errorMessageCont.style.color = "#059669";

    emailInputCont.value = "";
    namesInputCont.value = "";
    passwordInputCont.value = "";
    cpasswordInputCont.value = "";

    setTimeout(() => {
      window.location.href = "../pages/login.html";
    }, 1000);
  } else {
    errorMessageCont.innerHTML = "Password doesn't match";
    errorMessageCont.style.color = "#b91c1c";
    setTimeout(() => {
      errorMessageCont.innerHTML = "";
    }, 3000);
  }
});
