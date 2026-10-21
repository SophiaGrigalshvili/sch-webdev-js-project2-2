import { X_API_KEY, BASE_URL } from "../API.js";

const params = new URLSearchParams(window.location.search);
const paramid = params.get("id");

fetch(`${BASE_URL}/api/hotels/${paramid}`)
  .then((res) => {
    if (!res.ok) {
      throw new Error((error) => console.log(error));
    }
    return res.json();
  })
  .then((data) => {
    const hotel = data.data;

    appendHotInfo(hotel);
    // getRooms();
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

fetch(`${BASE_URL}/api/rooms/${paramid}`)
  .then((res) => {
    if (!res.ok) {
      throw new Error((error) => console.log(error));
    }
    return res.json();
  })
  .then((data) => {
    const rooms = data.data.items;
    displayRooms(rooms);
  });

function displayRooms(data) {
  const roomsSect = document.getElementById("roomsSect");

  data.forEach((el) => {
    roomsSect.innerHTML += `
     <a href="/HTML/rooms.html?id=${el.id}">
        <div class="roomCard ${el.id}" id="${el.id}">
          <div class="isAvailableDiv" id="isAvailableDiv ${el.id}">
            <p id="availibility ${el.id}"> </p>
          </div>
          
        <div class="imgDiv">
            <img src="${el.thumbnail}" alt="${el.roomType}" />
        </div>
        <div class="TextContent">
            <div class="titleDiv">
                <h3>${el.roomType}</h3>
                <p>#${el.roomNumber}</p>
            </div>

            <div class="infoDiv">
                <p>👤 ${el.capacity}</p>
                <p>🛏 ${el.bedCount}</p>
                <span>
                    <i class="fa fa-solid fa-star"></i>
                    <p>${el.averageRating}</p>
                </span>
            </div>

            <h4>$${el.pricePerNight}<span> / night</span></h4>

            <button id="BookingBtn">Book Now</button>
            </div>
        </div>
     </a>
    `;

    //MAKE BUTTON GO TO BOOKING PAGE!!!!!!!!!!!!!!!!!!!!!

    let roomId = document.getElementById(el.id);
    let id = el.id;

    if (roomId.classList.contains(`${id}`)) {
      let availibility = document.getElementById(`availibility ${id}`);
      let isAvailableDiv = document.getElementById(`isAvailableDiv ${id}`);
      if (el.isAvailable == true) {
        availibility.textContent = "Available";
        isAvailableDiv.style.backgroundColor = "#10B981";
      } else {
        availibility.textContent = "Not Available";
        isAvailableDiv.style.backgroundColor = "#ec3939";
      }
    }
  });
}
