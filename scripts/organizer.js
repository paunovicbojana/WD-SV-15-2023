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
const parent2 = document.getElementById("overlay");

function fetchFestivals() {
  const fest = getFestivals();
  const xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        let data = JSON.parse(this.responseText);
        for (let obj in data) {
          let festival = data[obj];
          createCard(obj, festival);
        }
        parent.lastElementChild.id = "c3";
      } else {
        console.log("Error fetching festivals:", this.status);
      }
    }
  };

  xhttp.open("GET", firebaseDatabase + fest + ".json");
  xhttp.send();
}

function fetchOrganizer() {
  const organizator = getOrganizer();
  const xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        let data = JSON.parse(this.responseText);
        for (let obj in data) {
          if (obj === organizator) {
            let logo = data[obj]["logo"];
            let naziv = data[obj]["naziv"];
            let innerHTML = `<div class="hero" style="background-image: url('${logo}'); filter: blur(10px); position:relative"></div><div class="hero-gradient"><h1 style="font-family:Akaya Telivigala;">${naziv}</h1></div>`;
            parent2.innerHTML = innerHTML;
          }
        }
      } else {
        console.log("Error fetching organizer:", this.status);
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
    <div id="${festival_id}" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
  `;
  for (let i = 0; i < festival_data["slike"].length; i++) {
    let slika = festival_data["slike"][i];
    let active = i === 0 ? "active" : "";
    innerHTML += `
      <div class="carousel-item ${active}">
        <div class="crop-container">
          <img src="${slika}" class="d-block w-100" alt="${festival_data["naziv"]} logo" style="object-fit: contain; object-position: center center; height:100%">
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
        <strong>Tip festivala:</strong> ${festival_data["tip"]}<br>
        <a href="#" class="rm">Pročitajte više...</a></p>
    </div>
  `;
  card.innerHTML = innerHTML;
  parent.appendChild(card);
}

fetchFestivals();
fetchOrganizer();
