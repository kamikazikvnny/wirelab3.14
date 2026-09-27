/* =========================================================
WIRELAB ACCOUNTS
PROFILE + ICON FUNCTIONALITY
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


/* =====================================================
   PROFILE ELEMENTS
===================================================== */

const profileName =
    document.querySelector(".profile-name");


const profileAvatar =
    document.getElementById("profile-avatar");


const editProfileButton =
    document.querySelector(".account-button");


/* =====================================================
   LOAD SAVED PROFILE NAME
===================================================== */

const savedName =
    localStorage.getItem(
        "wirelabProfileName"
    );


if (
    savedName &&
    profileName
) {

    profileName.textContent =
        savedName;

}


/* =====================================================
   LOAD SAVED PROFILE ICON
===================================================== */

const savedIcon =
    localStorage.getItem(
        "wirelabProfileIcon"
    );


if (
    savedIcon &&
    profileAvatar
) {

    profileAvatar.dataset.icon =
        savedIcon;

    profileAvatar.innerHTML =
        `<img src="${savedIcon}" alt="Profile avatar">`;

}



/* LOAD PROFILE ICON INTO NAVBAR */

const navbarProfile =
    document.getElementById("navbar-profile");

if (
    savedIcon &&
    navbarProfile
) {
    navbarProfile.innerHTML =
        `<img src="${savedIcon}" alt="Profile">`;
}








/* =====================================================
   LOAD STUDY PROGRESS
===================================================== */

const completedUnits =
    JSON.parse(
        localStorage.getItem(
            "wirelab-study-completed"
        )
    ) || [];


const totalUnits = 35;

const studyProgress =
    document.getElementById(
        "study-progress"
    );

const studyProgressBar =
    document.getElementById(
        "study-progress-bar"
    );


if (
    studyProgress &&
    studyProgressBar
) {

    const completedCount =
        completedUnits.length;

    const percentage =
        (completedCount / totalUnits) * 100;


    studyProgress.textContent =
        `${completedCount} / ${totalUnits}`;


    studyProgressBar.style.width =
        `${percentage}%`;

}









/* =====================================================
   EDIT PROFILE MODAL
===================================================== */

const profileModal =
    document.getElementById("profile-modal");

const profileModalClose =
    document.getElementById("profile-modal-close");

const profileCancel =
    document.getElementById("profile-cancel");

const profileSave =
    document.getElementById("profile-save");

const profileNameInput =
    document.getElementById("profile-name-input");

const profilePreviewName =
    document.getElementById("profile-preview-name");

const profilePreviewAvatar =
    document.getElementById("profile-preview-avatar");

const profileIconOptions =
    document.querySelectorAll(".profile-icon-option");


let temporaryIcon =
    profileAvatar.dataset.icon ||
    profileAvatar.textContent.trim();


/* =====================================================
   OPEN PROFILE MODAL
===================================================== */

function openProfileModal() {

    const currentName =
        profileName.textContent.trim();

    temporaryIcon =
        profileAvatar.dataset.icon ||
        profileAvatar.textContent.trim();


    profileNameInput.value =
        currentName;


    profilePreviewName.textContent =
        currentName;


    profilePreviewAvatar.innerHTML =
        `<img src="${temporaryIcon}" alt="Profile avatar">`;


    profileIconOptions.forEach(function (button) {

    button.classList.toggle(
        "selected",
        button.dataset.icon === temporaryIcon
    );

});


    profileModal.classList.add("active");

    profileNameInput.focus();

}


/* =====================================================
   CLOSE PROFILE MODAL
===================================================== */

function closeProfileModal() {

    profileModal.classList.remove("active");

}


/* =====================================================
   EDIT PROFILE BUTTON
===================================================== */

editProfileButton.addEventListener(
    "click",
    openProfileModal
);


/* =====================================================
   LIVE NAME PREVIEW
===================================================== */

profileNameInput.addEventListener(
    "input",
    function () {

        const newName =
            profileNameInput.value.trim();


        profilePreviewName.textContent =
            newName || "WireLab Student";

    }
);


/* =====================================================
   PROFILE ICONS
===================================================== */

profileIconOptions.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            temporaryIcon =
                button.dataset.icon;


profilePreviewAvatar.innerHTML =
    `<img src="${temporaryIcon}" alt="Profile avatar">`;


            profileIconOptions.forEach(
                function (iconButton) {

                    iconButton.classList.remove(
                        "selected"
                    );

                }
            );


            button.classList.add("selected");

        }
    );

});


/* =====================================================
   SAVE PROFILE
===================================================== */

profileSave.addEventListener(
    "click",
    function () {

        const newName =
            profileNameInput.value.trim();


        if (newName === "") {

            alert(
                "Please enter a name."
            );

            profileNameInput.focus();

            return;

        }


        profileName.textContent =
            newName;


        profileAvatar.dataset.icon =
            temporaryIcon;

        profileAvatar.innerHTML =
            `<img src="${temporaryIcon}" alt="Profile avatar">`;


        localStorage.setItem(
            "wirelabProfileName",
            newName
        );


        localStorage.setItem(
            "wirelabProfileIcon",
            temporaryIcon
        );


        closeProfileModal();

    }
);


/* =====================================================
   CANCEL / CLOSE
===================================================== */

profileCancel.addEventListener(
    "click",
    closeProfileModal
);


profileModalClose.addEventListener(
    "click",
    closeProfileModal
);


/* =====================================================
   CLICK OUTSIDE MODAL
===================================================== */

profileModal.addEventListener(
    "click",
    function (event) {

        if (event.target === profileModal) {

            closeProfileModal();

        }

    }
);


/* =====================================================
   ESCAPE KEY
===================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            profileModal.classList.contains("active")
        ) {

            closeProfileModal();

        }

    }
);

});
