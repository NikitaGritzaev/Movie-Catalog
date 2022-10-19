import login from "/src/views/login.js";
import register from "/src/views/register.js";
import filmsContainer from "/src/views/filmsContainer.js";
import filmItem from "/src/views/filmItem.js";
import movieDetails from "/src/views/movieDetails.js";

import {authUser, registerUser, loginUser, logoutUser} from "/src/js/auth.js";
import {getFilms, showFilms} from "/src/js/loadFilms.js";
import {getMovieDetails, showDetails} from "/src/js/movie.js";

let router = {
    routes: {
        "/login": "login",
        "/register": "register",
        "/favorites": "favorites",
        "/profile": "profile",
        "/movie/:id": "movie",
        "/:id": "catalog",
        "/": "catalog"
    },

    init: function () {
        this._routes = [];
        for (let route in this.routes) {
            let method = this.routes[route];
            this._routes.push({
                pattern: new RegExp('^' + route.replace(/:\w+/g, '([a-zA-Z0-9_-]+)') + '$'),
                callback: this[method]
            });
        }
        router.capture();
    },

    dispatch: function(path) {
        for (let i = 0; i < this._routes.length; ++i) {
            let args = path.match(this._routes[i].pattern);
            if (args) {
                $("main").empty();
                this._routes[i].callback.apply(this, args.slice(1));
                history.pushState({}, null, path);
                break;
            }
        }
    },

    capture: function() {
        document.addEventListener('click', function(event) {
            if (event.target.href != undefined) {
              event.preventDefault();
              let url = new URL(event.target.href);
               router.dispatch(url.pathname);
            }
        });
    },

    catalog: function(page=1) {
        $("main").html(filmsContainer());
        showFilms(page);
    },

    login: function() {
        $("main").html(login());
        $("#loginBtn").on("click", () => loginUser());
    },

    register: function(){
        $("main").html(register());
        $("#signUpBtn").on("click", () => registerUser());
    },

    favorites: function() {
        $("main").html(filmsContainer());
        /**/
    },

    movie: function(id) {
        $("main").html(movieDetails());
        showDetails(id);
    }
}

document.addEventListener("DOMContentLoaded", function(event) {
    router.init();
    router.dispatch(window.location.pathname);
});



