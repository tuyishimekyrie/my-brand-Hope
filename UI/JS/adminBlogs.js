var blogscont = document.querySelector(".blogs");
var formCreate = document.querySelector(".formCreate");
var imageInput = document.getElementById("image");
var headInput = document.getElementById("title");
var descInput = document.getElementById("description");
var messagesContent = document.querySelector(".message");
var btnCreate = document.querySelector(".createBlog");
var updateForm = document.querySelector(".formUpdate");
btnCreate.addEventListener("click", function (e) {
  e.preventDefault();
  // Retrieve existing blogs content from localStorage or initialize an empty array
  var blogsContent = JSON.parse(localStorage.getItem("blogsContent")) || [];
  if (headInput.value !== "" || descInput.value !== "") {
    // Get the image file selected by the user
    var file = imageInput.files[0];
    if (file) {
      // Create a new FileReader object
      var reader = new FileReader();
      // Event listener for when the FileReader finishes reading the file
      reader.onload = function (event) {
        // Get the base64-encoded string from the FileReader result
        var base64Image = event.target.result;
        // Create the blog data object with the base64-encoded image
        // const blogData = {
        //   id: Date.now(),
        //   img: base64Image,
        //   header: headInput.value,
        //   desc: descInput.value,
        //   commentsCount: 0, // Assuming initial comments count is 0
        // };
        var blogData = {
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
        };
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
    setTimeout(function () {
      messagesContent.innerHTML = "";
    }, 3000);
    messagesContent.innerHTML = "Please Fill the fields";
    messagesContent.style.color = "#b91c1c";
  }
});
// Function to render blogs
function renderBlogs(blogsContent) {
  // Clear existing blogs before rendering
  blogscont.innerHTML = "";
  if (blogsContent) {
    blogsContent.forEach(function (content) {
      var blog = document.createElement("div");
      blog.classList.add("blog");
      var blogContent = document.createElement("div");
      blogContent.classList.add("content");
      blog.appendChild(blogContent);
      var blogHeading = document.createElement("h2");
      blogHeading.textContent = content.header;
      blogContent.appendChild(blogHeading);
      var btns = document.createElement("div");
      btns.classList.add("btns");
      var blogButtonUpdate = document.createElement("button");
      blogButtonUpdate.classList.add("updateBtn");
      blogButtonUpdate.textContent = "Update";
      var blogButtonDelete = document.createElement("button");
      blogButtonDelete.classList.add("deleteBtn");
      blogButtonDelete.textContent = "Delete";
      blogContent.appendChild(btns);
      btns.appendChild(blogButtonUpdate);
      btns.appendChild(blogButtonDelete);
      var blogImageContainer = document.createElement("div");
      blogImageContainer.classList.add("image");
      var blogImage = document.createElement("img");
      blogImage.src = content.img;
      blogImageContainer.appendChild(blogImage);
      blog.appendChild(blogImageContainer);
      blogButtonDelete.addEventListener("click", function () {
        var storedData = localStorage.getItem("blogsContent");
        // Parse the retrieved data into an array of objects
        var blogsContent = JSON.parse(storedData) || [];
        // Filter out the item to be deleted
        blogsContent = blogsContent.filter(function (user) {
          return user.id !== content.id;
        });
        // Update localStorage with the modified array
        localStorage.setItem("blogsContent", JSON.stringify(blogsContent));
        renderBlogs(blogsContent);
        console.log("Blog deleted successfully.");
      });
      var updateBtn = document.querySelector(".updateBtn");
      var updateModal = document.querySelector(".modal");
      var closeModal = document.querySelector(".close");
      blogButtonUpdate.addEventListener("click", () => {
        updateModal.classList.add("active");
        console.log(content.id);
        const UpdateImageInput = document.getElementById("images");
        const UpdateTitleInput = document.getElementById("titles");
        const UpdateDescInput = document.getElementById("descriptions");
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
      closeModal.addEventListener("click", function () {
        updateModal.classList.remove("active");
      });
      blogscont.appendChild(blog);

     
    });
    // Now continue with the rest of your code...
  }
}
// Optionally, render blogs when the window loads
window.onload = function () {
  // Retrieve and render existing blogs from localStorage
  var storedBlogsContent = JSON.parse(localStorage.getItem("blogsContent"));
  if (storedBlogsContent) {
    // console.log("loaded");
    // console.log(storedBlogsContent);
    renderBlogs(storedBlogsContent);
    // setInterval(renderBlogs,2000)
  }
};
