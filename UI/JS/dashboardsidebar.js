const sidebar = document.querySelector(".sidebar");
const menu = document.querySelector(".menu");

menu.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});
