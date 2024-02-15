// Function to render emails on the UI
function renderEmails(emailsContent) {
  const emailsContainer = document.querySelector(".emails");
  emailsContainer.innerHTML = ""; // Clear previous emails

  if (emailsContent.length === 0) {
    const emailMessageText = document.createElement("h1");
    emailMessageText.textContent = "NO EMAILS";
    emailMessageText.style.color = "white";
    emailsContainer.appendChild(emailMessageText);
  } else {
    emailsContent.forEach((content) => {
      const email = document.createElement("div");
      email.classList.add("email");

      const emailHeader = document.createElement("div");
      emailHeader.classList.add("email-header");

      const emailSpan = document.createElement("span");
      emailSpan.textContent = content.email;

      const emailMinutes = document.createElement("p");
      emailMinutes.textContent = content.minutes;

      emailHeader.appendChild(emailSpan);
      emailHeader.appendChild(emailMinutes);
      email.appendChild(emailHeader);

      const emailMessage = document.createElement("div");
      emailMessage.classList.add("email-message");
      const emailMessageText = document.createElement("p");
      emailMessageText.textContent = content.message;

      emailMessage.appendChild(emailMessageText);
      email.appendChild(emailMessage);

      const emailButtons = document.createElement("div");
      emailButtons.classList.add("email-buttons");

      const replyButton = document.createElement("button");
      replyButton.classList.add("reply");
      replyButton.textContent = "Reply";

      const markAsReadButton = document.createElement("button");
      markAsReadButton.classList.add("markasread");
      markAsReadButton.textContent = "Mark as read";

      emailButtons.appendChild(replyButton);
      emailButtons.appendChild(markAsReadButton);
      email.appendChild(emailButtons);

      emailsContainer.appendChild(email);
    });
  }
}

// Function to retrieve data from localStorage and update the emailsContent array
function fetchDataAndUpdate() {
  // Retrieve existing data from localStorage
  const storedData = localStorage.getItem("contactData");

  // Parse the retrieved data into an array of objects
  const emailsContent = JSON.parse(storedData) || [];

  // Calculate the "minutes ago" value for each message
  const now = new Date();
  emailsContent.forEach((email) => {
    const messageDate = new Date(email.date);
    const differenceInMilliseconds = now - messageDate;
    const differenceInMinutes = Math.round(differenceInMilliseconds / 60000); // Convert milliseconds to minutes
    email.minutes = `${differenceInMinutes} minute${
      differenceInMinutes !== 1 ? "s" : ""
    } ago`;
  });

  console.log(emailsContent);

  // Render the emails on the UI
  renderEmails(emailsContent);
}

// Initial fetch and update
fetchDataAndUpdate();

// Set interval to fetch and update data every 3 seconds
setInterval(fetchDataAndUpdate, 3000);
