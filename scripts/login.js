
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
const regKorIme = document.getElementById("reg-korIme");
const regEmail = document.getElementById("reg-email");
const regLozinka = document.getElementById("reg-lozinka");
const regBroj = document.getElementById("reg-broj");
const regAdresa = document.getElementById("reg-adresa");
const regIme = document.getElementById("reg-ime");
const regPrezime = document.getElementById("reg-prezime");
const regZanimanje = document.getElementById("reg-zanimanje");
const regDatum = document.getElementById("reg-datum");
const wrapper = document.querySelector(".wrapper");

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



login.addEventListener("click", scrollToTop);

function registerUser() {
  let korIme = regKorIme.value.trim();
  let email = regEmail.value.trim();
  let lozinka = regLozinka.value.trim();
  let broj = regBroj.value.trim();
  let adresa = regAdresa.value.trim();
  let ime = regIme.value.trim();
  let prezime = regPrezime.value.trim();
  let zanimanje = regZanimanje.value.trim();
  let datum = regDatum.value.trim();

  
  if (!korIme || !email || !lozinka || !broj || !adresa || !ime || !prezime || !zanimanje || !datum) {
    alert("Molimo Vas da popunite sva polja!");
    return;
  }
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailPattern.test(email)) {
    alert("Unesite ispravnu email adresu.");
    return;
  }
  if (lozinka.length < 6) {
    alert("Lozinka mora imati najmanje 6 karaktera.");
    return;
  }
  const phonePattern = /^[0-9]+$/;
  if (!phonePattern.test(broj)) {
    alert("Broj telefona mora sadržavati samo cifre.");
    return;
  }
  let korisnik = {
    adresa: adresa,
    datumRodjenja: datum,
    email: email,
    ime: ime,
    korisnickoIme: korIme,
    lozinka: lozinka,
    prezime: prezime,
    telefon: broj,
    zanimanje: zanimanje
  };

  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState === 4) {
      if (this.status === 200) {
        alert("Registracija uspešna!");
        console.log(this.responseText);
      } else {
        alert("Došlo je do greške prilikom registracije. Pokušajte ponovo.");
        console.error(this.statusText);
        location.href = "../error.html";
      }
    }
  };

  xhttp.open("POST", firebaseDatabase + "/korisnici.json", true);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify(korisnik));
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