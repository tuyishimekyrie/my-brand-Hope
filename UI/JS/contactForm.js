var form = document.querySelector(".form");
var btnSubmit = document.querySelector(".btn-submit");
var email = document.getElementById("email");
var messageContent = document.getElementById("message");
var errorMessageContent = document.querySelector(".error");
btnSubmit.addEventListener("click", function (e) {
    e.preventDefault();
    var emailValue = email.value.trim();
    var messageValue = messageContent.value.trim();
    if (emailValue === "" || messageValue === "") {
        setTimeout(function () {
            errorMessageContent.innerHTML = "";
        }, 2000);
        errorMessageContent.innerHTML = "Please enter both email and message.";
        errorMessageContent.style.color = "#FF0000";
    }
    else {
        errorMessageContent.innerHTML = "Message successfully sent.";
        errorMessageContent.style.color = "#16F8B6";
        // Retrieve existing data from localStorage or initialize an empty array if no data exists
        // Retrieve the value from localStorage
        var storedData = localStorage.getItem("contactData");
        // Check if storedData is not null before parsing
        var existingData = [];
        if (storedData !== null) {
            existingData = JSON.parse(storedData);
        }
        // Create an object to store the new contact data
        var contactData = {
            id: Date.now(), // Use a timestamp as the unique identifier
            email: emailValue,
            message: messageValue,
            date: new Date().toISOString(), // Store the current date and time
        };
        // Push the new data object into the existing array
        existingData.push(contactData);
        // Convert the array back to a string
        var updatedDataString = JSON.stringify(existingData);
        // Store the updated stringified array in localStorage under the key "contactData"
        localStorage.setItem("contactData", updatedDataString);
        // console.log(contactData);
        setTimeout(function () {
            errorMessageContent.innerHTML = "";
        }, 2000);
        email.value = "";
        messageContent.value = "";
    }
    // console.log(contactData);
});
