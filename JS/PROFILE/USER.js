import { X_API_KEY, BASE_URL } from "../API.js";

const accessTokenVar = localStorage.getItem("accessToken");

//user info change

const profilePic = document.getElementById("profilePic");
const formProfilePic = document.getElementById("formProfilePic");

const userName = document.getElementById("userNameProf");
const userEmail = document.getElementById("emailProf");

const profilePage = document.getElementById("myProfile");

const logOutBtn = document.getElementById("logOutBtn");

const userForm = document.getElementById("userForm");
const userPfpLink = document.getElementById("userPfpLink");

const userFirstName = document.getElementById("userFirstName");
const userLasttName = document.getElementById("userLasttName");

const userEmailFormValue = document.getElementById("userEmail");

const userBirthDate = document.getElementById("userBirthDate");
const userPhoneNum = document.getElementById("userPhoneNum");

const userAddress = document.getElementById("userAddress");

const DiscardBtn = document.getElementById("DiscardBtn");

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
      throw new Error("error in response");
    }
    const data = await respose.json();
    const userData = data.data;

    console.log(userData);

    //display user data
    userName.textContent = userData.firstName + " " + userData.lastName;
    userEmail.textContent = userData.email;

    userFirstName.value = userData.firstName;
    userLasttName.value = userData.lastName;

    userEmailFormValue.value = userData.email;

    //submit info
    userForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const newUserFirstName = userFirstName.value.trim().toLowerCase();
      const newUserLastName = userLasttName.value.trim().toLowerCase();

      let newUserData = {
        firstName: newUserFirstName,
        lastName: newUserLastName,
        email: userData.email,
      };

      if (userPhoneNum.value) {
        const userPhoneNumVal = userPhoneNum.value.replaceAll(" ", "");
        newUserData.phoneNumber = userPhoneNumVal;
      } else if (!userPhoneNum.value) {
        const userPhoneNumVal = null;
        newUserData.phoneNumber = userPhoneNumVal;
      }

      if (userAddress.value !== "") {
        const userAddressVal = userAddress.value.trim();
        newUserData.address = userAddressVal;
      } else if (userAddress.value == "") {
        const userAddressVal = null;
        newUserData.address = userAddressVal;
      }

      if (userPfpLink.value !== "") {
        const userPfpLinkVal = userPfpLink.value;
        newUserData.pictureUrl = userPfpLinkVal;
      } else if (userPfpLink.value == "") {
        const userPfpLinkVal = null;
        newUserData.pictureUrl = userPfpLinkVal;
      }

      if (userBirthDate.value !== "") {
        const userBirthDateVal = userBirthDate.value;
        newUserData.dateOfBirth = userBirthDateVal;
      } else if (userBirthDate.value == "") {
        const userBirthDateVal = null;
        newUserData.dateOfBirth = userBirthDateVal;
      }

      console.log(newUserData);

      try {
        const editResponce = await fetch(`${BASE_URL}/api/users`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": X_API_KEY,
            Authorization: `Bearer ${accessTokenVar}`,
          },
          body: JSON.stringify(newUserData),
        });

        if (!editResponce.ok) {
          throw new Error("error");
        }
        console.log("user info change sucessful");
      } catch (error) {
        console.log("user info edit error:", error);
      }
      console.log(userData);

      window.location.reload();
    });

    //change inputs depending on if there is info
    userPfpLink.value = userData.details.pictureUrl;
    userBirthDate.value = userData.details.dob;
    userPhoneNum.value = userData.details.phoneNumber;
    userAddress.value = userData.details.address;

    if (userData.details.pictureUrl) {
      const pfpPic = document.createElement("img");
      profilePic.appendChild(pfpPic);
      pfpPic.src = userData.details.pictureUrl;

      const formPfpPic = document.createElement("img");
      formProfilePic.appendChild(formPfpPic);
      formPfpPic.src = userData.details.pictureUrl;
    }

    //discard button functionality
    DiscardBtn.disabled = true;

    const inputField = document.querySelectorAll("input");

    inputField.forEach((el) => {
      el.addEventListener("keyup", () => {
        DiscardBtn.disabled = false;
      });
    });

    DiscardBtn.addEventListener("click", () => {
      userFirstName.value = userData.firstName;
      userLasttName.value = userData.lastName;

      userEmailFormValue.value = userData.email;
      userPfpLink.value = userData.details.pictureUrl;
      userBirthDate.value = userData.details.dob;
      userPhoneNum.value = userData.details.phoneNumber;
      userAddress.value = userData.details.address;
    });
  } catch (error) {
    console.error(error);
  }
}

getUser();
