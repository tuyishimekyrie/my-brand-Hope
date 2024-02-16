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
    // Sort emailsContent by date in descending order
    emailsContent.sort((a, b) => new Date(b.date) - new Date(a.date));
    emailsContent.forEach((content) => {
      const email = document.createElement("div");
      email.classList.add("email");

      const emailHeader = document.createElement("div");
      emailHeader.classList.add("email-header");

      const emailSpan = document.createElement("span");
      emailSpan.textContent = content.email;

      const emailMinutes = document.createElement("p");
      emailMinutes.textContent = content.timeAgo;

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
      //  replyButton.addEventListener("click", () => {
      //    console.log("Clicked");
      //    var gmailEmail =
      //      "mailto:" +
      //      content.email +
      //      "?subject=Re: " +
      //      content.subject +
      //      "&body=";
      //    window.location.href = gmailEmail;
      //  });
    });
  }
}

// Function to retrieve data from localStorage and update the emailsContent array
function fetchDataAndUpdate() {
  // Retrieve existing data from localStorage
  const storedData = localStorage.getItem("contactData");

  // Parse the retrieved data into an array of objects
  const emailsContent = JSON.parse(storedData) || [];

  // Calculate the time difference for each email
  const now = new Date();
  emailsContent.forEach((email) => {
    const messageDate = new Date(email.date);
    const differenceInMilliseconds = now - messageDate;

    // Calculate time difference in various units
    const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
    const differenceInMinutes = Math.floor(differenceInSeconds / 60);
    const differenceInHours = Math.floor(differenceInMinutes / 60);
    const differenceInDays = Math.floor(differenceInHours / 24);
    const differenceInWeeks = Math.floor(differenceInDays / 7);
    const differenceInMonths = Math.floor(differenceInDays / 30); // Approximation
    const differenceInYears = Math.floor(differenceInDays / 365); // Approximation

    // Construct the time ago string based on the largest non-zero difference
    if (differenceInYears > 0) {
      email.timeAgo = `${differenceInYears} year${
        differenceInYears !== 1 ? "s" : ""
      } ago`;
    } else if (differenceInMonths > 0) {
      email.timeAgo = `${differenceInMonths} month${
        differenceInMonths !== 1 ? "s" : ""
      } ago`;
    } else if (differenceInWeeks > 0) {
      email.timeAgo = `${differenceInWeeks} week${
        differenceInWeeks !== 1 ? "s" : ""
      } ago`;
    } else if (differenceInDays > 0) {
      email.timeAgo = `${differenceInDays} day${
        differenceInDays !== 1 ? "s" : ""
      } ago`;
    } else if (differenceInHours > 0) {
      email.timeAgo = `${differenceInHours} hour${
        differenceInHours !== 1 ? "s" : ""
      } ago`;
    } else if (differenceInMinutes > 0) {
      email.timeAgo = `${differenceInMinutes} minute${
        differenceInMinutes !== 1 ? "s" : ""
      } ago`;
    } else {
      email.timeAgo = "Just now";
    }
  });

  console.log(emailsContent);

  // Render the emails on the UI
  renderEmails(emailsContent);
}

// Initial fetch and update
fetchDataAndUpdate();

// Set interval to fetch and update data every 3 seconds
setInterval(fetchDataAndUpdate, 3000);
