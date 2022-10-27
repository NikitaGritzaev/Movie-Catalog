export function filmSetup(newMovie, currentMovie) {
    newMovie.find(".card-title a").text(currentMovie.name);
    newMovie.find(".card-title a").attr("href", `/movie/${currentMovie.id}`);
    newMovie.find("img").attr("src", currentMovie.poster);
    newMovie.find(".year").text(currentMovie.year);
    let genres = currentMovie.genres.reduce((previousValue, currentValue) =>
        previousValue + ", " + currentValue.name
        , "").slice(2);
    newMovie.find(".country-genre").text(`${currentMovie.country} • ${genres}`);

    let badgeRating = newMovie.find(".badge");
    if (currentMovie.reviews.length) {
        badgeRating.text("Средняя оценка - " + (currentMovie.reviews.reduce((previousValue, currentValue) =>
            previousValue + currentValue.rating
            , 0) / currentMovie.reviews.length).toFixed(1));
    }
    else {
        badgeRating.text("Ещё нет оценок");
    }
    return newMovie;
}