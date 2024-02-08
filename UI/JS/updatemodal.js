const updateBtn = document.querySelector(".updateBtn");
const updateModal = document.querySelector(".modal");
const closeModal = document.querySelector(".close");

updateBtn.addEventListener("click", () => {
  updateModal.classList.add("active");
});

closeModal.addEventListener("click", () => {
  updateModal.classList.remove("active");
});
