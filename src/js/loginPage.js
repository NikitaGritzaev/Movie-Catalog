import { loginUser } from "/src/js/auth.js";
export function initLoginPage() {
    $(".log").fadeOut(0).fadeIn(1000);
    $("#loginBtn").on("click", async () => {
        let check01 = checkPassword(), check02 = checkLogin();
        if (!check01 || !check02) return;
        $("#login").prop("disabled", true);
        $("#password").prop("disabled", true);
        $("#loginBtn").addClass("disabled");
        let blinking;
        try {
            $('.log').fadeTo(100, 0.3, function() { $(this).fadeTo(500, 1.0); });
            blinking = setInterval(function() {
                $('.log').fadeTo(100, 0.3, function() { $(this).fadeTo(500, 1.0); });
            }, 2000);
            let loginAttempt = await loginUser($("#login").val(), $("#password").val());
            if (loginAttempt) location.pathname = "/1";
            else {
                $("#authWarn").remove();
                $("#loginBtn").before(`<p class="text-danger" id="authWarn">Неверные данные!</p>`);
            }
        }
        catch {
            alert("Ошибка соединения");
        }
        finally {
            clearInterval(blinking);
            $("#loginBtn").removeClass("disabled");
            $("#login").prop("disabled", false);
            $("#password").prop("disabled", false);
        }

    });
    let checkPassword = () => {
        let pass = $("#password").val();
        let lengthCheck = true, matchCheck = true;
        if (pass.length < 8 || pass.length > 64) lengthCheck = false;
        if (!pass.match(/^[a-zA-Z0-9\-_!@#№$%^&?*+=(){}[\]<>~]+$/)) matchCheck = false;
        if (!lengthCheck || !matchCheck) {
            $("#password").addClass("is-invalid");
            let text = lengthCheck ? "Недопустимые символы" : "Длина пароля от 8 до 64 симв.";
            $("#passWarn").remove();
            $("#password").after(`<p class="text-danger" id="passWarn">${text}</p>`);
            return false;
        }
        else {
            $("#password").removeClass("is-invalid");
            $("#passWarn").remove();
            return true;
        }
    }
    $("#password").on("change", checkPassword);

    let checkLogin = () => {
        let login = $("#login").val();
        let lengthCheck = true, matchCheck = true;
        if (login.length < 2 || login.length > 32) lengthCheck = false;
        if (!login.match(/^[a-zA-Z0-9\-_]+$/)) matchCheck = false;
        if (!lengthCheck || !matchCheck) {
            $("#login").addClass("is-invalid");
            let text = lengthCheck ? "Недопустимые символы" : "Длина логина от 2 до 32 симв.";
            $("#loginWarn").remove();
            $("#login").after(`<p class="text-danger" id="loginWarn">${text}</p>`);
            return false;
        }
        else {
            $("#login").removeClass("is-invalid");
            $("#loginWarn").remove();
            return true;
        }
    }
    $("#login").on("change", checkLogin);
}