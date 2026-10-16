import { X_API_KEY, BASE_URL } from "../API.js";

const signInForm = document.getElementById("signInForm");
const signInEmailVal = document.getElementById("signInEmailVal");
const signInPasswordVal = document.getElementById("signInPasswordVal");

const rememberMe = document.getElementById("signInRememberMe");

signInForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const signInEmail = signInEmailVal.value.trim().toLowerCase();
  const signInPassword = signInPasswordVal.value.trim();
  const user = {
    email: signInEmail,
    password: signInPassword,
  };

  try {
    const responce = await fetch(`${BASE_URL}/api/auth/login`, {
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

    console.log("login sucessful");

    const data = await responce.json();

    localStorage.setItem("accessToken", data.data.accessToken);
    localStorage.setItem("refreshToken", data.data.refreshToken);

    console.log(data);

    const accessTokenVar = localStorage.getItem("accessToken");
    const refreshTokenVar = localStorage.getItem("refreshToken");

    console.log(accessTokenVar);
    console.log(refreshTokenVar);

    if (accessTokenVar == "Verification" && refreshTokenVar == "Verification") {
      window.location.href = "/HTML/auth/verification.html";
    } else if (
      accessTokenVar == "undefined" &&
      refreshTokenVar == "undefined"
    ) {
      window.location.href = "/HTML/auth/verification.html";
    } else {
      window.location.href = "/HTML/index.html";
    }
  } catch (error) {
    console.log("login error:", error);
  }
});
