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
        document.getElementById("name").textContent = `${film.name} (${film.year})`;
        document.getElementById("time").textContent = film.time;
        document.getElementById("tagline").textContent = `«${film.tagline}»`;
        document.getElementById("director").textContent = film.director;
        document.getElementById("budget").textContent = film.budget.toLocaleString('ru');
        document.getElementById("fees").textContent = film.fees.toLocaleString('ru');
        document.getElementById("ageLimit").textContent = `${film.ageLimit}+`;
        document.getElementById("year").textContent = film.year;
        document.getElementById("country").textContent = film.country;
        document.getElementById("genres").textContent = film.genres.reduce((previousValue, currentValue) =>
        previousValue + ", " + currentValue.name, "").slice(2);
        document.getElementById("poster").src = film.poster;
    }
}

//"22158c42-001a-40a3-a2a7-08d9b9f3d2a2"
