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

