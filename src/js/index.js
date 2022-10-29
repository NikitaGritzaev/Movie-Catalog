const api_url = "https://moviecatalog.markridge.space/api";
$(document).keypress(function(e){
    if (e.which == 13) {
        $("#loginBtn").click();
        $("#signUpBtn").click();
    }
});

$.appear = function(selector, time = 1000) { //для работы с bootstrap5 d-none
    $(selector).removeClass("d-none").fadeOut(0).show(time);
}

window.fetch = new Proxy(window.fetch, { //для отлова 401
    apply(fetch, context, args) {
        let response = fetch.apply(context, args);
        response.then((data) => {
            if (data.status == 401) {
                localStorage.removeItem("jwt");
                localStorage.removeItem("user");
                if (window.location.pathname != "/login") location.href = "/login";
            }
        });
        return response;
    }
});






