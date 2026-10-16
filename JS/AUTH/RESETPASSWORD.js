import { X_API_KEY, BASE_URL } from "../API.js";

const pswrdForm = document.getElementById("resetPswrdForm");
const pswrdEmailInput = document.getElementById("resetPswrdEmailInp");

pswrdForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = pswrdEmailInput.value.trim().toLowerCase();

  try {
    const responce = await fetch(
      `${BASE_URL}/api/auth/forget-password/${email}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": X_API_KEY,
        },
      },
    );

    if (!responce.ok) {
      throw new Error("error");
    }

    console.log("email sent");
  } catch (error) {
    console.log("login error:", error);
  }
});

const params = new URLSearchParams(window.location.search);
const token = params.get("token");
console.log(token);

