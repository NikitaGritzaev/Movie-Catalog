import filmItem from "/src/views/filmItem.js";
import filmsContainer from "/src/views/filmsContainer.js";
let api_url = "https://react-midterm.kreosoft.space/api";

export async function getFilms(page) {
    let response = await fetch(`${api_url}/movies/${page}`);
    if (response.ok) {
        let json = await response.json();
        return json.movies;
    } else {
        return new Array();
    }
}

//TODO: переписать на JQuery
export async function showFilms(page) {
    if (page<0) return;
    let films = await getFilms(page);
    let movieContainer = $("#films-container");
    
    films.forEach((currentMovie) => {
        let newFilm = $(filmItem());
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
        movieContainer.append(newFilm);
    })

}