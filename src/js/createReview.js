export async function createReview(movieId, edit = false, reviewId = "0") {
    let token = localStorage.getItem("jwt");
    if (!token) return false;
    let isAnonymous = $("#newReviewAnonymous").is(":checked");
    let reviewText = $("#newReviewText").val();
    let reviewRating = $("#newReviewRating").val();
    let full_api = edit ? `${api_url}/movie/${movieId}/review/${reviewId}/edit` :
        `${api_url}/movie/${movieId}/review/add`;
    try {
        let response = await fetch(full_api, {
            method: edit ? "PUT" : "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                "reviewText": reviewText,
                "rating": parseInt(reviewRating),
                "isAnonymous": isAnonymous
            })
        });
        return response.ok;
    }
    catch {
        return false;
    }
}

export async function deleteReview(movieId, reviewId) {
    let token = localStorage.getItem("jwt");
    if (!token) return false;
    try {
        let response = await fetch(`${api_url}/movie/${movieId}/review/${reviewId}/delete`, {
            method: "DELETE",
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

