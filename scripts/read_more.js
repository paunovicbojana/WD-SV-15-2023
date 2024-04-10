const firebasedatabase =
  "https://wd-sv-15-2023-default-rtdb.europe-west1.firebasedatabase.app";
const parent = document.getElementById("organizers");

const xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function () {
  if (this.readyState == 4) {
    if (this.status == 200) {
      let data = JSON.parse(this.responseText);
      for (let obj in data) {
        let organizator = data[obj];
        createCard(organizator);
      }
      parent.lastElementChild.id = "c3";
    } else {
      console.log("Error");
    }
  }
};
xhttp.open("GET", firebasedatabase + "/organizatoriFestivala.json");
xhttp.send();

function createCard(organizator) {
  let card = document.createElement("div");
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
        <a href="./organizers/organizer.html?festivals=${organizator["festivali"]}" class="rm">Pročitajte više...</a></p>
      </div>
    </div>
  `;
  parent.appendChild(card);
}
