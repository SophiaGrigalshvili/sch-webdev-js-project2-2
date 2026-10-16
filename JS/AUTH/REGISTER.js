import { X_API_KEY, BASE_URL } from "../API.js";

const regForm = document.getElementById("regForm");
const regFistNameInp = document.getElementById("regFistNameInp");
const regLastNameInp = document.getElementById("regLastNameInp");
const regEmailInp = document.getElementById("regEmailInp");
const regPasswordInp = document.getElementById("regPasswordInp");

regForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const user = {
    firstName: regFistNameInp.value.trim().toLowerCase(),
    lastName: regLastNameInp.value.trim().toLowerCase(),
    email: regEmailInp.value.trim().toLowerCase(),
    password: regPasswordInp.value.trim(),
  };

  try {
    const responce = await fetch(`${BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": X_API_KEY,
      },
      body: JSON.stringify(user),
    });

    if (!responce.ok) {
      throw new Error("error");
    }

    const data = await responce.json();
    console.log(data);

    localStorage.setItem("accessToken", data.data.accessToken);
    localStorage.setItem("refreshToken", data.data.refreshToken);

    const accessTokenVar = localStorage.getItem("accessToken");
    const refreshTokenVar = localStorage.getItem("refreshToken");

    console.log(accessTokenVar);
    console.log(refreshTokenVar);

    if (accessTokenVar == "Verification" && refreshTokenVar == "Verification") {
      window.location.href = "/HTML/auth/verification.html";
    } else {
      window.location.href = "/HTML/index.html";
    }
  } catch (error) {
    console.log("registration error", error);
  }
});
