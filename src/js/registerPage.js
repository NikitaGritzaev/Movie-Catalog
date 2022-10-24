import { registerUser } from "/src/js/auth.js";

export function initRegisterPage() {
    $("#signUpBtn").on("click", () => {
        let log = $("#login").val();
        let pass = $("#password").val();
        let passConfirm = $("#passwordConfirm").val();
        let email = $("#email").val();
        let name = $("#fullName").val();
        let birth = $("#birthday").val();
        let sex = $("#gender").val();
        registerUser(log, pass, passConfirm, email, name, birth, sex);
    });

    let checkConfirm = () => {
        let pass = $("#password").val();
        let passConfirm = $("#passwordConfirm").val();;
        if (pass != passConfirm && pass && passConfirm) {
            if ($("#passConfirmWarn").length) return;
            $("#passwordConfirm").after(`<p class="text-danger" id="passConfirmWarn">Пароли не совпадают</p>`);
            $("#password").addClass("is-invalid");
            $("#passwordConfirm").addClass("is-invalid");
        }
        else {
            $("#passConfirmWarn").remove();
            $("#password").removeClass("is-invalid");
            $("#passwordConfirm").removeClass("is-invalid");
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
        }
        else {
            $("#password").removeClass("is-invalid");
            $("#passWarn").remove();
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
        }
        else {
            $("#login").removeClass("is-invalid");
            $("#loginWarn").remove();
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
        }
        else {
            $("#fullName").removeClass("is-invalid");
            $("#nameWarn").remove();
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
        }
        else {
            $("#email").removeClass("is-invalid");
            $("#emailWarn").remove();
        }
    }
    $("#email").on("change", checkEmail);
     
    let checkBirthday = () => {
        let date = new Date($("#birthday").val());
        if (date > Date.now() || date < new Date("1900-01-01")) {
            $("#birthday").addClass("is-invalid");
            $("#birthdayWarn").remove();
            $("#birthday").after(`<p class="text-danger" id="birthdayWarn">Некорректная дата</p>`);
        }
        else {
            $("#birthday").removeClass("is-invalid");
            $("#birthdayWarn").remove();
        }
    }
    $("#birthday").on("change", checkBirthday);
    
    $("#birthday").attr("max", new Date().toISOString().split("T")[0]);
}