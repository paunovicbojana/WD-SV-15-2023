const firebaseDatabase =
  "https://wd-sv-15-2023-default-rtdb.europe-west1.firebasedatabase.app";

let tableKor = document.getElementById("tableKor");
let tableOrg = document.getElementById("tableOrg");

const xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function () {
  if (this.readyState == 4) {
    if (this.status == 200) {
      let data = JSON.parse(this.responseText);
      createOrg(data);
    } else {
      console.log("Error:", this.status);
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
    }
  }
};

xhttp2.open("GET", firebaseDatabase + "/korisnici.json");
xhttp2.send();

function createOrg(data) {
  let innerHTML = `
  
  <thead>
    <tr>
      <th scope="col">Logo</th>
      <th scope="col">Naziv</th>
      <th scope="col">Adresa</th>
      <th scope="col">Kontakt telefon</th>
      <th scope="col">Godina osnivanja</th>
      <th scope="col">Radnje</th>
    </tr>
  </thead>
  <tbody>`;
  for (let obj in data) {
    let value = data[obj];
    innerHTML += `
    <tr>
      <th scope="row"><div class="abc" style="height:50px;width:50px;"><img src="${value["logo"]}" style="height:100%; width:100%; overflow: hidden; object:cover;border-radius:50%"></div></th>
      <td>${value["naziv"]}</td>
      <td>${value["adresa"]}</td>
      <td>${value["kontaktTelefon"]}</td>
      <td>${value["godinaOsnivanja"]}</td>
      <td>
        <button class="btn btn-success btnIzmeniOrg" style="display: inline-block" onclick="scrollToTopUser(), toggleOverlayUser()">Izmeni</button>
        <button class="btn btn-danger btnObrisiOrg" style="display: inline-block">Obriši</button>
    </td>
    </tr>
    `;
  }
  innerHTML += `
    </tbody>
    `;
  tableOrg.innerHTML = innerHTML;
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
        <button class="btn btn-success btnIzmeniK" id="izmena-kor" style="display: inline-block" onclick="scrollToTopUser(), toggleOverlayUser()">Izmeni</button>
        <button class="btn btn-danger btnObrisiK" style="display: inline-block">Obriši</button>
    </td>
    </tr>
    `;
  }
  innerHTML += `
    </tbody>
    `;
  tableKor.innerHTML = innerHTML;
}

function switchTables() {
  let btnOrg = document.querySelector(".btn-org");
  let btnKor = document.querySelector(".btn-k");
  let tableOrg = document.querySelector(".tableOrg");
  let tableKor = document.querySelector(".tableKor");

  btnOrg.addEventListener("click", () => {
    tableKor.classList.remove("active");
    tableOrg.classList.add("active");
    btnOrg.classList.add("active");
    btnKor.classList.remove("active");
  });

  btnKor.addEventListener("click", () => {
    tableOrg.classList.remove("active");
    tableKor.classList.add("active");
    btnKor.classList.add("active");
    btnOrg.classList.remove("active");
  });
}
