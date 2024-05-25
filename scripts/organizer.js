let allOrganizers = null;
let allFestivals = null;

function getFestivals() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("festivals");
}

function getOrganizer() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("organizer");
}

const firebaseDatabase =
  "https://wd-sv-15-2023-default-rtdb.europe-west1.firebasedatabase.app/";
const parent = document.getElementById("fest_cont");
const parent2 = document.getElementById("hero2");
const parent3 = document.getElementById("hero-gradient2");
const parent4 = document.getElementById("body2");
const searchByName = document.getElementById("searchbyname");
const searchByType = document.getElementById("searchbytype");

const fest = getFestivals();

function fetchFestivals() {
  const xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        let data = JSON.parse(this.responseText);
        allFestivals = data;
        for (let obj in data) {
          let festival = data[obj];
          createCard(obj, festival);
        }
      } else {
        console.log("Error fetching festivals:", this.status);
        location.href = "../error.html";
      }
    }
  };

  xhttp.open("GET", firebaseDatabase + "festivali/" + fest + ".json");
  xhttp.send();
}

function fetchOrganizer() {
  const organizator = getOrganizer();
  const xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        let data = JSON.parse(this.responseText);
        allOrganizers = data;
        for (let obj in data) {
          if (obj === organizator) {
            let logo = data[obj]["logo"];
            let naziv = data[obj]["naziv"];
            let naslov = document.createElement("h1");
            let adresa = data[obj]["adresa"];
            let email = data[obj]["email"];
            let godinaOsnivanja = data[obj]["godinaOsnivanja"];
            let kontaktTelefon = data[obj]["kontaktTelefon"];
            naslov.style.fontFamily = "Akaya Telivigala";
            naslov.innerHTML = naziv;
            parent2.style.cssText = `background-image: url('${logo}');`;
            parent3.appendChild(naslov);

            let oNama = document.createElement("div");
            oNama.classList.add("oNama");
            let innerHTML1 = `
              <div class="oN" style="border-radius: 20px;
              font-size: 1.2em;
              color: #ffffff;
              text-align: center;
              padding: 2%;
              margin-inline: 10%;
              margin-bottom: 2%;
              text-shadow: #3d3028 1px 1px;
              background-color: #5e652a;">
                <h1 style="font-family: Akaya Telivigala">O nama</h1>
                <p><strong>Adresa:</strong> ${adresa}<br>
                <strong>E-mail:</strong> ${email}<br>
                <strong>Godina osnivanja:</strong> ${godinaOsnivanja}<br>
                <strong>Kontakt telefon:</strong> ${kontaktTelefon}<br>
                </p><div>
              `;
            oNama.innerHTML = innerHTML1;
            let org = document.getElementById("org1");
            let c2 = document.getElementById("c2");
            org.insertBefore(oNama, c2);
          }
        }
      } else {
        console.log("Error fetching organizer:", this.status);
        location.href = "../error.html";
      }
    }
  };

  xhttp.open("GET", firebaseDatabase + "/organizatoriFestivala.json");
  xhttp.send();
}

function createCard(festival_id, festival_data) {
  let card = document.createElement("div");
  card.classList.add("cards2");
  let innerHTML = `
    <div id="${festival_id}" class="carousel slide w-100" data-bs-ride="carousel">
      <div class="carousel-inner">
  `;
  for (let i = 0; i < festival_data["slike"].length; i++) {
    let slika = festival_data["slike"][i];
    let active = i === 0 ? "active" : "";
    innerHTML += `
      <div class="carousel-item ${active}">
        <div class="crop-container">
          <img src="${slika}" class="d-block w-100" alt="${festival_data["naziv"]} logo" style="object-fit: cover; object-position: center center; height:250px;border-radius:20px;">
        </div>
      </div>
    `;
  }
  innerHTML += `
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#${festival_id}" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#${festival_id}" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
    <div class="cont">
      <h4>${festival_data["naziv"]}<br></h4>
      <p><strong>Cena: </strong>${festival_data["cena"]} dinara<br>
        <strong>Prevoz:</strong> ${festival_data["prevoz"]}<br>
        <strong>Tip festivala:</strong><span class="tipFestivalaText">${festival_data["tip"]}</span><br>
        <a href="./festival.html?festivals=${fest}&festival=${festival_id}" class="rm">Pročitajte više...</a></p>
    </div>
  `;
  card.innerHTML = innerHTML;
  parent.appendChild(card);
}

fetchFestivals();
fetchOrganizer();

searchByName.addEventListener("keyup", (event) => {
  let search = event.target.value.toLowerCase();
  let allCards = document.querySelectorAll(".cards2");
  allCards.forEach((card) => {
    let cardData = card.querySelector("h4");
    let text = cardData.innerText.toLowerCase();
    if (text.includes(search)) {
      card.style.display = "flex";
      let originalText = cardData.innerText;
      let highlightedText = originalText.replace(new RegExp(search, 'gi'), (match) => {
        return `<span class="highlight">${match}</span>`;
      });
      cardData.innerHTML = highlightedText;
    } else {
      card.style.display = "none";
      cardData.innerHTML = cardData.innerText;
    }
  });
});

searchByType.addEventListener("keyup", (event) => {
  let search = event.target.value.toLowerCase();
  let allCards = document.querySelectorAll(".cards2");
  allCards.forEach((card) => {
    let cardData = card.querySelector(".tipFestivalaText");
    let text = cardData.innerText.toLowerCase();
    if (text.includes(search)) {
      card.style.display = "flex";
      let originalText = cardData.innerText;
      let highlightedText = originalText.replace(new RegExp(search, 'gi'), (match) => {
        return `<span class="highlight2">${match}</span>`;
      });
      cardData.innerHTML = highlightedText;
    } else {
      card.style.display = "none";
      cardData.innerHTML = cardData.innerText;
    }
  });
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

