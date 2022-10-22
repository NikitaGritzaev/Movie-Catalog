import navbar from "/src/views/navbar.js";
import navbarGuest from "/src/views/navbarGuest.js";
import {authUser, logoutUser} from "/src/js/auth.js";

async function setNavbar() {
    let header = $("header");
    header.empty();
    let auth = await authUser();
    let nav;
    if (auth.auth)  {
        nav = $(navbar());
        $(nav).find("#user").text(`Авторизован как ${auth.user.name}`);
        $(nav).find("#logout").on("click", logoutUser);
    }
    else {
        nav = $(navbarGuest());
    }
    nav.find(".me-auto a").on("click", event => {
        nav.find(".me-auto a").removeClass("active");
        $(event.currentTarget).addClass("active");
    })
    if (window.location.pathname.match(/\/\d+/)) nav.find(`a[href="/1"]`).addClass("active");
    else nav.find(`a[href="${window.location.pathname}"]`).addClass("active");
    header.append(nav);
}

setNavbar();