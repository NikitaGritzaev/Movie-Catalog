import { initLoginPage } from "/src/js/loginPage.js";
import { initRegisterPage } from "/src/js/registerPage.js";
import { initCatalogue } from "/src/js/loadFilms.js";
import { showDetails } from "/src/js/movie.js";
import { initFavoritesPage } from "/src/js/favoriteFilms.js";
import { initProfilePage } from "/src/js/profilePage.js";
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
                if (!routerFunctions[this.routes[i].callback].apply(this, args.slice(1))) {
                    return;
                };
                $("main").empty();
                history.pushState({}, null, path);
                $(".me-auto a").removeClass("active");
                this.routes[i].nav.forEach(val => $(`#${val}`).addClass("active"));
                return;
            }
        }
        routerFunctions["default"]();
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
        $("main").load("/src/views/404.html");
    },

    catalog: function(page = 1) {
        if (!page) page = 1;
        $("main").load("/src/views/filmsContainer.html", () => initCatalogue(page));
        return true;
    },

    login: function() {
        if (router.checkLogin()) {
            router.dispatch("/1");
            return false;
        }
        
        $("main").load("/src/views/login.html", () => initLoginPage());
        return true;
    },

    register: function() {
        if (router.checkLogin()) {
            router.dispatch("/1");
            return false;
        }
        $("main").load("/src/views/register.html", () => initRegisterPage());
        return true;
    },

    favorites: function() {
        if (!router.checkLogin()) {
            router.dispatch("/login");
            return false;
        }
        $("main").load("/src/views/filmsContainer.html", () => initFavoritesPage());
        return true;
    },

    movie: function(id) {
        $("main").load("/src/views/movieDetails.html", () => showDetails(id));
        return true;
    },

    profile: function() {
        if (!router.checkLogin()) {
            router.dispatch("/login");
            return false;
        }
        $("main").load("/src/views/profile.html", () => initProfilePage());
        return true;
    },

}

$(document).one("DOMContentLoaded", async function (event) {
    await router.init();
    router.dispatch(window.location.pathname);
});



