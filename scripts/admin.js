let firebaseDatabase =
  "https://wd-sv-15-2023-default-rtdb.europe-west1.firebaseDatabase.app";

let tableKor = document.getElementById("tableKor");
let tableOrg = document.getElementById("tableOrg");
let tableFest = document.getElementById("tableFest");
let btnOrg = document.querySelector(".btn-org");
let btnKor = document.querySelector(".btn-k");
let btnAdd = document.querySelector(".btn-add");
const korIme = document.getElementById("kor-izm-ime");
const korPrezime = document.getElementById("kor-izm-prezime");
const korKorIme = document.getElementById("kor-izm-kor-ime");
const korEmail = document.getElementById("kor-izm-email");
const korLozinka = document.getElementById("kor-izm-lozinka");
const korDatRodj = document.getElementById("kor-izm-dat-rodj");
const korAdresa = document.getElementById("kor-izm-adresa");
const korTelefon = document.getElementById("kor-izm-telefon");
const korZanimanje = document.getElementById("kor-izm-zanimanje");
const orgIme = document.getElementById("org-naziv");
const orgAdresa = document.getElementById("org-adresa");
const orgKontaktTelefon = document.getElementById("org-kontakt");
const orgEmail = document.getElementById("org-mail");
const orgGodinaOsnivanja = document.getElementById("org-godina");
const orgLink = document.getElementById("org-link");
const festIme = document.getElementById("fest-naziv");
const festCena = document.getElementById("fest-cena");
const festOpis = document.getElementById("fest-opis");
const festPrevoz = document.getElementById("fest-prevoz");
const festMaxOsoba = document.getElementById("fest-osobe");
const festTip = document.getElementById("fest-tip");
const festSlike = document.getElementById("fest-slike");
const festIme1 = document.getElementById("fest-naziv1");
const festCena1 = document.getElementById("fest-cena1");
const festOpis1 = document.getElementById("fest-opis1");
const festPrevoz1 = document.getElementById("fest-prevoz1");
const festMaxOsoba1 = document.getElementById("fest-osobe1");
const festTip1 = document.getElementById("fest-tip1");
const festSlike1 = document.getElementById("fest-slike1");  
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

const loginBtn = document.getElementById("login-btn");
loginBtn.addEventListener("click", () => {
  event.preventDefault();
});

const prevLink1 = document.getElementById("back1");
const prevLink2 = document.getElementById("back2");
const login = document.getElementById("prijava");
prevLink1.addEventListener("click", () => {
  registrationForm2.classList.remove("active");
  registrationForm1.classList.add("active");
  event.preventDefault();
});
prevLink2.addEventListener("click", () => {
  registrationForm3.classList.remove("active");
  registrationForm2.classList.add("active");
  event.preventDefault();
}
);


const dodajFestivalBtn = document.getElementById("dodajFestivalBtn");

const xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function () {
  if (this.readyState == 4) {
    if (this.status == 200) {
      let data = JSON.parse(this.responseText);
      createOrg(data);
    } else {
      console.log("or:", this.status);
      location.href = "../error.html";
    }
  }
};

xhttp.open("GET", firebaseDatabase + "/organizatoriFestivala.json");
xhttp.send();

const xhttp2 = new XMLHttpRequest();

xhttp2.onreadystatechange = function () {
  if (this.readyState == 4) {
    if (this.status == 200) {
      let data = JSON.parse(this.responseText);
      createUser(data);
    } else {
      console.log("Error:", this.status);
      location.href = "../error.html";
    }
  }
};

xhttp2.open("GET", firebaseDatabase + "/korisnici.json");
xhttp2.send();

function fetchFestivals(fest, callback) {
  const xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        let data = JSON.parse(this.responseText);
        if (data) {
          let count = Object.keys(data).length;
          callback(count);
        } else {
          console.log("Error: Empty response received");
          location.href = "../error.html";
          callback(0);
        }
      } else {
        console.log("Error fetching festivals:", this.status);
        location.href = "../error.html";
        callback(0);
      }
    }
  };

  xhttp.open("GET", firebaseDatabase + "/festivali/" + fest + ".json");
  xhttp.send();
}

function fetchFestivals2(id) {
  const xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        let data = JSON.parse(this.responseText);
        for (let obj in data) {
          if (obj === id) {
            fetchFestivals3(data[obj]["festivali"]);
          }
        }
      } else {
        console.log("Error fetching festivals:", this.status);
        location.href = "../error.html";
      }
    }
  };

  xhttp.open("GET", firebaseDatabase + "/organizatoriFestivala.json");
  xhttp.send();
}

function fetchFestivals3(festivals) {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        let data = JSON.parse(this.responseText);
        dodajFestivalBtn.setAttribute("data-festivalsID", festivals);
        createFest(festivals, data);
      } else {
        console.log("Error fetching festivals:", this.status);
        location.href = "../error.html";
      }
    }
  };

  xhttp.open("GET", firebaseDatabase + `/festivali/${festivals}.json`);
  xhttp.send();
}

function createOrg(data) {
  let innerHTML = `

  <thead>
    <tr>
      <th scope="col">Logo</th>
      <th scope="col">Naziv</th>
      <th scope="col">Adresa</th>
      <th scope="col">Kontakt telefon</th>
      <th scope="col">E-mail</th>
      <th scope="col">Godina osnivanja</th>
      <th scope="col">Festivali</th>
      <th scope="col">Radnje</th>
    </tr>
  </thead>
  <tbody>`;
  for (let obj in data) {
    let value = data[obj];
    fetchFestivals(value["festivali"], function (count) {
      innerHTML += `
      <tr>
        <th scope="row"><div class="abc" style="height:50px;width:50px;"><img src="${value["logo"]}" style="height:100%; width:100%; overflow: hidden; object:cover;border-radius:50%"></div></th>
        <td>${value["naziv"]}</td>
        <td>${value["adresa"]}</td>
        <td>${value["kontaktTelefon"]}</td>
        <td>${value["email"]}</td>
        <td>${value["godinaOsnivanja"]}</td>
        <td><button class="btn-fest" id="${obj}" data-festivalsID="${value["festivali"]}">${count} festivala</button></td>
        <td>
          <button class="btn btn-success btnIzmeniOrg" style="display: inline-block" 
    onclick="scrollToTop(); toggleOverlayOrg(); 
             setOrgInitValues('${value["naziv"]}', '${value["adresa"]}', '${value["kontaktTelefon"]}', '${value["email"]}', '${value["godinaOsnivanja"]}', '${value["logo"]}');">
    Izmeni
</button>

          <button class="btn btn-danger btnObrisiOrg" style="display: inline-block"  onclick="if (confirm('Da li ste sigurni da želite da obrišete entitet?')) {obrisiOrg('${obj}')} else {return false;}">Obriši</button>
      </td>
      </tr>
      `;
      innerHTML += `</tbody>`;
      tableOrg.innerHTML = innerHTML;

      let sviBtnFestovi = document.getElementsByClassName("btn-fest");
      for (let dugme of sviBtnFestovi) {
        dugme.addEventListener("click", (event) => {
          tableKor.classList.remove("active");
          let id = event.target.getAttribute("data-festivalsID");
          fetchFestivals3(id);
          btnAdd.classList.add("active");
        });
      }
    });
  }
}

function createUser(data) {
  let innerHTML = `
  <thead>
    <tr>
      <th scope="col">Ime</th>
      <th scope="col">Prezime</th>
      <th scope="col">Korisničko ime</th>
      <th scope="col">E-mail</th>
      <th scope="col">Lozinka</th>
      <th scope="col">Datum rođenja</th>
      <th scope="col">Adresa</th>
      <th scope="col">Telefon</th>
      <th scope="col">Zanimanje</th>
    </tr>
  </thead>
  <tbody>`;
  for (let obj in data) {
    let value = data[obj];
    innerHTML += `
    <tr>
      <td>${value["ime"]}</td>
      <td>${value["prezime"]}</td>
      <td>${value["korisnickoIme"]}</td>
      <td>${value["email"]}</td>
      <td>${value["lozinka"]}</td>
      <td>${value["datumRodjenja"]}</td>
      <td>${value["adresa"]}</td>
      <td>${value["telefon"]}</td>
      <td>${value["zanimanje"]}</td>
      <td>
        <button class="btn btn-success btnIzmeniK" id="izmena-kor" style="display: inline-block" 
    onclick="scrollToTop(); toggleOverlayUser(); 
             setUserInitValues('${value["ime"]}', '${value["prezime"]}', '${value["korisnickoIme"]}', '${value["email"]}', '${value["lozinka"]}', '${value["datumRodjenja"]}', '${value["adresa"]}', '${value["telefon"]}', '${value["zanimanje"]}');">
    Izmeni
</button>

        <button class="btn btn-danger btnObrisiK" style="display: inline-block" onclick="if (confirm('Da li ste sigurni da želite da obrišete entitet?')) {obrisiKorisnika('${obj}')} else {return false;}">Obriši</button>
    </td>
    </tr>
    `;
  }
  innerHTML += `
    </tbody>
    `;
  tableKor.innerHTML = innerHTML;
}

function createFest(festsID, festivals) {
  let innerHTML = `<thead>
            <tr>
              <th scope="col">Slike</th>
              <th scope="col">Naziv</th>
              <th scope="col">Cena</th>
              <th scope="col">Opis</th>
              <th scope="col">Prevoz</th>
              <th scope="col">Max osoba</th>
              <th scope="col">Tip</th>
            </tr>
          </thead>
          <tbody>`;
  for (let fest in festivals) {
    let value = festivals[fest];
    innerHTML += `
    <tr>
      <td>
        <div id="${fest}" class="carousel slide w-100" data-bs-ride="carousel">
          <div class="carousel-inner"  style="width: 20vw">
    `;
    for (let i = 0; i < value["slike"].length; i++) {
      let slika = value["slike"][i];
      let active = i === 0 ? "active" : "";
      innerHTML += `
            <div class="carousel-item ${active}">
              <div class="crop-container" >
                <img src="${slika}" class="d-block w-100" alt="${fest["naziv"]} logo" style="object-fit: cover; object-position: center center; height:250px;border-radius:20px;">
              </div>
            </div>
          `;
    }
    innerHTML += `
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#${fest}" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#${fest}" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </td>
      <td>${value["naziv"]}</td>
      <td>${value["cena"]}</td>
      <td>${value["opis"]}</td>
      <td>${value["prevoz"]}</td>
      <td>${value["maxOsoba"]}</td>
      <td>${value["tip"]}</td>
      <td>
        <!--<button class="btn btn-success btnIzmeniF" id="izmena-kor" style="display: inline-block" onclick="scrollToTop(); toggleOverlayFest(); setFestInitValues('${value["naziv"]}', '${value["cena"]}', '${value["opis"]}', '${value["prevoz"]}', '${value["maxOsoba"]}', '${value["tip"]}', '${value["slike"]}');">Izmeni</button>-->
        <button class="btn btn-danger btnObrisiF" style="display: inline-block" onclick="if (confirm('Da li ste sigurni da želite da obrišete entitet?')) {obrisiFestival('${festsID}','${fest}')} else {return false;}">Obriši</button>
      </td>
    </tr>
    `;
  }
  innerHTML += `</tbody>`;
  tableFest.innerHTML = innerHTML;
  tableOrg.classList.remove("active");
  tableFest.classList.add("active");
}

btnOrg.addEventListener("click", (event) => {
  tableOrg.classList.add("active");
  tableFest.classList.remove("active");
  tableKor.classList.remove("active");

  btnOrg.classList.add("active");
  btnKor.classList.remove("active");
  btnAdd.classList.remove("active");
});

btnKor.addEventListener("click", (event) => {
  tableKor.classList.add("active");
  tableFest.classList.remove("active");
  tableOrg.classList.remove("active");
  btnKor.classList.add("active");
  btnOrg.classList.remove("active");
  btnAdd.classList.remove("active");
});

function setUserInitValues(ime, prezime, korisnickoIme, email, lozinka, datumRodjenja, adresa, telefon, zanimanje) {
  korIme.value = ime;
  korPrezime.value = prezime;
  korKorIme.value = korisnickoIme;
  korEmail.value = email;
  korLozinka.value = lozinka;
  korDatRodj.value = datumRodjenja;
  korAdresa.value = adresa;
  korTelefon.value = telefon;
  korZanimanje.value = zanimanje;
  
}

function setOrgInitValues(naziv, adresa, kontaktTelefon, email, godinaOsnivanja, link) {
  orgIme.value = naziv;
  orgAdresa.value = adresa;
  orgKontaktTelefon.value = kontaktTelefon;
  orgEmail.value = email;
  orgGodinaOsnivanja.value = godinaOsnivanja;
  orgLink.value = link;
}

function setFestInitValues(naziv, cena, opis, prevoz, maxOsoba, tip, slike) {
  festIme.value = naziv;
  festCena.value = cena;
  festOpis.value = opis;
  festPrevoz.value = prevoz;
  festMaxOsoba.value = maxOsoba;
  festTip.value = tip;
  festSlike.value = slike;
}

function obrisiOrg(id) {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        console.log("Organizator uspešno obrisan");
        location.reload();
      } else {
        console.log("Error:", this.status);
        location.href = "../error.html";
      }
    }
  };

  xhttp.open("DELETE", firebaseDatabase + "/organizatoriFestivala/" + id + ".json");
  xhttp.send();
}

function obrisiKorisnika(id) {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        console.log("Korisnik uspešno obrisan");
        location.reload();
      } else {
        console.log("Error:", this.status);
        location.href = "../error.html";
      }
    }
  };

  xhttp.open("DELETE", firebaseDatabase + "/korisnici/" + id + ".json");
  xhttp.send();
}

function obrisiFestival(festivali, id) {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        console.log("Festival uspešno obrisan");
        location.reload();
      } else {
        console.log("Error:", this.status);
        location.href = "../error.html";
      }
    }
  };

  xhttp.open("DELETE", firebaseDatabase + "/festivali/" + festivali +"/" + id + ".json");
  xhttp.send();
}

function dodajFestival() {
  // Get the festival ID from the button's data attribute
  let festsID = dodajFestivalBtn.getAttribute("data-festivalsID");

  // Validate inputs
  let cena = festCena1.value.trim();
  let maxOsoba = festMaxOsoba1.value.trim();
  let naziv = festIme1.value.trim();
  let opis = festOpis1.value.trim();
  let prevoz = festPrevoz1.value.trim();
  let slike = festSlike1.value.trim().split(",");
  let tip = festTip1.value.trim();

  // Check for empty fields
  if (!cena || !maxOsoba || !naziv || !opis || !prevoz || !slike.length || !tip) {
    alert("Sva polja moraju biti popunjena.");
    return;
  }

  // Check if cena and maxOsoba are valid numbers
  else if (isNaN(cena) || isNaN(maxOsoba)) {
    alert("Cena i Maksimalan broj osoba moraju biti brojevi.");
    return;
  }

  else{
  // Prepare the XMLHttpRequest
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        console.log("Festival uspešno dodat");
        location.reload();
      } else {
        console.log("Error:", this.status);
        location.href = "../error.html";
      }
    }
  };

  // Open the request and set headers
  xhttp.open("POST", firebaseDatabase + "/festivali/" + festsID + ".json", true);
  xhttp.setRequestHeader("Content-Type", "application/json");

  // Send the request with the festival data
  xhttp.send(
    JSON.stringify({
      cena: cena,
      maxOsoba: maxOsoba,
      naziv: naziv,
      opis: opis,
      prevoz: prevoz,
      slike: slike,
      tip: tip
    })
  );}
}

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

