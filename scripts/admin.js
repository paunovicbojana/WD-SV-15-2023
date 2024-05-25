let firebaseDatabase =
  "https://wd-sv-15-2023-default-rtdb.europe-west1.firebaseDatabase.app";

let tableKor = document.getElementById("tableKor");
let tableOrg = document.getElementById("tableOrg");
let tableFest = document.getElementById("tableFest");
let btnOrg = document.querySelector(".btn-org");
let btnKor = document.querySelector(".btn-k");
let btnAdd = document.querySelector(".btn-add");

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

const update = document.getElementById("cd3");

let allUsers;

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
      allUsers = data
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
             setOrgInitValues('${obj}', '${value["festivali"]}', '${value["naziv"]}', '${value["adresa"]}', '${value["kontaktTelefon"]}', '${value["email"]}', '${value["godinaOsnivanja"]}', '${value["logo"]}');">
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
        <button class="btn btn-success btnIzmeniK" style="display: inline-block" 
    onclick="scrollToTop(); toggleOverlayUser(); 
             setUserInitValues('${obj}', '${value["ime"]}', '${value["prezime"]}', '${value["korisnickoIme"]}', '${value["email"]}', '${value["lozinka"]}', '${value["datumRodjenja"]}', '${value["adresa"]}', '${value["telefon"]}', '${value["zanimanje"]}')">
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
        <!--<button class="btn btn-success btnIzmeniF" id="izmeni-fest" style="display: inline-block" onclick="scrollToTop(); toggleOverlayFest(); setFestInitValues('${value["naziv"]}', '${value["cena"]}', '${value["opis"]}', '${value["prevoz"]}', '${value["maxOsoba"]}', '${value["tip"]}', '${value["slike"]}');">Izmeni</button>-->
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

function setUserInitValues(id, ime, prezime, korisnickoIme, email, lozinka, datumRodjenja, adresa, telefon, zanimanje) {
  korIme.value = ime;
  korPrezime.value = prezime;
  korKorIme.value = korisnickoIme;
  korEmail.value = email;
  korLozinka.value = lozinka;
  korDatRodj.value = datumRodjenja;
  korAdresa.value = adresa;
  korTelefon.value = telefon;
  korZanimanje.value = zanimanje;
  korZanimanje.setAttribute("data-userid", id);
}

function setOrgInitValues(id, festivali, naziv, adresa, kontaktTelefon, email, godinaOsnivanja, link) {
  orgIme.value = naziv;
  orgAdresa.value = adresa;
  orgKontaktTelefon.value = kontaktTelefon;
  orgEmail.value = email;
  orgGodinaOsnivanja.value = godinaOsnivanja;
  orgLink.value = link;
  orgLink.setAttribute("data-orgid", id)
  orgLink.setAttribute("data-festivali", festivali)
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


const korIme = document.getElementById("kor-izm-ime");
const korPrezime = document.getElementById("kor-izm-prezime");
const korKorIme = document.getElementById("kor-izm-kor-ime");
const korEmail = document.getElementById("kor-izm-email");
const korLozinka = document.getElementById("kor-izm-lozinka");
const korDatRodj = document.getElementById("kor-izm-dat-rodj");
const korAdresa = document.getElementById("kor-izm-adresa");
const korTelefon = document.getElementById("kor-izm-telefon");
const korZanimanje = document.getElementById("kor-izm-zanimanje");



function changeUser() {
  let userID = korZanimanje.getAttribute("data-userid");
  console.log(allUsers[userID])
  let korIme2 = korKorIme.value.trim();
  console.log(korIme2);
  let email = korEmail.value.trim();
  console.log(email);
  let lozinka = korLozinka.value.trim();
  console.log(lozinka);
  let broj = korTelefon.value.trim();
  console.log(broj);
  let adresa = korAdresa.value.trim();
  console.log(adresa);
  let ime = korIme.value.trim();
  console.log(ime);
  let prezime = korPrezime.value.trim();
  console.log(prezime);
  let zanimanje = korZanimanje.value.trim();
  console.log(zanimanje);
  let datum = korDatRodj.value.trim();
  console.log(datum);

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
    korisnickoIme: korIme2,
    lozinka: lozinka,
    prezime: prezime,
    telefon: broj,
    zanimanje: zanimanje
  };

  
const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState === 4) {
      if (this.status === 200) {
        alert("Uspešno ste izmenili korisnika!");
        console.log(this.responseText);
      } else {
        alert("Došlo je do greške prilikom izmene korisnika. Pokušajte ponovo.");
        console.error(this.statusText);
        location.href = "../error.html";
      }
    }
  };

  xhttp.open("PUT", firebaseDatabase + "/korisnici/" + userID + ".json", true);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify(korisnik));
}

function changeOrg(){
  let orgId = orgLink.getAttribute("data-orgid")
  let festivali = orgLink.getAttribute("data-festivali")
  let naziv = orgIme.value.trim();
  let adresa = orgAdresa.value.trim();
  let kontaktTelefon = orgKontaktTelefon.value.trim();
  let email = orgEmail.value.trim();
  let godinaOsnivanja = orgGodinaOsnivanja.value.trim();
  let link = orgLink.value.trim();

  if (!naziv || !adresa || !kontaktTelefon || !email || !godinaOsnivanja || !link) {
    alert("Molimo Vas da popunite sva polja!");
    return;
  }

  const phonePattern = /^[0-9\/-]+$/;
  if (!phonePattern.test(kontaktTelefon)) {
    alert("Broj telefona mora sadržavati samo cifre.");
    return;
  }

  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailPattern.test(email)) {
    alert("Unesite ispravnu email adresu.");
    return;
  }

  if (godinaOsnivanja.length !== 4) {
    alert("Godina osnivanja mora sadržavati 4 cifre.");
    return;
  }

  let organizator = {
    adresa: adresa,
    email: email,
    festivali: festivali,
    godinaOsnivanja: godinaOsnivanja,
    kontaktTelefon: kontaktTelefon,
    logo: link,
    naziv: naziv
  };

  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState === 4) {
      if (this.status === 200) {
        alert("Uspešno ste izmenili organizatora!");
        console.log(this.responseText);
      } else {
        alert("Došlo je do greške prilikom izmene organizatora. Pokušajte ponovo.");
        console.error(this.statusText);
        location.href = "../error.html";
      }
    }
  };

  xhttp.open("PUT", firebaseDatabase + "/organizatoriFestivala/" + orgId + ".json", true);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify(organizator));
}