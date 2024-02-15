const Users = document.querySelector(".users");

// const usersContent = [

//   {
//     id: 20,
//     name: "Aiden Cooper",
//     email: "aiden@example.com",
//   },
// ];

// Function to render emails on the UI
function renderUsers(usersContent) {
  const emailsContainer = document.querySelector(".users");
  emailsContainer.innerHTML = ""; // Clear previous emails

  if (usersContent.length === 0) {
    const emailMessageText = document.createElement("h1");
    emailMessageText.textContent = "NO USERS";
    emailMessageText.style.color = "white";
    emailsContainer.appendChild(emailMessageText);
  } else {
    usersContent.forEach((content) => {
      const user = document.createElement("div");
      user.classList = "user";

      const userId = document.createElement("p");
      userId.textContent = content.id;
      const userName = document.createElement("p");
      userName.textContent = content.names; // Set image source

      const userEmail = document.createElement("p");
      //  proHeading.classList = "projectheading";
      userEmail.textContent = content.email; // Set heading text

      const deleteButton = document.createElement("button");
      deleteButton.classList = "delete";
      //  proSite.href = content.url; // Set site URL
      deleteButton.textContent = "Delete"; // Set button text

      user.appendChild(userId);
      user.appendChild(userName);
      user.appendChild(userEmail);
      user.appendChild(deleteButton);

      Users.appendChild(user);
     deleteButton.addEventListener("click", () => {
       // Retrieve data from localStorage
       const storedData = localStorage.getItem("userCredentials");

       // Parse the retrieved data into an array of objects
       let usersContent = JSON.parse(storedData) || [];

       // Filter out the item to be deleted
       usersContent = usersContent.filter((user) => user.id !== content.id);

       // Update localStorage with the modified array
       localStorage.setItem("userCredentials", JSON.stringify(usersContent));

       console.log("User deleted successfully."); 
     });

    });
  }
}

// Function to retrieve data from localStorage and update the emailsContent array
function fetchDataAndUpdate() {
  // Retrieve existing data from localStorage
  const storedData = localStorage.getItem("userCredentials");

  // Parse the retrieved data into an array of objects
  const usersContent = JSON.parse(storedData) || [];

  // Calculate the "minutes ago" value for each message
  // const now = new Date();
  // usersContent.forEach((user) => {
  //   const messageDate = new Date(user.date);
  //   const differenceInMilliseconds = now - messageDate;
  //   const differenceInMinutes = Math.round(differenceInMilliseconds / 60000); // Convert milliseconds to minutes
  //   email.minutes = `${differenceInMinutes} minute${
  //     differenceInMinutes !== 1 ? "s" : ""
  //   } ago`;
  // });

  console.log(usersContent);

  // Render the emails on the UI
  renderUsers(usersContent);
}

// Initial fetch and update
fetchDataAndUpdate();

// Set interval to fetch and update data every 3 seconds
setInterval(fetchDataAndUpdate, 3000);
