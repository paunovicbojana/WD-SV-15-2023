let firebasedatabase =
  "https://wd-sv-15-2023-default-rtdb.europe-west1.firebasedatabase.app";
const parent = document.getElementById("organizers");
const organizerSearch = document.getElementById("organizer-search");
let allOrganizers = null;

const xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function () {
  if (this.readyState == 4) {
    if (this.status == 200) {
      let data = JSON.parse(this.responseText);
      allOrganizers = data;
      for (let obj in data) {
        let organizator = data[obj];
        createCard(obj, organizator);
      }
      parent.lastElementChild.id = "c3";
    } else {
      console.log("Error");
      location.href = "error.html";
    }
  }
};
xhttp.open("GET", firebasedatabase + "/organizatoriFestivala.json");
xhttp.send();

function createCard(obj, organizator) {
  let card = document.createElement("div");
  card.id = `${obj}`;
  card.classList.add("cards");
  card.innerHTML = `
    <div class="imgbx">
        <img src="${organizator["logo"]}" alt="${organizator["naziv"]}" width="250px" height="160px">
      </div>
      <div class="cont">
        <h4>${organizator["naziv"]}</h4>
        <p>${organizator["adresa"]}<br>
          ${organizator["kontaktTelefon"]}<br>
          ${organizator["email"]}<br>
        <a href="./organizers/organizer.html?organizer=${obj}&festivals=${organizator["festivali"]}" class="rm">Pročitajte više...</a></p>
      </div>
    </div>
  `;
  parent.appendChild(card);
}

organizerSearch.addEventListener("keyup", (event) => {
  let search = event.target.value.toLowerCase();
  let allCards = document.querySelectorAll(".cards");
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
