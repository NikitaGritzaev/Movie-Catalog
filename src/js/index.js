const api_url = "https://react-midterm.kreosoft.space/api";
$(document).keypress(function(e){
    if (e.which == 13) {
        $("#loginBtn").click();
        $("#signUpBtn").click();
    }
});

$.appear = function(selector, time = 1000) { //для работы с bootstrap5 d-none
    $(selector).removeClass("d-none").fadeOut(0).show(time);
}






