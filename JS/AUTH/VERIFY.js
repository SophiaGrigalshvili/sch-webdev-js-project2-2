import { X_API_KEY, BASE_URL } from "../API.js";

const verifEmail = document.getElementById("verifEmail");
const verifForm = document.getElementById("verifForm");
const verifCode = document.getElementById("verifCode");

verifForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const verification = {
    email: verifEmail.value.trim().toLowerCase(),
    code: verifCode.value.trim(),
  };

  try {
    const responce = await fetch(`${BASE_URL}/api/auth/verify-email`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": X_API_KEY,
      },
      body: JSON.stringify(verification),
    });

    if (!responce.ok) {
      throw new Error("error");
    }

    console.log(verification);

    localStorage.setItem("accessToken", data.data.accessToken);
    localStorage.setItem("refreshToken", data.data.refreshToken);

    window.location.href = "/HTML/index.html";
  } catch (error) {
    console.log("verification error", error);
  }
});

const resendBtn = document.getElementById("resend");

resendBtn.addEventListener("click", async (event) => {
  event.preventDefault();

  try {
    const responce = await fetch(
      `${BASE_URL}/api/auth/resend-email-verification/${verifEmail.value.trim().toLowerCase()}`,
      {
        method: "POST",
        headers: {
          "X-Api-Key": X_API_KEY,
        },
      },
    );

    if (!responce.ok) {
      throw new Error("error");

      //write the error popup here
    }

    const data = await responce.json();
    console.log(data);
  } catch {
    console.log(error);
  }
});
