const firebaseDatabase =
  "https://wd-sv-15-2023-default-rtdb.europe-west1.firebasedatabase.app";

let tableKor = document.getElementById("tableKor");
let tableOrg = document.getElementById("tableOrg");
let tableFest = document.getElementById("tableFest");
let btnOrg = document.querySelector(".btn-org");
let btnKor = document.querySelector(".btn-k");

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
            console.log(data[obj]["festivali"]);
            fetchFestivals3(data[obj]["festivali"]);
          }
        }
      } else {
        console.log("Error fetching festivals:", this.status);
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
        createFest(data);
      } else {
        console.log("Error fetching festivals:", this.status);
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
        <td>${value["godinaOsnivanja"]}</td>
        <td><button class="btn-fest" id="${obj}" data-festivalsID="${value["festivali"]}">${count} festivala</button></td>
        <td>
          <button class="btn btn-success btnIzmeniOrg" style="display: inline-block" >Izmeni</button>
          <button class="btn btn-danger btnObrisiOrg" style="display: inline-block">Obriši</button>
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

function createFest(festivals) {
  console.log(festivals);
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
        <button class="btn btn-success btnIzmeniK" id="izmena-kor" style="display: inline-block" >Izmeni</button>
        <button class="btn btn-danger btnObrisiK" style="display: inline-block">Obriši</button>
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
});

btnKor.addEventListener("click", (event) => {
  tableKor.classList.add("active");
  tableFest.classList.remove("active");
  tableOrg.classList.remove("active");
  btnKor.classList.add("active");
  btnOrg.classList.remove("active");
});
