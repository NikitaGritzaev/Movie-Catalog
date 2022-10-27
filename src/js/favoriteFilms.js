import { filmSetup } from "/src/js/filmSetup.js"

export async function favorite(movieId, deleteFavorite = false) {
    let token = localStorage.getItem("jwt");
    if (!token) return false;

    let full_api = deleteFavorite ? `${api_url}/favorites/${movieId}/delete` : `${api_url}/favorites/${movieId}/add`;
    try {
        let response = await fetch(full_api, {
            method: deleteFavorite ? "DELETE" : "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": `Bearer ${token}`
            }
        });
        return response.ok;
    }
    catch {
        return false;
    }
}

export async function getFavoriteFilms() {
    let token = localStorage.getItem("jwt");
    if (!token) return new Object();
    try {
        let response = await fetch(`${api_url}/favorites`, {
            headers: {
                "Accept": "*/*",
                "Authorization": `Bearer ${token}`
            }
        });
        let json = await response.json();
        return json;
    }
    catch {
        return new Array();
    }
}

export async function initFavoritesPage() {
    let request = await getFavoriteFilms();
    let films = request.movies;
    if (!films.length) $("#films-container").replaceWith(`<h3 class="mx-4 my-4">У Вас ещё нет избранных фильмов!</h3>`);
    $.get("/src/views/favoriteFilmItem.html", function(data) {
        showFavoriteFilms(films, data);
    });
}

async function showFavoriteFilms(films, filmTemplate) {
    let movieContainer = $("#films-container");
    films.forEach((currentMovie) => {
        let newFilm = filmSetup($(filmTemplate), currentMovie);

        let removeBtn = newFilm.find(".deleteFavorite");
        removeBtn.one("click", async () => {
            let request = await favorite(currentMovie.id, true);
            if (request) {
                removeBtn.removeClass("btn-danger");
                removeBtn.addClass("btn-success");
                removeBtn.text("Удалено!");
                let filmCard = removeBtn.parent().parent().parent();
                setTimeout(() => filmCard.hide(1000), 1000);
                setTimeout(() => {
                    filmCard.remove();
                    if (!$(".film").length) {
                        movieContainer.replaceWith(`<h3 class="mx-4 my-4">У Вас ещё нет избранных фильмов!</h3>`);
                    }
                }, 2000); 
            }
        });
        movieContainer.append(newFilm);
    })
    $(".card").fadeOut(0).slideDown("normal");
}