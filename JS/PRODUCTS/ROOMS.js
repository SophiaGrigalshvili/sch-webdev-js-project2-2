import { X_API_KEY, BASE_URL } from "../API.js";

const params = new URLSearchParams(window.location.search);
const paramid = params.get("id");

fetch(`${BASE_URL}/api/rooms/details/${paramid}`)
  .then((res) => {
    if (!res.ok) {
      throw new Error((error) => console.log(error));
    }
    return res.json();
  })
  .then((data) => {
    const roomData = data.data;
    console.log("room data:", roomData);

    appendRoomInfo(roomData);
  });

function appendRoomInfo(data) {
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

  //back to hotel name
  const backToHotelBtn = document.getElementById("backToHotelBtn");
  backToHotelBtn.textContent = `← ${data.hotel.name}`;

  //-aside
  const roomPrice = document.getElementById("roomPrice");
  roomPrice.textContent = "$" + data.pricePerNight;

  changeBtns(paramid);

  //-actual info
  //titles sect
  const roomName = document.getElementById("roomName");
  const roomNumber = document.getElementById("roomNumber");

  roomName.textContent = data.roomType;
  roomNumber.textContent = data.roomNumber;

  const isAvailableDiv = document.getElementById("isAvailableDiv");
  const isAvailableTxt = document.getElementById("isAvailableTxt");

  if (data.isAvailable == true) {
    isAvailableDiv.style.backgroundColor = "#daf6e5";
    isAvailableTxt.style.color = "#10B99E";
    isAvailableTxt.textContent = "Available";
  } else {
    isAvailableDiv.style.backgroundColor = "#ef444418";
    isAvailableTxt.style.color = "#ef4444";
    isAvailableTxt.textContent = "Not available";
  }

  //room gen info
  const roomCapacity = document.getElementById("roomCapacity");
  const roomBeds = document.getElementById("roomBeds");
  const roomRating = document.getElementById("roomRating");

  roomCapacity.textContent = data.capacity + " guests";
  roomBeds.textContent = data.bedCount;
  roomRating.textContent = data.averageRating.toFixed(1);

  //specifications
  const specDivsContainer = document.getElementById("specDivsContainer");

  const specification = data.specifications;

  for (const spec in specification) {
    specDivsContainer.innerHTML += `
          <div class="specification">
              <p>${spec}:</p>
              <h4>${specification[spec]}</h4>
          </div>
      `;
  }

  //reviews sect
  const reviewsContainer = document.getElementById("reviewsContainer");
  const reviewsContainerMobileVer = document.getElementById(
    "reviewsContainerMobileVer",
  );

  makeReviewCards(reviewsContainer);
  makeReviewCards(reviewsContainerMobileVer);
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

const accessTokenVar = localStorage.getItem("accessToken");

function changeBtns(roomNum) {
  const bookBtn = document.getElementById("bookBtn");
  const reviewBtn = document.getElementById("reviewBtn");
  const reviewBtnMob = document.getElementById("reviewBtnMob");

  if (localStorage.getItem("accessToken")) {
    getUser();

    bookBtn.textContent = "Book this room";
    reviewBtn.textContent = "Write a Review";
    reviewBtnMob.textContent = "Write a Review";

    bookBtn.addEventListener("click", () => {
      window.location.href = `/HTML/booking.html?id=${roomNum}`;
    });

    reviewBtn.addEventListener("click", () => {
      //WRITE STAR RATING!!!
    });

    reviewBtnMob.addEventListener("click", () => {
      //WRITE STAR RATING!!!
    });
  } else {
    bookBtn.textContent = "Log In To Book";
    reviewBtn.textContent = "Log In Review";
    reviewBtnMob.textContent = "Log In Review";

    bookBtn.addEventListener("click", () => {
      window.location.href = "/HTML/auth/signin.html";
    });

    reviewBtn.addEventListener("click", () => {
      window.location.href = "/HTML/auth/signin.html";
    });

    reviewBtnMob.addEventListener("click", () => {
      window.location.href = "/HTML/auth/signin.html";
    });
  }
}

async function getUser() {
  try {
    const respose = await fetch(`${BASE_URL}/api/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": X_API_KEY,
        Authorization: `Bearer ${accessTokenVar}`,
      },
    });

    if (!respose.ok) {
      localStorage.clear();
      window.location.reload();

      throw new Error("error in response");
    }
    const data = await respose.json();
    const userData = data.data;

    console.log("user is logged in");
  } catch (error) {
    console.error(error);
  }
}

async function makeReviewCards(container) {
  const response = await fetch(`${BASE_URL}/api/reviews/room/${paramid}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": X_API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error("error in response");
  }

  const data = await response.json();
  const reviews = data.data.items;

  const numOfRatings = document.getElementById("reviewsAmount");
  numOfRatings.textContent = reviews.length;

  reviews.forEach((el) => {
    container.innerHTML += `
        <div class="review">
            <div class="reviewer">
              <p class="userPic">${el.user.firstName.charAt(0) + el.user.lastName.charAt(0)}</p>
              <div class="userInfo">
                <p class="userName">${el.user.firstName} ${el.user.lastName}</p>
                <p class="date">${el.createdAt}</p>
              </div>
            </div>
            <div class="revRating">
              <i class="fa fa-solid fa-star"></i>
              <p class="rating">${el.rating.toFixed(1)}</p>
            </div>
          </div>
    `;
  });
}
