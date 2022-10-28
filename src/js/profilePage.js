import { getProfileDetails, changeProfile, checkImage } from "/src/js/profile.js";
export async function initProfilePage() {
    let details = await getProfileDetails();

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
        if (date > Date.now() || date < new Date("1900-01-01")) {
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

    $("#avatarLink").val(details.avatarLink);

    try {
        await checkImage(details.avatarLink);
        $("#avatarImage").prop("src", details.avatarLink);
    }
    catch {
        $("#avatarImage").prop("src", "/img/user-avatar.png");
    }

    $("#email").val(details.email);
    $("#fullName").val(details.name);
    $("#birthday").val(details.birthDate.slice(0, 10));
    if (details.gender) $("#gender").val("Мужской")
    else $("#gender").val("Женский");

    let saveProfile = async () => {
        let email = $("#email").val();
        let avatarLink = $("#avatarLink").val();
        let name = $("#fullName").val();
        let birth = $("#birthday").val();
        let sex = $("#gender").val();
        let blinking;
        try {
            if (!checkName() || !checkEmail() || !checkBirthday()) return;

            $("#editProfileBtn").addClass("disabled");
            $("input, select").prop("disabled", true);
            $("#profile-container").fadeTo(100, 0.3, function () { $(this).fadeTo(500, 1.0); });
            blinking = setInterval(function () {
                $("#profile-container").fadeTo(100, 0.3, function () { $(this).fadeTo(500, 1.0); });
            }, 2000);
            let editProfileAttempt = await changeProfile(email, avatarLink, name, birth, sex);
            if (editProfileAttempt) location.reload();
            else {
                $("#editWarn").remove();
                $("#editProfileBtn").before(`<p class="text-danger" id="editWarn">Ошибка!</p>`);
            }
        }
        catch(err) {
            console.log(err)
        }
        finally {
            clearInterval(blinking);
            $("#editProfileBtn").removeClass("disabled");
            $("input, select").prop("disabled", false);

        }
    }

    let editBtn = $("#editProfileBtn");
    editBtn.one("click", () => {
        $("input, select").attr("disabled", false);
        $("#editProfileBtn").removeClass("btn-warning").addClass("btn-primary").text("Сохранить");
        editBtn.on("click", saveProfile);
    })
    
    $.appear("#profile-container", 700);
}
