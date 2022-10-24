import filmItem from "/src/views/filmItem.js";
import pagination from "/src/views/pagination.js";

let api_url = "https://react-midterm.kreosoft.space/api";

export async function getFilms(page) {
    let response = await fetch(`${api_url}/movies/${page}`);
    if (response.ok) {
        let json = await response.json();
        return json;
    } else {
        return new Object();
    }
}

export async function showFilms(page) {
    if (page < 0) return;
    let filmsJSON = await getFilms(page);
    let films = filmsJSON.movies;
    let pages = filmsJSON.pageInfo;
    let movieContainer = $("#films-container");
    if (pages.pageCount < 1) return;
    if (page > pages.pageCount) {
        history.pushState({}, null, `/${pages.pageCount}`);
        showFilms(pages.pageCount);
        return;
    }

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
    $(".card").slideDown("normal");
    let pagesElement = $(pagination());
    if (page <= 1) pagesElement.find("#back").addClass("disabled");
    if (page >= pages.pageCount) pagesElement.find("#forward").addClass("disabled");

    pagesElement.find("#back").attr("href", `/${+page - 1}`);
    pagesElement.find("#forward").attr("href", `/${+page + 1}`);

    let page1 = pagesElement.find("#page1");
    let page2 = pagesElement.find("#page2");
    let page3 = pagesElement.find("#page3");
    if (pages.pageCount == 1) {
        page2.remove();
        page3.remove();
        page1.text("1").addClass("active").attr("href", "/1");
    }
    else if (pages.pageCount == 2) {
        page3.remove();
        page1.text("1").attr("href", "/1");
        page2.text("2").attr("href", "/2");
        page == 1 ? page1.addClass("active") : page2.addClass("active");
    }
    else {
        let firstValue = page - 1;
        let activePage = 2;
        if (page <= 3) {
            firstValue = 1;
            activePage = page;
        }
        else if (page == pages.pageCount) {
            firstValue = pages.pageCount - 2;
            activePage = 3;
        }
        page1.text(firstValue).attr("href", `/${firstValue}`);
        page2.text(firstValue + 1).attr("href", `/${firstValue + 1}`);
        page3.text(firstValue + 2).attr("href", `/${firstValue + 2}`);
        pagesElement.find(`#page${activePage}`).addClass("active");
    }
    movieContainer.after(pagesElement);
}