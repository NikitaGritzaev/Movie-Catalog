import navbar from "/src/views/navbar.js";
import navbarGuest from "/src/views/navbarGuest.js";
import {authUser, logoutUser} from "/src/js/auth.js";

export async function setNavbar() {
    let header = $("header");
    header.empty();
    let auth = await authUser();
    let nav;
    if (auth.auth)  {
        nav = $(navbar());
        $(nav).find("#user").text(`Авторизован как ${auth.user.name}`);
        $(nav).find("#logout").on("click", logoutUser);
    }
    else nav = $(navbarGuest());
    header.append(nav);
}
