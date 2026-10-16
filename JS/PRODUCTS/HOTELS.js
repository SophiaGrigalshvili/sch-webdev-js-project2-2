import { X_API_KEY, BASE_URL } from "../API.js";

const container = document.getElementById("hotelContainer");

fetch(`${BASE_URL}/api/hotels`)
  .then((res) => {
    if (!res.ok) {
      throw new Error((error) => console.log(error));
    }
    return res.json();
  })
  .then((data) => {
    const hotels = data.data.items;
    console.log(hotels);

    makeCard(hotels);
  });

function makeCard(data) {
  data.forEach((el) => {
    let userStarRating = el.averageRating;
    container.innerHTML += `
       <a href="/HTML/hotels.html?id=${el.id}">
        <div class="card">
         <div class="hotStars">
            <p>${el.starRating}</p>
            <i class="fa fa-solid fa-star"></i>
          </div>
            <div class="imgDiv">
              <img src="${el.thumbnail}" alt="${el.name}" class="image">
            </div>
            <h3>${el.name}</h3>
            <div class="rev">
              <div class"review">
              ${el.averageRating} <i class="fa fa-solid fa-star"></i>  (${el.reviewCount})
              </div>
              <p>${el.roomCount} rooms</p>
          </div>
        </div>
      </a>`;
  });
}

const filtersBtn = document.getElementById("filtersBtn");
const filtersMenu = document.getElementById("filtersMenu");

filtersBtn.addEventListener("click", () => {
  if (filtersBtn.className === "filersBtn") {
    filtersBtn.className = "filersBtnActive";
  } else {
    filtersBtn.className = "filersBtn";
  }
});

fetch(`${BASE_URL}/api/hotels/filter`)
  .then((res) => {
    if (!res.ok) {
      throw new Error((error) => console.log(error));
    }
    return res.json();
  })
  .then((data) => {
    console.log(data);
  });
