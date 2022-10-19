let api_url = "https://react-midterm.kreosoft.space/api";

export async function getMovieDetails(filmId) {
    let response = await fetch(`${api_url}/movies/details/${filmId}`);
    if (response.ok) {
        let json = await response.json();
        return json;
    } else {
        return new Object();
    }
}

export async function showDetails(filmId) {
    let film = await getMovieDetails(filmId);
    if (film) {
        $("#name").text(`${film.name} (${film.year})`);
        $("#time").text(film.time);
        $("#tagline").text(`«${film.tagline}»`);
        $("#director").text(film.director);
        $("#budget").text(film.budget.toLocaleString('ru'));
        $("#fees").text(film.fees.toLocaleString('ru'));
        $("#ageLimit").text(`${film.ageLimit}+`);
        $("#year").text(film.year);
        $("#country").text(film.country);
        $("#about").text(film.description);
        $("#genres").text(film.genres.reduce((previousValue, currentValue) =>
        previousValue + ", " + currentValue.name, "").slice(2));
        $("#poster").attr("src", film.poster);
    }
}

//"22158c42-001a-40a3-a2a7-08d9b9f3d2a2"
