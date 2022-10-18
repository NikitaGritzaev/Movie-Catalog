import navbar from "/src/views/navbar.js";
import navbarGuest from "/src/views/navbarGuest.js";

async function setNavbar() {
    let header = $("header");
    header.empty();
    let auth = await authUser();
    auth ? header.html(navbar()) : header.html(navbarGuest());
}

setNavbar();