const form = document.querySelector(".form");
const btnSubmit = document.querySelector(".btn-submit") as HTMLElement;
const email = document.getElementById("email") as HTMLInputElement;
const messageContent = document.getElementById("message") as HTMLInputElement;
const errorMessageContent = document.querySelector(".error") as HTMLDivElement;

btnSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  let emailValue = email.value.trim();
  let messageValue = messageContent.value.trim();

  if (emailValue === "" || messageValue === "") {
    setTimeout(() => {
      errorMessageContent.innerHTML = "";
    }, 2000);
    errorMessageContent.innerHTML = "Please enter both email and message.";
    errorMessageContent.style.color = "#FF0000";
  } else {
    errorMessageContent.innerHTML = "Message successfully sent.";
    errorMessageContent.style.color = "#16F8B6";
    // Retrieve existing data from localStorage or initialize an empty array if no data exists
    // Retrieve the value from localStorage
    const storedData: string | null = localStorage.getItem("contactData");

    // Check if storedData is not null before parsing
    let existingData: any[] = [];
    if (storedData !== null) {
      existingData = JSON.parse(storedData);
    }

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
      errorMessageContent.innerHTML = "";
    }, 2000);
    email.value = "";
    messageContent.value = "";
  }
  // console.log(contactData);
});
