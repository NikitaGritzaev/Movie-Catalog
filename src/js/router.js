import login from "/src/views/login.js";
import register from "/src/views/register.js";
import filmsContainer from "/src/views/filmsContainer.js";
import movieDetails from "/src/views/movieDetails.js";
import profile from "/src/views/profile.js";
import emptyPage from "/src/views/404.js";

import { initLoginPage } from "/src/js/loginPage.js";
import { initRegisterPage } from "/src/js/registerPage.js";
import { showFilms } from "/src/js/loadFilms.js";
import { showDetails } from "/src/js/movie.js";
import { showFavoriteFilms } from "/src/js/favoriteFilms.js";
import { showProfile } from "/src/js/profile.js";
import { setNavbar } from "/src/js/initNavbar.js";


let router = {
    routes: [
        { pattern: /^\/login$/, callback: "login", nav: [] },
        { pattern: /^\/register$/, callback: "register", nav: [] },
        { pattern: /^\/favorites$/, callback: "favorites", nav: ["favoritesLink"] },
        { pattern: /^\/profile$/, callback: "profile", nav: ["profileLink"] },
        { pattern: /^\/movie\/([a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12})$/,
          callback: "movie", nav: ["moviesLink"] },
        { pattern: /^\/([0-9]*)$/, callback: "catalog", nav: ["moviesLink"] }
    ],

    dispatch: function (path) {
        for (let i = 0; i < this.routes.length; ++i) {
            let args = path.match(this.routes[i].pattern);
            if (args) {
                $("main").empty();
                if (!routerFunctions[this.routes[i].callback].apply(this, args.slice(1))) {
                    return;
                };
                history.pushState({}, null, path);
                $(".me-auto a").removeClass("active");
                this.routes[i].nav.forEach(val => $(`#${val}`).addClass("active"));
                return;
            }
            routerFunctions["default"]();
        }
    },

    init: async function () {
        await setNavbar();
        $(document).on("click", function (event) {
            if (event.target.href != undefined) {
                event.preventDefault();
                let url = new URL(event.target.href);
                if (window.location.pathname != url.pathname) router.dispatch(url.pathname);
            }
        });
    },

    checkLogin: function () {
        let user = localStorage.getItem("user");
        return (user && JSON.parse(user).auth);
    }
}

let routerFunctions = {
    default: function() {
        $("main").html(emptyPage());
    },

    catalog: function (page = 1) {
        if (!page) page = 1;
        $("main").html(filmsContainer());
        showFilms(page);
        return true;
    },

    login: function () {
        if (router.checkLogin()) {
            router.dispatch("/1");
            return false;
        }
        
        $("main").html(login());
        initLoginPage();
        $(".log").fadeIn(1000);
        return true;
    },

    register: function () {
        if (router.checkLogin()) {
            router.dispatch("/1");
            return false;
        }
        $("main").html(register());
        $(".reg").fadeIn(1000);
        initRegisterPage();
        return true;
    },

    favorites: function () {
        if (!router.checkLogin()) {
            router.dispatch("/login");
            return false;
        }
        $("main").html(filmsContainer());
        showFavoriteFilms();
        return true;
    },

    movie: function (id) {
        $("main").html(movieDetails());
        showDetails(id);
        return true;
    },

    profile: function () {
        if (!router.checkLogin()) {
            router.dispatch("/login");
            return false;
        }
        $("main").html(profile());
        showProfile();
        return true;
    },

}

$(document).on("DOMContentLoaded", async function (event) {
    await router.init();
    router.dispatch(window.location.pathname);
});



