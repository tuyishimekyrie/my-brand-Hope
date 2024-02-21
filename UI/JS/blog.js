window.onload = function () {
  const articlesContainer = document.querySelector(".articles");

  // Retrieve clickedBlogID from local storage
  const clickedBlogID = localStorage.getItem("clickedBlogId");

  // Retrieve blogsContent from local storage
  const storedBlogsContent = JSON.parse(localStorage.getItem("blogsContent"));

  // Find the specific blog based on clickedBlogID
  const specificBlog = storedBlogsContent.find(
    (blog) => blog.id == clickedBlogID
  );
  console.log(specificBlog);
  const userData = localStorage.getItem("userCredentials");
  const users = JSON.parse(userData);

  if (specificBlog) {
    // Create and append article element for the specific blog
    const article = document.createElement("div");
    article.classList.add("article");

    const imgDiv = document.createElement("div");
    imgDiv.classList.add("articleImg");
    const img = document.createElement("img");
    img.src = specificBlog.img;
    imgDiv.appendChild(img);

    const contentDiv = document.createElement("div");
    contentDiv.classList.add("content");
    const header = document.createElement("h2");
    header.textContent = specificBlog.header;
    const desc = document.createElement("p");
    desc.textContent = specificBlog.desc;
    contentDiv.appendChild(header);
    contentDiv.appendChild(desc);

    const featuresDiv = document.createElement("div");
    featuresDiv.classList.add("features");

    // Likes count
    const likesDiv = document.createElement("div");
    likesDiv.classList.add("likes");
    const likesCount = document.createElement("p");
    likesCount.textContent = specificBlog.likesCount;
    const likesImg = document.createElement("img");
    likesImg.src = "../assests/Facebook Like.png";
    likesDiv.appendChild(likesCount);
    likesDiv.appendChild(likesImg);
    featuresDiv.appendChild(likesDiv);

    // Comments count
    const commentsDiv = document.createElement("div");
    commentsDiv.classList.add("likes");
    const commentCount = document.createElement("p");
    commentCount.textContent = specificBlog.comments.length;
    const commentImg = document.createElement("img");
    commentImg.src = "../assests/Topic.png";
    commentsDiv.appendChild(commentCount);
    commentsDiv.appendChild(commentImg);
    featuresDiv.appendChild(commentsDiv);

    // Create comment form
    const leaveCommentDiv = document.createElement("div");
    leaveCommentDiv.classList.add("comments");
    const leaveCommentForm = document.createElement("form"); // Change to form element
    const leaveCommentLabel = document.createElement("label");
    leaveCommentLabel.setAttribute("for", `comment-${specificBlog.id}`); // Use unique ID for label
    leaveCommentLabel.textContent = "Leave a Comment:";
    const commentInput = document.createElement("input");
    commentInput.setAttribute("type", "text");
    commentInput.setAttribute("name", "comment");
    commentInput.setAttribute("id", `comment-${specificBlog.id}`); // Use unique ID for input
    commentInput.setAttribute("placeholder", "type a comment");

    leaveCommentForm.appendChild(leaveCommentLabel);
    leaveCommentForm.appendChild(commentInput);
    leaveCommentDiv.appendChild(leaveCommentForm);
    article.appendChild(leaveCommentDiv);

    // Event listener for form submission
    leaveCommentForm.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevent form submission

      // Get the comment text from the input field
      const commentText = commentInput.value.trim();

      // Validate if the comment is not empty
      if (commentText !== "") {
        // Retrieve blogsContent from local storage
        const storedBlogsContent =
          JSON.parse(localStorage.getItem("blogsContent")) || [];
          
          // Find the specific blog based on clickedBlogID
          const specificBlogIndex = storedBlogsContent.findIndex(
            (blog) => blog.id == clickedBlogID
            );
            console.log(specificBlogIndex)

        if (specificBlogIndex !== -1) {
          // Ensure that the specific blog object exists
          if (storedBlogsContent[specificBlogIndex].comments === undefined) {
            storedBlogsContent[specificBlogIndex].comments = []; // Initialize comments array if it doesn't exist
          }

          if (users) {
            for (const user of users) {
              if (user.authenticated) {
                // Create a new comment object
                const newComment = {
                  commenterName: user.authenticated ? `${user.names}` : "User", // Assuming the commenter's name is fixed for now
                  comment: commentText,
                  date: getCurrentDate().split(" ")[0], // Get current date
                  time: getCurrentDate().split(" ")[1], // Get current time
                };

                // Add the new comment to the specific blog's comments array
                storedBlogsContent[specificBlogIndex].comments.push(newComment);
              }
            }
          }

          // Save the updated blogsContent back to local storage
          localStorage.setItem(
            "blogsContent",
            JSON.stringify(storedBlogsContent)
          );

          // Render all comments
          renderComments(
            storedBlogsContent[specificBlogIndex].comments,
            commentsSectionDiv
          );

          // Clear the comment input field
          commentInput.value = "";
        } else {
          console.error("Specific blog not found in storedBlogsContent.");
        }
      } else {
        alert("Please enter a comment."); // Display error message if comment is empty
      }
    });

    // Function to render all comments
    function renderComments(comments, commentsSectionDiv) {
      // Clear previous comments
      commentsSectionDiv.innerHTML = "";

      // Iterate over all comments and create DOM elements for each comment
      comments.forEach((comment) => {
        const commentedDiv = document.createElement("div");
        commentedDiv.classList.add("commented");
        const commenterDiv = document.createElement("div");
        commenterDiv.classList.add("img");
        const commenterImg = document.createElement("img");
        commenterImg.src = "../assests/A-removebg-preview.png";
        const commenterName = document.createElement("p");
        commenterName.textContent = comment.commenterName;
        commenterDiv.appendChild(commenterImg);
        commenterDiv.appendChild(commenterName);
        const commentP = document.createElement("p");
        commentP.textContent = comment.comment;
        const timeDiv = document.createElement("div");
        timeDiv.classList.add("time");
        const dateP = document.createElement("p");
        dateP.textContent = comment.date;
        const timeP = document.createElement("p");
        timeP.textContent = comment.time;
        timeDiv.appendChild(dateP);
        timeDiv.appendChild(timeP);
        commentedDiv.appendChild(commenterDiv);
        commentedDiv.appendChild(commentP);
        commentedDiv.appendChild(timeDiv);
        commentsSectionDiv.appendChild(commentedDiv);
      });
    }

    const commentsSectionDiv = document.createElement("div");
    commentsSectionDiv.classList.add("comments-section");
    if (specificBlog.comments) {
      // Render all existing comments
      renderComments(specificBlog.comments, commentsSectionDiv);
    }

    const readMoreLink = document.createElement("a");
    readMoreLink.href = "./Blogs.html";
    const readMoreButton = document.createElement("button");
    readMoreButton.textContent = "Read More";
    readMoreLink.appendChild(readMoreButton);

    article.appendChild(imgDiv);
    article.appendChild(contentDiv);
    article.appendChild(featuresDiv);
    article.appendChild(leaveCommentDiv);
    article.appendChild(commentsSectionDiv);
    article.appendChild(readMoreLink);

    articlesContainer.appendChild(article);
  }

  // Select the like button element
  const likesImg = document.querySelector(".likes img");
  const like = document.querySelector(".likes p");

  // Event listener for likes
  likesImg.addEventListener("click", () => {
    // Retrieve blogsContent from local storage
    const storedBlogsContent =
      JSON.parse(localStorage.getItem("blogsContent")) || [];

    // Retrieve clickedBlogID from local storage
    const clickedBlogID = localStorage.getItem("clickedBlogId");

    // Find the specific blog based on clickedBlogID
    const specificBlog = storedBlogsContent.find(
      (blog) => blog.id == clickedBlogID
    );

    // Check if specificBlog exists
    if (specificBlog) {
      // Toggle the like state
      if (!specificBlog.liked) {
        specificBlog.likesCount++;
        specificBlog.liked = true;
      } else {
        specificBlog.likesCount--;
        specificBlog.liked = false;
      }

      // Update likes count in localStorage
      localStorage.setItem("blogsContent", JSON.stringify(storedBlogsContent));

      // Update UI with the new likes count
      like.textContent = specificBlog.likesCount;
    }
  });
};

// Function to get current date and time
function getCurrentDate() {
  const date = new Date();

  // Get the current date and time components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero if necessary
  const day = String(date.getDate()).padStart(2, "0"); // Add leading zero if necessary
  const hours = String(date.getHours()).padStart(2, "0"); // Add leading zero if necessary
  const minutes = String(date.getMinutes()).padStart(2, "0"); // Add leading zero if necessary
  const seconds = String(date.getSeconds()).padStart(2, "0"); // Add leading zero if necessary

  // Construct the date and time string in the desired format
  const formattedDate = `${year}-${month}-${day}`;
  const formattedTime = `${hours}:${minutes}:${seconds}`;

  // Return the formatted date and time
  return `${formattedDate} ${formattedTime}`;
}
