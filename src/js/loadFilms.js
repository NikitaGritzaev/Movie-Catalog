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
    let films = await getFilms(page);
    if (page) {
        let movieContainer = document.getElementById("films-container");
        
        let fakeDiv = document.createElement("div");
        fakeDiv.innerHTML = filmItem().trim();
        let filmTemplate = fakeDiv.firstChild;
        films.forEach((currentMovie) => {
            let newFilm = filmTemplate.cloneNode(true);
            newFilm.querySelector(".card-title a").textContent = currentMovie.name;
            newFilm.querySelector(".card-title a").href = `/movie/${currentMovie.id}`;
            newFilm.querySelector("img").src = currentMovie.poster;
            newFilm.querySelector(".year").textContent = currentMovie.year;
            newFilm.querySelector(".country").textContent = currentMovie.country;
            newFilm.querySelector(".genre").textContent = currentMovie.genres.reduce((previousValue, currentValue) =>
                previousValue + ", " + currentValue.name
            , "").slice(2);

            let badgeRating = newFilm.querySelector(".badge");
            if (currentMovie.reviews.length) {
                badgeRating.textContent = "Средняя оценка - " + (currentMovie.reviews.reduce((previousValue, currentValue) =>
                previousValue + currentValue.rating
            , 0) / currentMovie.reviews.length).toFixed(1);
            }
            else {
                badgeRating.textContent = "Ещё нет оценок"
            }
            newFilm.classList.remove("d-none");
            movieContainer.append(newFilm);
        })
    } else {
    }
}