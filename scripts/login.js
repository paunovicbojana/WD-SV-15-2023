const wrapper = document.querySelector(".wrapper");
const registrationForm2 = document.querySelector(".registration2");
const registrationForm3 = document.querySelector(".registration3");
const loginLink = document.querySelector(".login-link");
const nextLink1 = document.getElementById("reg1");
const nextLink2 = document.getElementById("reg2");
const register = document.getElementById("reg3");
const registrationForm1 = document.querySelector(".registration1");
const registerLink = document.querySelector(".register-link");
const loginForm = document.querySelector(".login");
const login = document.getElementById("prijava");
const loginBtn = document.getElementById("login-btn");

let dugmadZaGasenje = document.getElementsByClassName("icon-close");
for (let dugmeZaGasenje of dugmadZaGasenje) {
  dugmeZaGasenje.addEventListener("click", () => {
    wrapper.classList.remove("active");
    registrationForm1.classList.remove("active");
    registrationForm2.classList.remove("active");
    registrationForm3.classList.remove("active");
    loginForm.classList.remove("active");
    login.disabled = false;
  });
}

loginBtn.addEventListener("click", () => {
  event.preventDefault();
});

login.addEventListener("click", () => {
  wrapper.classList.add("active");
  loginForm.classList.add("active");
  login.disabled = true;
  event.preventDefault();
});

registerLink.addEventListener("click", () => {
  registrationForm1.classList.add("active");
  loginForm.classList.remove("active");
  event.preventDefault();
});

loginLink.addEventListener("click", () => {
  loginForm.classList.add("active");
  registrationForm1.classList.remove("active");
  event.preventDefault();
});

nextLink1.addEventListener("click", () => {
  registrationForm1.classList.remove("active");
  registrationForm2.classList.add("active");
  event.preventDefault();
});
nextLink2.addEventListener("click", () => {
  registrationForm2.classList.remove("active");
  registrationForm3.classList.add("active");
  event.preventDefault();
});
register.addEventListener("click", () => {
  registrationForm3.classList.remove("active");
  wrapper.classList.remove("active");
  loginForm.classList.add("active");
  login.disabled = false;
  event.preventDefault();
  toggleOverlay();
});
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

function toggleOverlay() {
  wrapper.classList.toggle("active");

  if (wrapper.classList.contains("active")) {
    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";
  } else {
    document.body.style.overflow = "";
    document.body.style.height = "";
  }
}

login.addEventListener("click", scrollToTop);
