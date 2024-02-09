const form = document.querySelector(".form");
const btnSubmit = document.querySelector(".btn-submit");
const email = document.getElementById("email");
const message = document.getElementById("message");
const errorMessage = document.querySelector(".error");

btnSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  let emailValue = email.value.trim();
  let messageValue = message.value.trim();

  if (emailValue === "" || messageValue === "") {
    setTimeout(() => {
      errorMessage.innerHTML = "";
    }, 2000);
    errorMessage.innerHTML = "Please enter both email and message.";
    errorMessage.style.color = "#FF0000";
  } else {
    errorMessage.innerHTML = "Message successfully sent.";
    errorMessage.style.color = "#16F8B6";
    setTimeout(() => {
      errorMessage.innerHTML = "";
    }, 2000);
    email.value = "";
    message.value = "";
  }
});
