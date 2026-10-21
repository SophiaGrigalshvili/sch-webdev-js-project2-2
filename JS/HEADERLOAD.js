import { X_API_KEY, BASE_URL } from "./API.js";

const accessTokenVar = localStorage.getItem("accessToken");

const loggedOutNav = document.getElementById("loggedOut");
const loggedIn = document.getElementById("loggedIn");

if (localStorage.getItem("accessToken")) {
  getUser();

  //change nav
  loggedOutNav.style.display = "none";

  loggedIn.style.display = "flex";

  //resp nav display functionality
  const burgerBtnLoggedIn = document.getElementById("burgerMenuLoggedIn");
  const navMenuLoggedIn = document.getElementById("respNavMenuLoggedIn");

  burgerBtnLoggedIn.addEventListener("click", () => {
    navMenuLoggedIn.classList.toggle("navInactive");
  });

  //logout
  const logoutBtn = document.getElementById("logoutBtn");

  logoutBtn.addEventListener("click", () => {
    localStorage.clear();

    window.location.reload();
  });
} else {
  const burgerBtn = document.getElementById("burgerMenu");
  const navMenu = document.getElementById("respNavMenu");

  burgerBtn.addEventListener("click", () => {
    navMenu.classList.toggle("navInactive");
  });
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
      throw new Error("error in response");
    }
    const data = await respose.json();
    const userData = data.data;

    //user pfp
    const userPfp = document.getElementById("userPfp");
    const userPfpCont = document.getElementById("userPfpCont");

    if (userData.details.pictureUrl == null) {
      console.log("no pfp");

      userPfp.textContent =
        userData.firstName.charAt(0) + userData.lastName.charAt(0);
    } else {
      userPfp.style.display = "none";

      const pfpPic = document.createElement("img");
      userPfpCont.appendChild(pfpPic);
      pfpPic.src = userData.details.pictureUrl;
    }
  } catch (error) {
    console.error(error);
  }
}
