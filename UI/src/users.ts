const Users = document.querySelector(".users") as HTMLDivElement;

// Function to render users on the UI
function renderUsers(usersContent: any) {
  const usersContainer = document.querySelector(".users") as HTMLDivElement;
  usersContainer.innerHTML = "";
  console.log("loaded")
  if (usersContent.length === 0) {
    const userMessageText = document.createElement("h1");
    userMessageText.textContent = "NO USERS";
    userMessageText.style.color = "white";
    usersContainer.appendChild(userMessageText);
  } else {
    usersContent.forEach((content) => {
      const user = document.createElement("div") as HTMLDivElement;
      user.classList.add("user");

      const userId = document.createElement("p");
      userId.textContent = content.id;
      const userName = document.createElement("p");
      userName.textContent = content.names;

      const userEmail = document.createElement("p");
      userEmail.textContent = content.email;

      const deleteButton = document.createElement("button");
      deleteButton.classList.add("delete");
      deleteButton.textContent = "Delete";

      user.appendChild(userId);
      user.appendChild(userName);
      user.appendChild(userEmail);
      user.appendChild(deleteButton);

      Users.appendChild(user);

      deleteButton.addEventListener("click", () => {
        // Retrieve data from localStorage
        const storedData = localStorage.getItem("userCredentials");
        let userContent: any;
        if (storedData) {
          
          
          // Parse the retrieved data into an array of objects
          let usersContent = JSON.parse(storedData) || [];
        }

        // Filter out the item to be deleted
        usersContent = usersContent.filter((user) => user.id !== content.id);

        // Update localStorage with the modified array
        localStorage.setItem("userCredentials", JSON.stringify(usersContent));

        console.log("User deleted successfully.");
      });
    });
  }
}

// Function to retrieve data from localStorage and update the usersContent array
function fetchDataAndUpdate() {
  // Retrieve existing data from localStorage
  const storedData = localStorage.getItem("userCredentials");
  let usersContent: any;
  if (storedData) { 
    // Parse the retrieved data into an array of objects
    usersContent = JSON.parse(storedData) || [];
  }

  console.log(usersContent);

  // Render the users on the UI
  renderUsers(usersContent);
}

// Initial fetch and update
fetchDataAndUpdate();

// Set interval to fetch and update data every 3 seconds
setInterval(fetchDataAndUpdate, 3000);
