const firebaseDatabase =
  "https://wd-sv-15-2023-default-rtdb.europe-west1.firebasedatabase.app";

let parent = document.getElementById("content");

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
/*
const xhttp2 = new XMLHttpRequest();

xhttp2.onreadystatechange = function () {
  if (this.readyState == 4) {
    if (this.status == 200) {
      let data = JSON.parse(this.responseText);
      createFest(data);
    } else {
      console.log("Error:", this.status);
    }
  }
};

xhttp2.open("GET", firebaseDatabase + "/korisnici.json");
xhttp2.send();*/

function createOrg(data) {
  let innerHTML = `<table class="table caption-top">
  <caption style="color: #3d3028 !important;
  text-shadow:none !important;
  font-size: 1.3em;
  text-align: center;">Prikaz organizatora</caption>
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
        <button class="btn btn-success" style="display: inline-block">Izmeni</button>
        <button class="btn btn-danger" style="display: inline-block">Obriši</button>
    </td>
    </tr>
    `;
  }
  innerHTML += `
    </tbody>
    </table>`;
  console.log(innerHTML);
  parent.innerHTML = innerHTML;
}
