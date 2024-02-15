const sidebar = document.querySelector(".sidebar");
const nav = document.querySelector(".mobile-nav img");
const navClose = document.querySelector(".mobile-nav ");
const menu = document.querySelector(".menu");

// Dashboard Cards

const userCount = document.querySelector(".row2 p");
const emailCount = document.querySelector(".cEmail");
const users = localStorage.getItem("userCredentials");
const emails = localStorage.getItem("contactData");
let userNumber = 0;
let emailNumber = 0;

if (userCount) {
  const data = JSON.parse(users);
  const emailData = JSON.parse(emails);

  if (data) {
    userNumber = data.length;
    console.log(userNumber);
  }
  if (emailData) {
    emailNumber = emailData.length;
    console.log(emailNumber);
    emailCount.textContent = emailNumber;
  }

  if (userNumber >= 1) {
    userCount.textContent = "" + userNumber;
  } else if (emailNumber >= 1) {
    console.log(emailNumber)
  }
}

menu.addEventListener("click", () => {
  sidebar.classList.toggle("active");
  navClose.style.display = "flex";
});

nav.addEventListener("click", () => {
  sidebar.classList.remove("active");
  navClose.style.display = "hidden";
});
