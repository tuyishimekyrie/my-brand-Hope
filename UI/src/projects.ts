const projectElement = document.querySelector(".projects-content") as HTMLElement;
// const project = document.querySelector(".project") as HTMLElement;
// const projectImg = document.querySelector(".projectImg") as HTMLElement;
// const projectHeading = document.querySelector(".projectheading") as HTMLElement;
// const projectDesc = document.querySelector(".projectDesc") as HTMLElement;
// const projectSites = document.querySelector(".site") as HTMLElement;

const projectsContents = [
  {
    id: 1,
    img: "./UI/assests/hero.jpeg",
    heading: "Kora Finance Management Application",
    desc: "A centralized dashboard offering an overview of key business metrics, performance indicators, and important alerts. Customizable widgets for users to tailor the dashboard to their specific needs.",
    url: "https://tuyishimekyrie.github.io/my-brand-Hope/index.html",
  },
  {
    id: 2,
    img: "./UI/assests/project1.png", // Fixed typo here
    heading: "Business Management Application",
    desc: "A centralized dashboard offering an overview of key business metrics, performance indicators, and important alerts. Customizable widgets for users to tailor the dashboard to their specific needs.",
    url: "https://tuyishimekyrie.github.io/my-brand-Hope/index.html",
  },
];
  console.log(projectsContents[1].img)
 window.onload = function () {
   projectsContents.forEach((content) => {
       const pro = document.createElement("div");
       pro.classList.add("project");

       const proImg = document.createElement("img");
       proImg.classList.add("projectImg");
       proImg.src = content.img; // Set image source

       const proHeading = document.createElement("h2");
       proHeading.classList.add("projectheading");
       proHeading.textContent = content.heading; // Set heading text

       const proDesc = document.createElement("h5");
       proDesc.classList.add("projectDesc");
       proDesc.textContent = content.desc; // Set description text

       const proSite = document.createElement("a");
       proSite.classList.add("site");
       proSite.href = content.url; // Set site URL
       proSite.textContent = "Visit Site"; // Set button text

       pro.appendChild(proImg);
       pro.appendChild(proHeading);
       pro.appendChild(proDesc);
       pro.appendChild(proSite);

       projectElement.appendChild(pro); // Append project to .projects container
   });
 };

