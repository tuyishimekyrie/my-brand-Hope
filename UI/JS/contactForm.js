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
    // Retrieve existing data from localStorage or initialize an empty array if no data exists
    let existingData = JSON.parse(localStorage.getItem("contactData")) || [];

    // Create an object to store the new contact data
    const contactData = {
      id: Date.now(), // Use a timestamp as the unique identifier
      email: emailValue,
      message: messageValue,
      date: new Date().toISOString(), // Store the current date and time
    };

    // Push the new data object into the existing array
    existingData.push(contactData);

    // Convert the array back to a string
    const updatedDataString = JSON.stringify(existingData);

    // Store the updated stringified array in localStorage under the key "contactData"
    localStorage.setItem("contactData", updatedDataString);
    // console.log(contactData);
    setTimeout(() => {
      errorMessage.innerHTML = "";
    }, 2000);
    email.value = "";
    message.value = "";
  }
  // console.log(contactData);
});
