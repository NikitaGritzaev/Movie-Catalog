import { filmSetup } from "/src/js/filmSetup.js"

export async function getFilms(page) {
    let response = await fetch(`${api_url}/movies/${page}`);
    if (response.ok) {
        let json = await response.json();
        return json;
    } else {
        return new Object();
    }
}

export async function initCatalogue(page) {
    if (page < 0) return;
    let filmsJSON = await getFilms(page);
    let films = filmsJSON.movies;
    let pages = filmsJSON.pageInfo;
    if (pages.pageCount < 1) return;
    if (page > pages.pageCount) {
        history.pushState({}, null, `/${pages.pageCount}`);
        initCatalogue(pages.pageCount);
        return;
    }
    $.get("/src/views/filmItem.html", function(data) {
        showFilms(films, page, data, pages.pageCount);
    });
}

 async function showFilms(films, page, filmTemplate, pages) {
    let movieContainer = $("#films-container");
    films.forEach((currentMovie) => {
        let newFilm = filmSetup($(filmTemplate), currentMovie);
        movieContainer.append(newFilm);
    })
    $(".filmItem").fadeOut(0).slideDown("normal");
    $.get("/src/views/pagination.html", function(data) {
        showPagination(page, data, pages);
    })
}

async function showPagination(page, pagination, pages) {
    let pagesElement = $(pagination);
    if (page <= 1) pagesElement.find("#back").addClass("disabled");
    if (page >= pages) pagesElement.find("#forward").addClass("disabled");

    pagesElement.find("#back").attr("href", `/${+page - 1}`);
    pagesElement.find("#forward").attr("href", `/${+page + 1}`);

    let page1 = pagesElement.find("#page1");
    let page2 = pagesElement.find("#page2");
    let page3 = pagesElement.find("#page3");
    if (pages == 1) {
        page2.remove();
        page3.remove();
        page1.text("1").addClass("active").attr("href", "/1");
    }
    else if (pages == 2) {
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
        else if (page == pages) {
            firstValue = pages - 2;
            activePage = 3;
        }
        page1.text(firstValue).attr("href", `/${firstValue}`);
        page2.text(firstValue + 1).attr("href", `/${firstValue + 1}`);
        page3.text(firstValue + 2).attr("href", `/${firstValue + 2}`);
        pagesElement.find(`#page${activePage}`).addClass("active");
    }
    $("#films-container").after(pagesElement);
}