const passwordInput = document.querySelectorAll("#password");
const emailInput = document.querySelectorAll("#email");
const nameInput = document.querySelector("#name");
const toast = document.querySelector("#toast");
const button = document.querySelector("#signinBtn");
const signInform = document.querySelector(".signinForm");
const signUpform = document.querySelector(".signupForm");
const signUpformBtn = document.querySelector("#signupFormBtn");
const signInformBtn = document.querySelector("#signinFormBtn");

let ALL_USER = [];

let CURRENT_USER = {};

let k = 1 === 1 ? "hello" : "no";

if (JSON.parse(localStorage.getItem("all-users")) === null) {
  ALL_USER = [];
} else {
  ALL_USER = JSON.parse(localStorage.getItem("all-users"));
}

console.log(ALL_USER);

signUpformBtn.addEventListener("click", () => {
  signInform.style.display = "none";
  signUpform.style.display = "flex";
});

signInformBtn.addEventListener("click", () => {
  signInform.style.display = "flex";
  signUpform.style.display = "none";
});

signUpform.addEventListener("submit", (e) => {
  e.preventDefault();

  let temp = {
    name: nameInput.value,
    email: emailInput[1].value,
    password: passwordInput[1].value,
  };
  console.log(temp);
  ALL_USER.push(temp);

  localStorage.setItem("all-users", JSON.stringify(ALL_USER));

  nameInput.value = "";
  emailInput[1].value = "";
  passwordInput[1].value = "";

  toast2.style.display = "flex";
});

signInform.addEventListener("submit", (e) => {
  e.preventDefault();

  let currentUser;

  ALL_USER.map((user) => {
    if (user.email === emailInput[0].value) {
      currentUser = user;
    }
  });

  if (currentUser) {
    console.log(currentUser, "CURRENT_USER");
    if (currentUser.password === passwordInput[0].value) {
      toast3.style.display = "flex";

      localStorage.setItem("CURRENT_USER", JSON.stringify(currentUser));

      window.location.href = "http://127.0.0.1:5500/project3/home%20.html";

      emailInput[0].value = "";
      passwordInput[0].value = "";
    } else {
      toast.style.display = "flex";
    }
  } else {
    toast4.style.display = "flex";
  }

  setTimeout(() => {
    toast.style.display = "none";
  }, 5000);
});
