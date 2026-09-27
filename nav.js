/* =========================================================
   WIRELAB NAVBAR
   LOAD SAVED PROFILE ICON
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const navbarProfile =
        document.getElementById("navbar-profile");

    const savedIcon =
        localStorage.getItem("wirelabProfileIcon");

    if (
        savedIcon &&
        navbarProfile
    ) {

        let iconPath = savedIcon;

        /*
           Convert the Accounts path into a
           path that works from any WireLab page.
        */

        if (savedIcon.startsWith("../z-images/")) {

            iconPath =
                savedIcon.replace(
                    "../z-images/",
                    "/z-images/"
                );

        }

        navbarProfile.innerHTML =
            `<img src="${iconPath}" alt="Profile">`;

    }

});
