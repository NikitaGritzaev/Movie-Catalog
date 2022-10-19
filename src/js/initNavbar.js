import navbar from "/src/views/navbar.js";
import navbarGuest from "/src/views/navbarGuest.js";
import {authUser, logoutUser} from "/src/js/auth.js";

async function setNavbar() {
    let header = $("header");
    header.empty();
    let auth = await authUser();
    if (auth.auth)  {
        let fakeDiv = document.createElement("div");
        fakeDiv.innerHTML = navbar().trim();
        let nav = fakeDiv.firstChild;
        $(nav).find("#user").text(`Авторизован как ${auth.user.name}`);
        $(nav).find("#logout").on("click", logoutUser);
        header.append(nav);
    }
    else {
        header.html(navbarGuest());
    }
}

setNavbar();