let btnIzmeniK = document.querySelector(".btnIzmeniK");
let btnObrisiK = document.querySelector(".btnObrisiK");
let btnIzmeniOrg = document.querySelector(".btnIzmeniOrg");
let btnObrisiOrg = document.querySelector(".btnObrisiOrg");
let wrapperUser = document.querySelector(".change-data-wrapper-user");
let changeData1User = document.querySelector(".changeData1");
let changeData2User = document.querySelector(".changeData2");
let changeData3User = document.querySelector(".changeData3");
let cd1 = document.getElementById("cd1");
let cd2 = document.getElementById("cd2");
let cd3 = document.getElementById("cd3");
let izmenaKor = document.getElementById("izmena-kor");

cd1.addEventListener("click", (event) => {
  changeData1User.classList.remove("active");
  changeData2User.classList.add("active");
  event.preventDefault();
});
cd2.addEventListener("click", (event) => {
  changeData2User.classList.remove("active");
  changeData3User.classList.add("active");
  event.preventDefault();
});
cd3.addEventListener("click", (event) => {
  changeData3User.classList.remove("active");
  wrapperUser.classList.remove("active");
  event.preventDefault();
  document.body.style.overflowY = "scroll";
});

let dugmadZaGasenjeUser = document.getElementsByClassName("icon-close");
for (let dugmeZaGasenjeUser of dugmadZaGasenjeUser) {
  dugmeZaGasenjeUser.addEventListener("click", () => {
    wrapperUser.classList.remove("active");
    event.preventDefault();
  });
}

function scrollToTopUser() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

function toggleOverlayUser() {
  wrapperUser.classList.toggle("active");

  if (wrapperUser.classList.contains("active")) {
    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";
  } else {
    document.body.style.overflow = "";
    document.body.style.height = "";
  }
}
