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
        createCard(festival);
      }
      parent.lastElementChild.id = "c3";
    } else {
      console.log("Error");
    }
  }
};

xhttp.open("GET", firebasedatabase + fest + ".json");
xhttp.send();

function createCard(festival) {
  let card = document.createElement("div");
  card.classList.add("cards2");
  card.innerHTML = `
    <div class="imgbx">
        <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="..." class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="..." class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="..." class="d-block w-100" alt="...">
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
      </div>
      <div class="cont">
        <h4>${festival["naziv"]}<br></h4>
        <p><strong>Cena: ${festival["cena"]}</strong><br>
          <strong>Prevoz:</strong> ${festival["prevoz"]}<br>
          <strong>Tip festivala:</strong> ${festival["tip"]}<br>
        <a href="./organizers/organizer.html?festival=${festival}" class="rm">Pročitajte više...</a></p>
      </p>
        </div>
    </div>
  `;
  parent.appendChild(card);
}
