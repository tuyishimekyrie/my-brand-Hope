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
  // Regular expression for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (
    emailInput.value === "" ||
    namesInput.value === "" ||
    passwordInput.value === "" ||
    cpasswordInput.value === ""
  ) {
    errorMessage.innerHTML = "Please fill all the fields";
    errorMessage.style.color = "#FF0000";
    setTimeout(() => {
      errorMessage.innerHTML = "";
    }, 3000);
  } else if (!emailRegex.test(emailInput.value)) {
    errorMessage.innerHTML = "Please enter a valid email address";
    errorMessage.style.color = "#FF0000";
    setTimeout(() => {
      errorMessage.innerHTML = "";
    }, 3000);
  } else if (passwordInput.value.length <= 6 || namesInput.value.length <= 2) {
    errorMessage.innerHTML = "Please Enter Strong Password";
    errorMessage.style.color = "#FF0000";
    setTimeout(() => {
      errorMessage.innerHTML = "";
    }, 3000);
  } else if (passwordInput.value === cpasswordInput.value) {
    const userData = {
      id: Date.now(),
      email: emailInput.value,
      names: namesInput.value,
      password: passwordInput.value,
      confirmPassword: cpasswordInput.value,
      date: new Date().toISOString(),
      authenticated: false,
    };

    // Retrieve existing data from localStorage or initialize an empty array if no data exists
    let existingData =
      JSON.parse(localStorage.getItem("userCredentials")) || [];

    // Push the new data object into the existing array
    existingData.push(userData);

    // Convert the array back to a string
    const updatedDataString = JSON.stringify(existingData);

    // Store the updated stringified array in localStorage under the key "userCredentials"
    localStorage.setItem("userCredentials", updatedDataString);

    errorMessage.innerHTML = "User successfully registered.";
    errorMessage.style.color = "#059669";

    // Clear input fields after submission
    emailInput.value = "";
    namesInput.value = "";
    passwordInput.value = "";
    cpasswordInput.value = "";
    setTimeout(() => {
      window.location.href = "../pages/login.html";
    }, 1000);
  } else {
    errorMessage.innerHTML = "Password doesn't match";
    errorMessage.style.color = "#b91c1c";
    setTimeout(() => {
      errorMessage.innerHTML = "";
    }, 3000);
  }
});
