const menu = document.querySelector(".menu-open img");
const menuLinks = document.querySelector(".menu-links");
const close = document.querySelector(".menu-close ");
const header = document.querySelector(".header");


menu.addEventListener("click", () => {
  header.classList.toggle("active");
  menuLinks.classList.add("active");
  close.style.display = "block";
  menu.style.display = " none";
  // close.style.zIndex = "10";

  console.log("Hello");
});
close.addEventListener("click", () => {
  menuLinks.classList.remove("active");
  menu.style.display = " block";
  console.log("");
  header.classList.toggle("active");
  close.style.display = "none";
});
