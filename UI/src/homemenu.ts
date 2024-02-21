const menus = document.querySelector(".menu-open img") as HTMLElement;
const menuLinks = document.querySelector(".menu-links") as HTMLDivElement;
const menuClose = document.querySelector(".menu-close") as HTMLDivElement; 
const header = document.querySelector(".header") as HTMLDivElement;

menus.addEventListener("click", () => {
  header.classList.toggle("active");
  menuLinks.classList.add("active");
  menuClose.style.display = "block"; 
  menus.style.display = "none";
});

menuClose.addEventListener("click", () => {
  menuLinks.classList.remove("active");
  menus.style.display = "block";
  header.classList.toggle("active");
  menuClose.style.display = "none"; 
});
