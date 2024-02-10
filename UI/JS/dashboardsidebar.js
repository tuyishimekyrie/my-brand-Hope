const sidebar = document.querySelector(".sidebar");
const nav = document.querySelector(".mobile-nav img");
const navClose = document.querySelector(".mobile-nav ");
const menu = document.querySelector(".menu");

menu.addEventListener("click", () => {
  sidebar.classList.toggle("active");
  navClose.style.display = "flex"
});
nav.addEventListener("click", () => {
  sidebar.classList.remove("active");
  navClose.style.display="hidden"
});