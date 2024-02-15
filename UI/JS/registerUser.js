const formRegister = document.querySelector(".formRegister");
const emailInput = document.getElementById("email");
const namesInput = document.getElementById("names");
const passwordInput = document.getElementById("password");
const cpasswordInput = document.getElementById("confirm-password");
const buttonSignUp = document.querySelector(".button");
const errorMessage = document.querySelector(".error");

console.log(formRegister);
buttonSignUp.addEventListener("click", (e) => {
  e.preventDefault();

  if (
    emailInput.value === "" ||
    namesInput.value === "" ||
    passwordInput.value === "" ||
    cpasswordInput.value === ""
  ) {
    setTimeout(() => {
      errorMessage.innerHTML = "";
    }, 3000);
    errorMessage.innerHTML = "Please fill the field(s)";
    errorMessage.style.color = "#FF0000";
  } else {
    if (passwordInput.value === cpasswordInput.value) {
      const userData = {
        id: Date.now(),
        email: emailInput.value,
        names: namesInput.value,
        password: passwordInput.value,
        confirmPassword: cpasswordInput.value,
        date: new Date().toISOString(),
      };

      // Retrieve existing data from localStorage or initialize an empty array if no data exists
      let existingData =
        JSON.parse(localStorage.getItem("userCredentials")) || [];

      // // Push the new data object into the existing array
      existingData.push(userData);

      // // Convert the array back to a string
      const updatedDataString = JSON.stringify(existingData);

      // // Store the updated stringified array in localStorage under the key "contactData"
      localStorage.setItem("userCredentials", updatedDataString);

      errorMessage.innerHTML = "User successfully Registered.";
      errorMessage.style.color = "#059669";
        console.log(userData);
        setTimeout(() => {
            window.location.href="../pages/login.html"
        },1000)
    } else {
      setTimeout(() => {
        errorMessage.innerHTML = "";
      }, 3000);
      errorMessage.innerHTML = "Password Doesn't Match";
      errorMessage.style.color = "#b91c1c";
    }
   
    setTimeout(() => {
      errorMessage.innerHTML = "";
    }, 2000);
    emailInput.value = "";
    namesInput.value = "";
    passwordInput.value = "";
    cpasswordInput.value = "";
  }
});
