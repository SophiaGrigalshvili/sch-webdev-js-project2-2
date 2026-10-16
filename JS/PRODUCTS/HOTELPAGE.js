import { X_API_KEY, BASE_URL } from "../API.js";

const params = new URLSearchParams(window.location.search);
const paramid = params.get("id");

console.log(paramid);

fetch(`${BASE_URL}/api/hotels/${paramid}`)
  .then((res) => {
    if (!res.ok) {
      throw new Error((error) => console.log(error));
    }
    return res.json();
  })
  .then((data) => {
    const hotel = data.data;

    console.log(hotel);

    appendHotInfo(hotel);
  });

function appendHotInfo(data) {
  const photoThumbnail = document.getElementById("thumbnail");
  //----photo sect
  const photo1 = document.getElementById("photo1");
  const photo2 = document.getElementById("photo2");
  const photo3 = document.getElementById("photo3");

  photoThumbnail.src = data.thumbnail;
  photo1.src = data.gallery[0];
  photo2.src = data.gallery[1];
  photo3.src = data.gallery[2];

  photo1.addEventListener("click", () => {
    displayPhoto(data.gallery[0]);
  });

  photo2.addEventListener("click", () => {
    displayPhoto(data.gallery[1]);
  });

  photo3.addEventListener("click", () => {
    displayPhoto(data.gallery[2]);
  });

  //----info sect

  //-aside
  const contactNum = document.getElementById("contactNum");
  const contactRes = document.getElementById("contactRes");
  contactNum.textContent = "📞 " + data.phoneNumber;
  contactRes.textContent = "✉️ " + data.email;

  //-main info div
  //hotel star info
  const hotStar = document.getElementById("hotStar");
  hotStar.textContent = data.starRating;

  //title
  const hotTitle = document.getElementById("hotTitle");
  const hotAddress = document.getElementById("hotAddress");
  hotTitle.textContent = data.name;
  hotAddress.textContent = `${data.address.city}, ${data.address.country}, ${data.address.state}, ${data.address.street}, ${data.address.zipCode}`;

  //info review
  const infoReviewRev = document.getElementById("infoReviewRev");
  const infoReviewRooms = document.getElementById("infoReviewRooms");
  infoReviewRev.textContent = `${data.averageRating.toFixed(1)} (${data.reviewCount} reviews)`;
  infoReviewRooms.textContent = `${data.roomCount} rooms`;

  //description
  const hotDesc = document.getElementById("hotDesc");
  hotDesc.textContent = data.description;
}

function displayPhoto(id) {
  const body = document.querySelector("body");

  const background = document.createElement("div");
  background.setAttribute("class", "lightBox");
  background.setAttribute("id", "lightBox");

  const delBtn = document.createElement("button");
  delBtn.textContent = "X";

  const imageDisplay = document.createElement("img");
  imageDisplay.src = id;

  body.appendChild(background);

  background.appendChild(delBtn);
  background.appendChild(imageDisplay);

  delBtn.addEventListener("click", () => {
    const lightBox = document.getElementById("lightBox");
    lightBox.remove();
  });
}
