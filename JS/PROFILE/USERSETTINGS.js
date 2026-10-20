import { X_API_KEY, BASE_URL } from "../API.js";
const accessTokenVar = localStorage.getItem("accessToken");

//---password reset
const resetPswordForm = document.getElementById("resetPsword");

const currentPswordInp = document.getElementById("currentPsword");
const newPswordInp = document.getElementById("newPsword");
const confirmNewPswordInp = document.getElementById("confirmNewPsword");

//check if fields are filled correctly
currentPswordInp.addEventListener("keyup", () => {
  if (currentPswordInp.value.length < 6 && currentPswordInp.value.length >= 1) {
    console.log("less than 6 characyers");
  } else if (currentPswordInp.value.length < 1) {
    console.log("current password required");
  }
});

newPswordInp.addEventListener("keyup", () => {
  if (newPswordInp.value.length < 6 && newPswordInp.value.length >= 1) {
    console.log("less than 6 characyers");
  } else if (newPswordInp.value.length < 1) {
    console.log("new password required");
  }
});

confirmNewPswordInp.addEventListener("keyup", () => {
  if (
    confirmNewPswordInp.value.length < 6 &&
    confirmNewPswordInp.value.length >= 1
  ) {
    console.log("less than 6 characyers");
  } else if (confirmNewPswordInp.value.length < 1) {
    console.log("confirm new passowrd");
  }
});

//actually send info
resetPswordForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const currentPsword = currentPswordInp.value.trim();
  const newPsword = newPswordInp.value.trim();
  const confirmNewPsword = confirmNewPswordInp.value.trim();

  //check if current password is the same
  if (newPsword !== confirmNewPsword) {
    console.error("password not the same");
  } else {
    let userPswrdChange = {};

    userPswrdChange.currentPassword = currentPsword;
    userPswrdChange.newPassword = newPsword;

    try {
      const responce = await fetch(`${BASE_URL}/api/users/change-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": X_API_KEY,
          Authorization: `Bearer ${accessTokenVar}`,
        },
        body: JSON.stringify(userPswrdChange),
      });

      if (!responce.ok) {
        throw new Error("error");
      }

      console.log("psword change sucessful");
    } catch (error) {
      console.error("psword reset error:", error);
      alert("pls fill in all fields correctly");
    }
  }
});

//================================

//---delete account

const deleteUserBtn = document.getElementById("deleteUser");

deleteUserBtn.addEventListener("click", async () => {
  const confirmDelete = confirm("are you sure bro");

  if (confirmDelete == true) {
    try {
      const responce = await fetch(`${BASE_URL}/api/users/delete-profile`, {
        method: "DELETE",
        header: {
          "X-Api-Key": X_API_KEY,
          Authorization: `Bearer ${accessTokenVar}`,
        },
      });

      if (!responce.ok) {
        throw new Error("error");
      }

      const data = await responce.json();

      console.log("sucessfully deleted", data);
    } catch (error) {
      console.log("some king of error", error);
    }
    // deleteUser();
  }
});

// async function deleteUser() {
//      try {
//       const responce = await fetch(`${BASE_URL}/api/users/delete-profile`, {
//         method: "DELETE",
//         header: {
//           "Content-Type": "application/json",
//           "X-Api-Key": X_API_KEY,
//           Authorization: `Bearer ${accessTokenVar}`,
//         },
//       });

//       if (!responce.ok) {
//         throw new Error("error");
//       }

//       const data = await responce.json();

//       console.log("sucessfully deleted", data);
//     } catch (error) {
//       console.log("some king of error", error);
//     }
// }
