import login from "/src/views/login.js";
import register from "/src/views/register.js";
import filmsContainer from "/src/views/filmsContainer.js";
import movieDetails from "/src/views/movieDetails.js";
import profile from "/src/views/profile.js";

import { registerUser, loginUser } from "/src/js/auth.js";
import { showFilms } from "/src/js/loadFilms.js";
import { showDetails } from "/src/js/movie.js";
import { showFavoriteFilms } from "/src/js/favoriteFilms.js";
import { showProfile } from "/src/js/profile.js";


let router = {
    routes: [
        { pattern: /^\/login$/, callback: "login" },
        { pattern: /^\/register$/, callback: "register" },
        { pattern: /^\/favorites$/, callback: "favorites" },
        { pattern: /^\/profile$/, callback: "profile" },
        { pattern: /^\/movie\/([a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12})$/, callback: "movie" },
        { pattern: /^\/([0-9]*)$/, callback: "catalog" }
    ],

    dispatch: function (path) {
        for (let i = 0; i < this.routes.length; ++i) {
            let args = path.match(this.routes[i].pattern);
            if (args) {
                $("main").empty();
                routerFunctions[this.routes[i].callback].apply(this, args.slice(1));
                history.pushState({}, null, path);
                break;
            }
        }
    },

    capture: function () {
        document.addEventListener('click', function (event) {
            if (event.target.href != undefined) {
                event.preventDefault();
                let url = new URL(event.target.href);
                if (window.location.pathname != url.pathname) router.dispatch(url.pathname);
            }
        });
    }
}

let routerFunctions = {
    catalog: function (page = 1) {
        if (!page) page = 1;
        $("main").html(filmsContainer());
        showFilms(page);
    },

    login: function () {
        $("main").html(login());
        $("#loginBtn").on("click", () => loginUser());
    },

    register: function () {
        $("main").html(register());
        $("#signUpBtn").on("click", () => registerUser());
        let checkConfirm = () => {
            let pass = $("#password").val();
            let passConfirm = $("#passwordConfirm").val();
            let errorText = $("#passConfirmWarn");
            if (pass != passConfirm && pass && passConfirm) errorText.removeClass("d-none");
            else errorText.addClass("d-none");
        }
        $("#passwordConfirm").on("change", checkConfirm);
        $("#password").on("change", checkConfirm);
    },

    favorites: function () {
        $("main").html(filmsContainer());
        showFavoriteFilms();
    },

    movie: function (id) {
        $("main").html(movieDetails());
        showDetails(id);
    },

    profile: function () {
        $("main").html(profile());
        showProfile();
    }

}

document.addEventListener("DOMContentLoaded", function (event) {
    router.capture();
    router.dispatch(window.location.pathname);
});



