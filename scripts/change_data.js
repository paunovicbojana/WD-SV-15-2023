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
let izmenaKor = document.querySelector(".izmena-kor");
let wrapperOrg = document.querySelector(".change-data-wrapper-org");
let cd1o = document.getElementById("cd1o");
let cd2o = document.getElementById("cd2o");
let changeData1Org = document.querySelector(".changeData1o");
let changeData2Org = document.querySelector(".changeData2o");
let wrapperFest = document.querySelector(".change-data-wrapper-fest")
let cd1f = document.getElementById("cd1f");
let cd2f = document.getElementById("cd2f");
let changeData1Fest = document.querySelector(".changeData1f");
let changeData2Fest = document.querySelector(".changeData2f");
let wrapperFestI = document.querySelector(".input-wrapper-fest")
let i1f = document.getElementById("i1f");
let i2f = document.getElementById("i2f");
let fest1I = document.querySelector(".input1f");
let fest2I = document.querySelector(".input2f");


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
  changeData1User.classList.add("active");
  wrapperUser.classList.remove("active");
  event.preventDefault();
  document.body.style.overflowY = "scroll";
});

let dugmadZaGasenjeUser = document.getElementsByClassName("icon-close");
for (let dugmeZaGasenjeUser of dugmadZaGasenjeUser) {
  dugmeZaGasenjeUser.addEventListener("click", () => {
    wrapperUser.classList.remove("active");
    event.preventDefault();
    changeData2Fest.style.height = "400px";
  wrapperFest.style.height = "400px";
changeData2Fest.classList.remove("active");
  changeData1Fest.classList.add("active");
  changeData1User.classList.add("active");
  changeData2User.classList.remove("active");
  changeData3User.classList.remove("active");
  document.body.style.overflowY = "scroll";
  changeData1Org.classList.add("active");
  changeData2Org.classList.remove("active");


  });
}

cd1o.addEventListener("click", (event) => {
  changeData1Org.classList.remove("active");
  changeData2Org.classList.add("active");
  event.preventDefault();
});
cd2o.addEventListener("click", (event) => {
  changeData2Org.classList.remove("active");
  changeData1Org.classList.add("active");
  wrapperOrg.classList.remove("active");
  event.preventDefault();
  document.body.style.overflowY = "scroll";
});

cd1f.addEventListener("click", (event) => {
  changeData1Fest.classList.remove("active");
  changeData2Fest.classList.add("active");
  changeData2Fest.style.height = "500px";
  wrapperFest.style.height = "500px";
  event.preventDefault();
});
cd2f.addEventListener("click", (event) => {
  changeData2Fest.classList.remove("active");
  changeData1Fest.classList.add("active");
  wrapperFest.classList.remove("active");
  changeData2Fest.style.height = "400px";
  wrapperFest.style.height = "400px";
  event.preventDefault();
  document.body.style.overflowY = "scroll";
});

btnAdd.addEventListener("click", (event) => {
  wrapperFestI.classList.add("active");
  fest1I.classList.add("active");
  event.preventDefault();
});

i1f.addEventListener("click", (event) => {
  fest1I.classList.remove("active");
  fest2I.classList.add("active");
  fest2I.style.height = "500px";
  wrapperFestI.style.height = "500px";
  event.preventDefault();
});
i2f.addEventListener("click", (event) => {
  fest2I.classList.remove("active");
  fest1I.classList.add("active");
  wrapperFestI.classList.remove("active");
  fest2I.style.height = "400px";
  wrapperFestI.style.height = "400px";
  event.preventDefault();
  document.body.style.overflowY = "scroll";
});

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
function toggleOverlayOrg() {
  wrapperOrg.classList.toggle("active");

  if (wrapperOrg.classList.contains("active")) {
    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";
  } else {
    document.body.style.overflow = "";
    document.body.style.height = "";
  }
}

function toggleOverlayFest() {
  wrapperFest.classList.toggle("active");

  if (wrapperFest.classList.contains("active")) {
    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";
  } else {
    document.body.style.overflow = "";
    document.body.style.height = "";
  }
}

function toggleOverlayFestI() {
  wrapperFestI.classList.toggle("active");

  if (wrapperFestI.classList.contains("active")) {
    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";
  } else {
    document.body.style.overflow = "";
    document.body.style.height = "";
  }
}

