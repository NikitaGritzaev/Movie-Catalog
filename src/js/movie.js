import review from "/src/views/review.js";
import addReview from "/src/views/addReview.js";

import { createReview, deleteReview } from "/src/js/createReview.js";
import { favorite, getFavoriteFilms } from "/src/js/favoriteFilms.js";

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
    if (jQuery.isEmptyObject(film)) location.href = "/1";

    if (film.name && film.year) $("#name").text(`${film.name} (${film.year})`);
    if (film.time) $("#time").text(`${film.time} мин.`);
    if (film.tagline) $("#tagline").text(`«${film.tagline}»`);
    if (film.director) $("#director").text(film.director);
    if (film.budget) $("#budget").text(`${film.budget.toLocaleString('ru')}$`);
    if (film.fees) $("#fees").text(`${film.fees.toLocaleString('ru')}$`);
    if (film.ageLimit) $("#ageLimit").text(`${film.ageLimit}+`);
    if (film.year) $("#year").text(film.year);
    if (film.country) $("#country").text(film.country);
    if (film.description) $("#about").text(film.description);
    if (film.genres) $("#genres").text(film.genres.reduce((previousValue, currentValue) =>
        previousValue + ", " + currentValue.name, "").slice(2));
    if (film.poster) $("#poster").attr("src", film.poster);

    let currentUser = JSON.parse(localStorage.getItem("user"));
    if (currentUser?.auth) {
        let favorites =  await getFavoriteFilms();
        console.log(favorites);

        let isAdded = false;
        let toggleButton = $("#toggleFavorite"); 

        favorites.movies.forEach(val => {
            if (val.id == filmId) {
                isAdded = true;
                toggleButton.text("Удалить из избранного");
                toggleButton.removeClass("btn-outline-primary");
                toggleButton.addClass("btn-danger");
                return;
            }
        })
        toggleButton.removeClass("d-none");

        toggleButton.one("click", async () => {
            let request = await favorite(filmId, isAdded);
            if (request) {
                toggleButton.removeClass("btn-outline-primary");
                toggleButton.removeClass("btn-danger");
                toggleButton.addClass("btn-success");
                isAdded ? toggleButton.text("Удалено!") : toggleButton.text("Добавлено!");
            }
        })
    }
    setTimeout(() => $("#poster").show(1000), 300);
    $(".film-details").show(300);

    setTimeout(() => showReviews(film?.reviews, filmId), 300);
}

export function showReviews(reviewsObject, filmId) {
    $("#reviewSectionHeading").removeClass("d-none");
    let reviews = Array.from(reviewsObject);
    let hasReview = false;

    let currentUser = JSON.parse(localStorage.getItem("user"));
    if (currentUser?.auth) {
        for (let i = 0; i < reviews.length; ++i) {
            if (reviews[i].author && reviews[i].author.userId == currentUser.user.id) {
                reviews.unshift(reviews.splice(i, 1)[0]);
                reviews[0].author.nickName += " (Ваш отзыв)";
                reviews[0].flag = true;
                hasReview = true;
                break;
            }
        }
    }

    if (!hasReview && currentUser?.auth) {
        $("#film-container").append(addReview());
        $("#newReviewForm").show(1000);
        $("#saveReview").on("click", async () => {
            let create = await createReview(filmId);
            if (create) {
                location.reload();
            }
            else {
                $("#reviewWarn").removeClass("d-none");
            }
        });

    }

    if (!reviews.length) $("#film-container").append("<p>Отзывов ещё нет!</p>");

    for (let i in reviews) {
        let reviewTemplate = $(review());
        reviewTemplate.find(".reviewText").text(reviews[i].reviewText);
        reviewTemplate.find(".reviewDate").text(`Дата отзыва: ${reviews[i].createDateTime.slice(0, 10)}`);

        let rating = reviews[i].rating;
        reviewTemplate.find(".reviewRating").text(rating);

        if (reviews[i].isAnonymous && !reviews[i].flag) {
            reviewTemplate.find(".reviewHeading").text("Аноним");
            reviewTemplate.find(".avatar").attr("src", "/img/user-avatar.png");
        }
        else {
            reviewTemplate.find(".reviewHeading").text(reviews[i].author.nickName);
            let userAvatar = reviews[i].author.avatar;
            if (userAvatar) {
                reviewTemplate.find(".avatar").attr("src", userAvatar);
            }
            else {
                reviewTemplate.find(".avatar").attr("src", "/img/user-avatar.png");
            }

        }

        if (rating > 5) {
            reviewTemplate.addClass("review-good");
            reviewTemplate.find(".reviewRating").addClass("bg-success");
        }
        else {
            reviewTemplate.addClass("review-bad");
            reviewTemplate.find(".reviewRating").addClass("bg-danger");
        }

        if (!reviews[i].author || reviews[i].author.userId != currentUser?.user?.id) {
            reviewTemplate.find(".reviewAuthorOptions").remove();
        }
        else {
            reviewTemplate.addClass("my-review");
            reviewTemplate.find("#deleteReviewBtn").on("click", async () => {
                let deleteReviewStatus = await deleteReview(filmId, reviews[i].id);
                if (deleteReviewStatus) location.reload();
            })
            reviewTemplate.find("#editReviewBtn").one("click", () => {
                $("#reviewSectionHeading").after(addReview());
                $("#newReviewForm").show(1000);
                $("#newReviewText").val(reviews[0].reviewText);
                $("#newReviewRating").val(reviews[0].rating);
                if (reviews[0].isAnonymous) $("#newReviewAnonymous").prop("checked", true);
                $("#saveReview").on("click", async () => {
                    let edit = await createReview(filmId, true, reviews[0].id);
                    if (edit) {
                        location.reload();
                    }
                    else {
                        $("#reviewWarn").removeClass("d-none");
                    }
                });
            })
        }
        $("#film-container").append(reviewTemplate);
    }
}
