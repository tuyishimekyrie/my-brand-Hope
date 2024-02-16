const blogs = document.querySelector(".blogs");
const formCreate = document.querySelector(".formCreate");
const imageInput = document.getElementById("image");
const headInput = document.getElementById("title");
const descInput = document.getElementById("description");
const message = document.querySelector(".message");
const btnCreate = document.querySelector(".createBlog");

btnCreate.addEventListener("click", (e) => {
  e.preventDefault();

  // Retrieve existing blogs content from localStorage or initialize an empty array
  let blogsContent = JSON.parse(localStorage.getItem("blogsContent")) || [];

  if (headInput.value !== "" || descInput.value !== "") {
    // Get the image file selected by the user
    const file = imageInput.files[0];

    if (file) {
      // Create a new FileReader object
      const reader = new FileReader();

      // Event listener for when the FileReader finishes reading the file
      reader.onload = function (event) {
        // Get the base64-encoded string from the FileReader result
        const base64Image = event.target.result;

        // Create the blog data object with the base64-encoded image
        // const blogData = {
        //   id: Date.now(),
        //   img: base64Image,
        //   header: headInput.value,
        //   desc: descInput.value,
        //   commentsCount: 0, // Assuming initial comments count is 0
        // };
        const blogData = 
          {
            id: Date.now(),
            readMoreURL: "./Blog.html", // Assuming the read more URL is fixed
            img: base64Image,
            likesCount: 0, // Assuming initial likes count is 0
            header: headInput.value,
            desc: descInput.value,
            commentsCount: 1,
            comments: [
              {
                commenterName: "Tuyishime Hope",
                comment:
                  "Thanks to the emergence of Docker, we'll harness its capabilities to enhance software shipping and streamline the development process.",
                date: "2024-01-02",
                time: "12:34:23",
              },
            ],
          }
        

        console.log(blogData);
        // Push the new blog data to the blogsContent array
        blogsContent.push(blogData);

        // Save the updated blogsContent array to localStorage
        localStorage.setItem("blogsContent", JSON.stringify(blogsContent));

        // Clear the form fields after submission
        imageInput.value = "";
        headInput.value = "";
        descInput.value = "";

        // Render the updated blogs immediately
        renderBlogs(blogsContent);
      };

      // Read the image file as a data URL (base64-encoded string)
      reader.readAsDataURL(file);
    }
  } else {
    setTimeout(() => {
      message.innerHTML = "";
    }, 3000);
    message.innerHTML = "Please Fill the fields";
    message.style.color = "#b91c1c";
  }
});

// Function to render blogs
function renderBlogs(blogsContent) {
  // Clear existing blogs before rendering
  blogs.innerHTML = "";
  if (blogsContent) {
    blogsContent.forEach((content) => {
      const blog = document.createElement("div");
      blog.classList = "blog";
      const blogContent = document.createElement("div");
      blogContent.classList = "content";
      blog.appendChild(blogContent);
      const blogHeading = document.createElement("h2");
      blogHeading.textContent = content.header;
      blogContent.appendChild(blogHeading);
      const btns = document.createElement("div");
      btns.classList = "btns";
      const blogButtonUpdate = document.createElement("button");
      blogButtonUpdate.classList.add("updateBtn");
      blogButtonUpdate.textContent = "Update";
      const blogButtonDelete = document.createElement("button");
      blogButtonDelete.classList = "deleteBtn";
      blogButtonDelete.textContent = "Delete";
      blogContent.appendChild(btns);
      btns.appendChild(blogButtonUpdate);
      btns.appendChild(blogButtonDelete);
      const blogImageContainer = document.createElement("div");
      blogImageContainer.classList = "image";
      const blogImage = document.createElement("img");
      blogImage.src = content.img;
      blogImageContainer.appendChild(blogImage);
      blog.appendChild(blogImageContainer);
      blogButtonDelete.addEventListener("click", () => {
        const storedData = localStorage.getItem("blogsContent");

        // Parse the retrieved data into an array of objects
        let blogsContent = JSON.parse(storedData) || [];

        // Filter out the item to be deleted
        blogsContent = blogsContent.filter((user) => user.id !== content.id);

        // Update localStorage with the modified array
        localStorage.setItem("blogsContent", JSON.stringify(blogsContent));
        renderBlogs(blogsContent);

        console.log("Blog deleted successfully.");
      });

      const updateBtn = document.querySelector(".updateBtn");
      const updateModal = document.querySelector(".modal");
      const closeModal = document.querySelector(".close");

      blogButtonUpdate.addEventListener("click", () => {
        updateModal.classList.add("active");
      });

      closeModal.addEventListener("click", () => {
        updateModal.classList.remove("active");
      });
      blogButtonUpdate.addEventListener("click", () => {
        console.log("clicked");
      });

      blogs.appendChild(blog);
    });
  }
}

// Optionally, render blogs when the window loads
window.onload = function () {
  // Retrieve and render existing blogs from localStorage
  const storedBlogsContent = JSON.parse(localStorage.getItem("blogsContent"));
  if (storedBlogsContent) {
    // console.log("loaded");
    // console.log(storedBlogsContent);
    renderBlogs(storedBlogsContent);
    // setInterval(renderBlogs,2000)
  }
};
