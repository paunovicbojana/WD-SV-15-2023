function getOrganizer() {
  const urlP = new URLSearchParams(window.location.search);
  return urlP.get("festivals");
}

let fest = getOrganizer();

const firebasedatabase =
  "https://wd-sv-15-2023-default-rtdb.europe-west1.firebasedatabase.app/";
const parent = document.getElementById("fest_cont");

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
      console.log("Error");
    }
  }
};

xhttp.open("GET", firebasedatabase + fest + ".json");
xhttp.send();

function createCard(festival_id, festival_data) {
  let card = document.createElement("div");

  card.classList.add("cards2");
  let unutrasnjiHTML = `
      <div id="${festival_id}" class="carousel slide carousel-fade" data-bs-ride="carousel">
      <div class="carousel-inner">
    `;
  let aktivni = true;
  for (let slika of festival_data["slike"]) {
    unutrasnjiHTML += `
      <div class="carousel-item ${aktivni ? "active" : ""}">
      <div class="crop-container">
        <img src="${slika}" class="d-block w-100" alt="${
      festival_data["naziv"]
    } logo">
    </div>
      </div>
    `;
    aktivni = false;
  }
  unutrasnjiHTML += `
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
      </p>
    </div>
  `;

  card.innerHTML = unutrasnjiHTML;
  parent.appendChild(card);
}
