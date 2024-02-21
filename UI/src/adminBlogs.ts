const blogsconts = document.querySelector(".blogs") as HTMLDivElement;
// const formCreate = document.querySelector(".formCreate");
const imageInputs = document.getElementById("image") as HTMLInputElement;
const headInputs = document.getElementById("title") as HTMLInputElement;
const descInputs = document.getElementById("description") as HTMLInputElement;
const messagesContents = document.querySelector(".message") as HTMLElement;
const btnCreates = document.querySelector(".createBlog") as HTMLElement;

const updateForms = document.querySelector(".formUpdate");

btnCreates.addEventListener("click", (e) => {
  e.preventDefault();

  // Retrieve existing blogs content from localStorage or initialize an empty array
  let blogsContent:any=localStorage.getItem("blogsContent");
  if (blogsContent) {
    
     blogsContent = JSON.parse(blogsContent) || [];
  }

  if (headInputs.value !== "" || descInputs.value !== "") {
    // Get the image file selected by the user
    let file;
    if (imageInputs.files) {
      
       file = imageInputs.files[0];
    }

    if (file) {
      // Create a new FileReader object
      const reader = new FileReader();

      // Event listener for when the FileReader finishes reading the file
      reader.onload = function (event) {
        // Get the base64-encoded string from the FileReader result
        if (event.target && event.target.result) {
          // Get the base64-encoded image data from the result
          const base64Image = event.target.result;

          // Create the blog data object with the base64-encoded image
          // const blogData = {
          //   id: Date.now(),
          //   img: base64Image,
          //   header: headInput.value,
          //   desc: descInput.value,
          //   commentsCount: 0, // Assuming initial comments count is 0
          // };
          const blogData = {
            id: Date.now(),
            readMoreURL: "./Blog.html", // Assuming the read more URL is fixed
            img: base64Image,
            likesCount: 0, // Assuming initial likes count is 0
            header: headInputs.value,
            desc: descInputs.value,
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
          };

          console.log(blogData);
          // Push the new blog data to the blogsContent array
          if (blogsContent) {
            
            blogsContent.push(blogData);
          }

          // Save the updated blogsContent array to localStorage
          localStorage.setItem("blogsContent", JSON.stringify(blogsContent));

          // Clear the form fields after submission
          imageInputs.value = "";
          headInputs.value = "";
          descInputs.value = "";

          // Render the updated blogs immediately
          renderBlogs(blogsContent);
        };
      }

      // Read the image file as a data URL (base64-encoded string)
      reader.readAsDataURL(file);
    }
  } else {
    setTimeout(() => {
      messagesContents.innerHTML = "";
    }, 3000);
    messagesContents.innerHTML = "Please Fill the fields";
    messagesContents.style.color = "#b91c1c";
  }
});

// Function to render blogs
function renderBlogs(blogsContent:any) {
  // Clear existing blogs before rendering
  blogsconts.innerHTML = "";
  if (blogsContent) {
    blogsContent.forEach((content) => {
      const blog = document.createElement("div");
      blog.classList.add("blog");
      const blogContent = document.createElement("div");
      blogContent.classList.add("content");
      blog.appendChild(blogContent);
      const blogHeading = document.createElement("h2");
      blogHeading.textContent = content.header;
      blogContent.appendChild(blogHeading);
      const btns = document.createElement("div");
      btns.classList.add("btns");
      const blogButtonUpdate = document.createElement("button");
      blogButtonUpdate.classList.add("updateBtn");
      blogButtonUpdate.textContent = "Update";
      const blogButtonDelete = document.createElement("button");
      blogButtonDelete.classList.add("deleteBtn");
      blogButtonDelete.textContent = "Delete";
      blogContent.appendChild(btns);
      btns.appendChild(blogButtonUpdate);
      btns.appendChild(blogButtonDelete);
      const blogImageContainer = document.createElement("div");
      blogImageContainer.classList.add("image");
      const blogImage = document.createElement("img");
      blogImage.src = content.img;
      blogImageContainer.appendChild(blogImage);
      blog.appendChild(blogImageContainer);
      blogButtonDelete.addEventListener("click", () => {
        const storedData = localStorage.getItem("blogsContent");

        // Parse the retrieved data into an array of objects
        let blogsContent;
        if (storedData) { 
           blogsContent = JSON.parse(storedData) || [];
        }

        // Filter out the item to be deleted
        blogsContent = blogsContent.filter((user:any) => user.id !== content.id);

        // Update localStorage with the modified array
        localStorage.setItem("blogsContent", JSON.stringify(blogsContent));
        renderBlogs(blogsContent);

        console.log("Blog deleted successfully.");
      });

      const updateBtn = document.querySelector(".updateBtn") as HTMLDivElement;
      const updateModal = document.querySelector(".modal") as HTMLDivElement;
      const closeModal = document.querySelector(".close") as HTMLDivElement;

        blogButtonUpdate.addEventListener("click", () => {
          updateModal.classList.add("active");
          console.log(content.id);
          const UpdateImageInput = document.getElementById("images") as HTMLInputElement;
          const UpdateTitleInput = document.getElementById(
            "titles"
          ) as HTMLInputElement;
          const UpdateDescInput = document.getElementById(
            "descriptions"
          ) as HTMLInputElement;
          const submitBtn = document.querySelector(".submitBtn");
          submitBtn.addEventListener("click", (e) => {
            e.preventDefault();
            const blogId = content.id;
            // Find the specific blog in the blogsContent array using its ID
            const specificBlogIndex = blogsContent.findIndex(
              (blog) => blog.id === blogId
            );
            if (specificBlogIndex !== -1) {
              const specificBlog = blogsContent[specificBlogIndex];
              // Check if input values are provided, if not, use previous values
              const updatedHeader =
                UpdateTitleInput.value !== ""
                  ? UpdateTitleInput.value
                  : specificBlog.header;
              const updatedDesc =
                UpdateDescInput.value !== ""
                  ? UpdateDescInput.value
                  : specificBlog.desc;
              var file = UpdateImageInput.files[0];
              let updatedImg = specificBlog.img; // Initialize to the previous image

              if (file) {
                // Create a new FileReader object
                var reader = new FileReader();
                // Event listener for when the FileReader finishes reading the file
                reader.onload = function (event) {
                  // Get the base64-encoded string from the FileReader result
                  var base64Image = event.target.result;
                  updatedImg = base64Image; // Update to the new image
                  // Update the specific blog with the new or previous values
                  blogsContent[specificBlogIndex] = {
                    ...specificBlog,
                    header: updatedHeader,
                    desc: updatedDesc,
                    img: updatedImg,
                  };
                  // Update localStorage with the modified array
                  localStorage.setItem(
                    "blogsContent",
                    JSON.stringify(blogsContent)
                  );
                  renderBlogs(blogsContent);
                  // Log the updated blog data
                  console.log("Updated Blog:", blogsContent[specificBlogIndex]);
                  console.log(updatedImg);
                  // Close the update modal or perform any other action
                  updateModal.classList.remove("active");
                };
                // Read the image file as a data URL (base64-encoded string)
                reader.readAsDataURL(file);
              } else {
                // Update the specific blog with the new or previous values
                blogsContent[specificBlogIndex] = {
                  ...specificBlog,
                  header: updatedHeader,
                  desc: updatedDesc,
                  img: updatedImg,
                };
                // Update localStorage with the modified array
                localStorage.setItem(
                  "blogsContent",
                  JSON.stringify(blogsContent)
                );
                renderBlogs(blogsContent);
                // Log the updated blog data
                console.log("Updated Blog:", blogsContent[specificBlogIndex]);
                console.log(updatedImg);
                // Close the update modal or perform any other action
                updateModal.classList.remove("active");
              }
            } else {
              console.log("Blog Not Found");
            }
          });
        });

      closeModal.addEventListener("click", () => {
        updateModal.classList.remove("active");
      });

      blogsconts.appendChild(blog);
      // Define event listener for blogButtonUpdate outside of forEach loop
      // blogButtonUpdate.addEventListener("click", () => {
      //   updateModal.classList.add("active");

      //   // Get the ID of the specific blog associated with the update button
      //   const blogId = content.id;

      //   // Find the specific blog in the blogsContent array using its ID
      //   const specificBlogIndex = blogsContent.findIndex(
      //     (blog) => blog.id === blogId
      //   );

      //   // Ensure that the specific blog is found in the blogsContent array
      //   if (specificBlogIndex !== -1) {
      //     const specificBlog = blogsContent[specificBlogIndex];

      //     // Populate the modal inputs with the current values of the specific blog
      //     const UpdateImageInput = document.getElementById("image");
      //     const UpdateTitleInput = document.getElementById("title");
      //     const UpdateDescInput = document.getElementById("description");

      //     // Display a preview of the image instead of setting the value directly
      //     const imgPreview = document.getElementById("image");
      //     imgPreview.src = specificBlog.img;

      //     // Set the title and description values
      //     UpdateTitleInput.value = specificBlog.header;
      //     UpdateDescInput.value = specificBlog.desc;

      //     // Store the current values in data attributes for comparison later
      //     UpdateImageInput.setAttribute(
      //       "data-previous-value",
      //       specificBlog.img
      //     );
      //     UpdateTitleInput.setAttribute(
      //       "data-previous-value",
      //       specificBlog.header
      //     );
      //     UpdateDescInput.setAttribute(
      //       "data-previous-value",
      //       specificBlog.desc
      //     );
      //   } else {
      //     console.error("Specific blog not found in blogsContent.");
      //   }
      // });
      // Define event listener for blogButtonUpdate outside of forEach loop
      // Define event listener for blogButtonUpdate outside of forEach loop
    });

    // Now continue with the rest of your code...
  }
}

// Optionally, render blogs when the window loads
window.onload = function () {
  // Retrieve and render existing blogs from localStorage
  let storedBlogsContent = localStorage.getItem("blogsContent")
  if (storedBlogsContent) {
    
     storedBlogsContent = JSON.parse(storedBlogsContent);
  }
  if (storedBlogsContent) {
    // console.log("loaded");
    // console.log(storedBlogsContent);
    renderBlogs(storedBlogsContent);
    // setInterval(renderBlog,2000)
  }
};
