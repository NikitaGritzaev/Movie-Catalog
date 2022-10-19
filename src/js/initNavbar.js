import navbar from "/src/views/navbar.js";
import navbarGuest from "/src/views/navbarGuest.js";
import {authUser} from "/src/js/auth.js";

async function setNavbar() {
    let header = $("header");
    header.empty();
    let auth = await authUser();
    if (auth)  {
        let fakeDiv = document.createElement("div");
        fakeDiv.innerHTML = navbar().trim();
        let nav = fakeDiv.firstChild;
        nav.querySelector("#user").textContent = `Авторизован как ${auth.user.name}`;
        header.append(nav);
    }

    else {
        header.html(navbarGuest());
    }
}

setNavbar();