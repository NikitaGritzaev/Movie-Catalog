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
        nav.querySelector("#user").textContent = `Авторизован как ${auth.user.name}`;
        nav.querySelector("#logout").addEventListener("click", logoutUser);
        header.append(nav);
    }
    else {
        header.html(navbarGuest());
    }
}

setNavbar();