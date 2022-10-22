import favoriteFilmItem from "/src/views/favoriteFilmItem.js";

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

export async function showFavoriteFilms() {
    let request = await getFavoriteFilms();
    let films = request.movies;
    let movieContainer = $("#films-container");
    if (!films.length) movieContainer.html("<h3>У Вас ещё нет избранных фильмов!</h3>");

    films.forEach((currentMovie) => {
        let newFilm = $(favoriteFilmItem());
        console.log(newFilm);
        newFilm.find(".card-title a").text(currentMovie.name);
        newFilm.find(".card-title a").attr("href", `/movie/${currentMovie.id}`);
        newFilm.find("img").attr("src", currentMovie.poster);
        newFilm.find(".year").text(currentMovie.year);
        newFilm.find(".country").text(currentMovie.country);
        newFilm.find(".genre").text(currentMovie.genres.reduce((previousValue, currentValue) =>
            previousValue + ", " + currentValue.name
            , "").slice(2));

        let badgeRating = newFilm.find(".badge");
        if (currentMovie.reviews.length) {
            badgeRating.text("Средняя оценка - " + (currentMovie.reviews.reduce((previousValue, currentValue) =>
                previousValue + currentValue.rating
                , 0) / currentMovie.reviews.length).toFixed(1));
        }
        else {
            badgeRating.text("Ещё нет оценок");
        }

        let removeBtn = newFilm.find(".deleteFavorite");
        removeBtn.one("click", async () => {
            let request = await favorite(currentMovie.id, true);
            if (request) {
                removeBtn.removeClass("btn-danger");
                removeBtn.addClass("btn-success");
                removeBtn.text("Удалено!");
            }
        });
        movieContainer.append(newFilm);
    })
}