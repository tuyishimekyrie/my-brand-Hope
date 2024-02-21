const blogs = document.querySelector(".blogs") as HTMLElement;
let data: string | null = localStorage.getItem("blogsContent");
let blogsContent:any;
if (data !== null) {
  // Use data as a string
  console.log(data.toUpperCase()); // Example usage
   blogsContent = JSON.parse(data);
} else {
  // Handle the case when data is null
  console.log("No data found in localStorage");
}

// const blogsContent = [
//   {
//     img: "../assests/nosql-nedir-1.png",
//     header: "The future of NoSQL",
//     desc: "The future of artificial intelligence entails unprecedented advancements, integrating machine learning, robotics, and ethical considerations, shaping a transformative and intelligent digital era.",
//     likesCount: 10,
//     commentsCount: 10,
//     readMoreURL: "./Blog.html",
//   },
//   {
//     img: "../assests/TS.png",
//     header: "Understanding Machine Learning",
//     desc: "Machine learning is a subset of artificial intelligence that enables machines to learn from data without being explicitly programmed. It has applications in various fields, including healthcare, finance, and transportation.",
//     likesCount: 15,
//     commentsCount: 8,
//     readMoreURL: "./Blog.html",
//   },
//   {
//     img: "../assests/TS.png",
//     header: "The Rise of Robotics",
//     desc: "Advancements in robotics technology are revolutionizing industries such as manufacturing, healthcare, and agriculture. With the development of autonomous robots and collaborative robots, the future of robotics looks promising.",
//     likesCount: 20,
//     commentsCount: 12,
//     readMoreURL: "./Blog.html",
//   },
//   {
//     img: "../assests/photo-1507146153580-69a1fe6d8aa1.jpeg",
//     header: "Ethical Considerations in AI",
//     desc: "As artificial intelligence continues to advance, ethical considerations become increasingly important. Issues such as bias in algorithms, data privacy, and the impact on jobs and society must be addressed to ensure responsible AI development.",
//     likesCount: 18,
//     commentsCount: 9,
//     readMoreURL: "./Blog.html",
//   },
//   {
//     img: "../assests/TS.png",
//     header: "The Impact of IoT",
//     desc: "The Internet of Things (IoT) refers to the network of interconnected devices that collect and exchange data. IoT has the potential to revolutionize various industries, including healthcare, transportation, and smart cities.",
//     likesCount: 25,
//     commentsCount: 14,
//     readMoreURL: "./Blog.html",
//   },
//   {
//     img: "../assests/blockchain.png",
//     header: "Advancements in Blockchain",
//     desc: "Blockchain technology, originally developed for cryptocurrencies like Bitcoin, is now being explored for applications beyond finance. Its decentralized and tamper-proof nature makes it suitable for use cases such as supply chain management, voting systems, and identity verification.",
//     likesCount: 30,
//     commentsCount: 20,
//     readMoreURL: "./Blog.html",
//   },
// ];

window.onload = function () {
  blogsContent.forEach((content : any) => {
    const pro = document.createElement("div");
    pro.classList.add("blog");

    const proImg = document.createElement("img") as HTMLImageElement;
    proImg.classList.add("img");
    proImg.src = content.img; // Set image source

    const proHeading = document.createElement("h2");
    proHeading.classList.add("blogHeader");
    proHeading.textContent = content.header; // Set heading text

    const proDesc = document.createElement("p");
    proDesc.classList.add("blogDesc");
    proDesc.textContent = truncateText(content.desc, 20);

    const proFeatures = document.createElement("div");
    proFeatures.classList.add("features");

    const proLikes = document.createElement("div");
    proLikes.classList.add("likes");
    const likesCount = document.createElement("p");
    likesCount.classList.add("likesCount");
    likesCount.textContent = content.likesCount;
    const likesLogo = document.createElement("img") as HTMLImageElement;
    likesLogo.classList.add("likesLogo");
    likesLogo.src = "../assests/Facebook Like.png";
    proLikes.appendChild(likesCount);
    proLikes.appendChild(likesLogo);

    const proComments = document.createElement("div");
    proComments.classList.add("likes");
    const commentsCount = document.createElement("p");
    commentsCount.classList.add("commentsCount");
    commentsCount.textContent = content.comments.length;
    const commentsLogo = document.createElement("img");
    commentsLogo.classList.add("commentsLogo");
    commentsLogo.src = "../assests/Topic.png";
    proComments.appendChild(commentsCount);
    proComments.appendChild(commentsLogo);

    proFeatures.appendChild(proLikes);
    proFeatures.appendChild(proComments);

    const proSite = document.createElement("a");
    proSite.classList.add("readMore");
    proSite.href = content.readMoreURL;
    proSite.setAttribute("href", content.readMoreURL); // Set href attribute
    // proSite.setAttribute("target", "_blank");
    const button = document.createElement("button");
    button.classList.add("login");
    button.textContent = "Read More";
    proSite.appendChild(button);

    // Add event listener to the entire blog post
    pro.addEventListener("click", () => {
      // Store the clicked blog's id in localStorage
      localStorage.setItem("clickedBlogId", content.id);
      // Redirect to the specified blog URL
      // window.location.href = content.readMoreURL;
    });

    pro.appendChild(proImg);
    pro.appendChild(proHeading);
    pro.appendChild(proDesc);
    pro.appendChild(proFeatures);
    pro.appendChild(proSite);

    blogs.appendChild(pro);

    // Function to truncate text to specified number of words
    function truncateText(text, numWords) {
      const words = text.split(" ");
      if (words.length > numWords) {
        return words.slice(0, numWords).join(" ") + "...";
      }
      return text;
    }
  });
  // Attach event listener outside the loop
  const likesLogos = document.querySelectorAll(".likesLogo")  ;
  likesLogos.forEach((likesLogo:any, index) => {
    likesLogo.addEventListener("click", () => {
      // Toggle the like state
      if (!blogsContent[index].liked) {
        // Increment the likes count
        blogsContent[index].likesCount++;
        blogsContent[index].liked = true;
      } else {
        // Decrement the likes count
        blogsContent[index].likesCount--;
        blogsContent[index].liked = false;
      }

      // Update the likes count in localStorage
      localStorage.setItem("blogsContent", JSON.stringify(blogsContent));

      // Update the UI to reflect the new likes count and state
      const likesCount = likesLogo.parentElement.querySelector(".likesCount");
      likesCount.textContent = blogsContent[index].likesCount;

      // Update the like button appearance based on the state
      likesLogo.src = blogsContent[index].liked
        ? "../assests/Facebook Like.png"
        : "../assests/Facebook like.png";

      console.log("Clicked");
    });
  });
};



