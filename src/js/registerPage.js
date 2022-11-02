import { registerUser } from "/src/js/auth.js";

export function initRegisterPage() {
    $(".reg").fadeOut(0).fadeIn(1000);
    $("#signUpBtn").on("click", async () => {
        let log = $("#login").val();
        let pass = $("#password").val();
        let passConfirm = $("#passwordConfirm").val();
        let email = $("#email").val();
        let name = $("#fullName").val();
        let birth = $("#birthday").val();
        let sex = $("#gender").val();
        let blinking;
        let checks = [checkPassword(), checkName(), checkLogin(),
                      checkEmail(), checkConfirm(), checkBirthday()];
        try {
            for (let i = 0; i < checks.length; ++i) {
                if (!checks[i]) return;
            }
            $("#signUpBtn").addClass("disabled");
            $("input, select").prop("disabled", true);
            $(".reg").fadeTo(100, 0.3, function () { $(this).fadeTo(500, 1.0); });
            blinking = setInterval(function () {
                $(".reg").fadeTo(100, 0.3, function () { $(this).fadeTo(500, 1.0); });
            }, 2000);
            let regAttempt = await registerUser(log, pass, passConfirm, email, name, birth, sex);
            if (regAttempt.ok) location.href = "/";
            else {
                $("#regWarn").remove();
                $("#signUpBtn").before(`<p class="text-danger" id="regWarn">${regAttempt.msg}</p>`);
            }
        }
        catch {
            alert("Ошибка соединения");
        }
        finally {
            clearInterval(blinking);
            $("#signUpBtn").removeClass("disabled");
            $("input, select").prop("disabled", false);
        }
    });

    let checkConfirm = () => {
        let pass = $("#password").val();
        let passConfirm = $("#passwordConfirm").val();;
        if (pass != passConfirm) {
            if ($("#passConfirmWarn").length) return;
            $("#passwordConfirm").after(`<p class="text-danger" id="passConfirmWarn">Пароли не совпадают</p>`);
            $("#password").addClass("is-invalid");
            $("#passwordConfirm").addClass("is-invalid");
            return false;
        }
        else {
            $("#passConfirmWarn").remove();
            $("#password").removeClass("is-invalid");
            $("#passwordConfirm").removeClass("is-invalid");
            return true;
        }
    }
    $("#passwordConfirm").on("change", checkConfirm);
    $("#password").on("change", checkConfirm);

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

    let checkName = () => {
        let name = $("#fullName").val();
        let lengthCheck = true, matchCheck = true;
        if (name.length < 4 || name.length > 64) lengthCheck = false;
        if (!name.match(/^[а-яА-ЯёЁa-zA-Z0-9\-_ ]+$/)) matchCheck = false;
        if (!lengthCheck || !matchCheck) {
            $("#fullName").addClass("is-invalid");
            let text = lengthCheck ? "Недопустимые символы" : "Длина имени от 4 до 64 симв.";
            $("#nameWarn").remove();
            $("#fullName").after(`<p class="text-danger" id="nameWarn">${text}</p>`);
            return false;
        }
        else {
            $("#fullName").removeClass("is-invalid");
            $("#nameWarn").remove();
            return true;
        }
    }
    $("#fullName").on("change", checkName);

    let checkEmail = () => {
        let email = $("#email").val();
        if (!email.match(/^\S+@\S+\.\S+$/)) {
            $("#email").addClass("is-invalid");
            let text = "Некорректный email";
            $("#emailWarn").remove();
            $("#email").after(`<p class="text-danger" id="emailWarn">${text}</p>`);
            return false;
        }
        else {
            $("#email").removeClass("is-invalid");
            $("#emailWarn").remove();
            return true;
        }
    }
    $("#email").on("change", checkEmail);

    let checkBirthday = () => {
        let date = new Date($("#birthday").val());
        if (date == "Invalid Date" || date > Date.now() || date < new Date("1900-01-01")) {
            $("#birthday").addClass("is-invalid");
            $("#birthdayWarn").remove();
            $("#birthday").after(`<p class="text-danger" id="birthdayWarn">Некорректная дата</p>`);
            return false;
        }
        else {
            $("#birthday").removeClass("is-invalid");
            $("#birthdayWarn").remove();
            return true;
        }
    }
    $("#birthday").on("change", checkBirthday);

    $("#birthday").attr("max", new Date().toISOString().split("T")[0]);
}