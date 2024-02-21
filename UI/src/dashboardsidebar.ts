const sidebar = document.querySelector(".sidebar") as HTMLDivElement;
const nav = document.querySelector(".mobile-nav img")as HTMLImageElement;
const navClose = document.querySelector(".mobile-nav ") as HTMLElement;
const menu = document.querySelector(".menu") as HTMLDivElement;
const logoutBtn = document.querySelector(".logout")as HTMLDivElement;

console.log(logoutBtn)
// Dashboard Cards

const userCount = document.querySelector(".row2 p");
const emailCount = document.querySelector(".cEmail") as HTMLElement;
const users = localStorage.getItem("userCredentials");
const emails = localStorage.getItem("contactData");
let userNumber = 0;
let emailNumber = 0;
let dataUser:any;
let emailDataContent:any;
if (userCount) {
  if (users) {
    
    dataUser = JSON.parse(users);
  }
  if (emails) {
    
     emailDataContent = JSON.parse(emails);
  }

  if (dataUser) {
    userNumber = dataUser.length;
    console.log(userNumber);
  }
  if (emailDataContent) {
    emailNumber = emailDataContent.length;
    console.log(emailNumber);
    emailCount.textContent = emailNumber.toString();
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

logoutBtn.addEventListener("click", () => {
  const usersCred = localStorage.getItem("userCredentials");
  let data: any;
  if (usersCred) {
    
    data = JSON.parse(usersCred);
  }
  if (data) {
    for (const userData of data) {
      if (userData.authenticated) {
        userData.authenticated = false;
        localStorage.setItem("userCredentials", JSON.stringify(data));
        break; // Exit loop once the authenticated user is found and updated
      }
    }
  
  }
  console.log(data);
});
