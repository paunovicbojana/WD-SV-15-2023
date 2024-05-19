function getFestival() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("festival");
}

function getFestivals() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("festivals");
}
const firebaseDatabase =
  "https://wd-sv-15-2023-default-rtdb.europe-west1.firebasedatabase.app";

const parent = document.getElementById("festival");
const hero2 = document.getElementById("hero2");

const fest = getFestival();
const sviFest = getFestivals();
const xhttp = new XMLHttpRequest();


xhttp.onreadystatechange = function () {
  if (this.readyState == 4) {
    if (this.status == 200) {
      let data = JSON.parse(this.responseText);
      create(data);
    } else {
      console.log("Error fetching festivals:", this.status);
      location.href = "../error.html";
    }
  }
};

xhttp.open(
  "GET",
  firebaseDatabase + "/festivali/" + sviFest + "/" + fest + ".json"
);
xhttp.send();

function create(fest) {
  let innerHTML = `
    <h2>${fest["naziv"]}<br></h2>
    <div id="festival_id" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
  `;
  let active = true;
  for (let slika of fest["slike"]) {
    let activeAttr = active ? "active" : "";
    innerHTML += `
      <div class="carousel-item ${activeAttr}">
        <div class="crop-container" id="crop">
          <img src="${slika}" class="d-block w-100" alt="${fest["naziv"]} logo" style="object-fit: cover; object-position: center center; width:100%; height:80vh;">
        </div>
      </div>
    `;
    active = false;
  }
  innerHTML += `
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#festival_id" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#festival_id" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>`;
  innerHTML += `
    <div class="cont">
      <p><br>${fest["opis"]}<br>
      <div style="border-radius: 20px;
  background-color: #474c1d;font-size: 1.2em;
  color: #ffffff;
  text-align: center;
  padding-bottom: 2%;
  padding-top: 2%;
  text-shadow: #3d3028 1px 1px;">
      <strong>Cena: </strong>${fest["cena"]} dinara<br>
        <strong>Prevoz:</strong> ${fest["prevoz"]}<br>
        <strong>Maksimalan broj osoba: </strong>${fest["maxOsoba"]}<br>
        <strong>Tip festivala:</strong> ${fest["tip"]}<br></div>
    </div>
  `;
  parent.innerHTML = innerHTML;
}


const wrapper = document.querySelector(".wrapper");
const registrationForm2 = document.querySelector(".registration2");
const registrationForm3 = document.querySelector(".registration3");
const loginLink = document.querySelector(".login-link");
const nextLink1 = document.getElementById("reg1");
const prevLink1 = document.getElementById("back1");
const prevLink2 = document.getElementById("back2");
const nextLink2 = document.getElementById("reg2");
const register = document.getElementById("reg3");
const registrationForm1 = document.querySelector(".registration1");
const registerLink = document.querySelector(".register-link");
const loginForm = document.querySelector(".login");
const login = document.getElementById("prijava");
const loginBtn = document.getElementById("login-btn");
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

prevLink1.addEventListener("click", () => {
  registrationForm2.classList.remove("active");
  registrationForm1.classList.add("active");
  event.preventDefault();
});
nextLink2.addEventListener("click", () => {
  registrationForm2.classList.remove("active");
  registrationForm3.classList.add("active");
  event.preventDefault();
});

prevLink2.addEventListener("click", () => {
  registrationForm3.classList.remove("active");
  registrationForm2.classList.add("active");
  event.preventDefault();
}
);
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
function loginUser() {
  let korIme = document.getElementById("korIme").value.trim();
  let lozinka = document.getElementById("lozinka").value.trim();

  if (!korIme || !lozinka) {
    alert("Molimo Vas da popunite sva polja!");
    return;
  }

  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState === 4) {
      if (this.status === 200) {
        let korisnici = JSON.parse(this.responseText);
        let korisnik = null;
        for (let key in korisnici) {
          if (korisnici[key].korisnickoIme === korIme && korisnici[key].lozinka === lozinka) {
            korisnik = korisnici[key];
            break;
          }
        }
        if (korisnik) {
          alert("Uspešno ste se prijavili!");
        } else {
          alert("Pogrešno korisničko ime ili lozinka. Pokušajte ponovo.");
        }
      } else {
        alert("Došlo je do greške prilikom prijave. Pokušajte ponovo.");
        console.error(this.statusText);
        location.href = "../error.html";
      }
    }
  };

  xhttp.open("GET", firebaseDatabase + "/korisnici.json", true);
  xhttp.send();
}