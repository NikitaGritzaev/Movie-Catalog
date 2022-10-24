export async function getProfileDetails() {
    let token = localStorage.getItem("jwt");
    if (!token) return;
    let response = await fetch(`${api_url}/account/profile`, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "*/*",
            "Authorization": `Bearer ${token}`
        }
    });
    let json = await response.json();
    return json;
}

export async function showProfile() {
    let details = await getProfileDetails();
    $("#email").val(details.email);
    $("#avatarLink").val(details.avatarLink);
    if (details.avatarLink) $("#avatarImage").prop("src", details.avatarLink);
    else $("#avatarImage").prop("src", "/img/user-avatar.png");
    $("#fullName").val(details.name);
    $("#birthday").val(details.birthDate.slice(0,10));
    if (details.gender) $("#gender").val("Женский")
    else $("#gender").val("Мужской");
    $("#editProfileBtn").on("click", async () => {
        let chng = await changeProfile();
    })
    $("#profile-container").show(700);
}

export async function changeProfile() {
    let token = localStorage.getItem("jwt");
    let user = localStorage.getItem("user");
    if (!token) return false;

    let email = $("#email").val();
    let avatarLink = $("#avatarLink").val();
    let name = $("#fullName").val();
    let birth = $("#birthday").val();
    let sex = $("#gender").val();

    if (!email.match(/^\S+@\S+\.\S+$/) ||
        name.length < 2 ||
        birth > Date.now()) return false;
    try {
        let response = await fetch(`${api_url}/account/profile`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                "id": JSON.parse(user).user.id,
                "nickName": JSON.parse(user).user.nickName,
                "email": email,
                "avatarLink": avatarLink,
                "name": name,
                "birthDate": `${birth}T00:00:00.000Z`,
                "gender": sex == "Мужской" ? 0 : 1
            })
        });
        if (response.ok) {
            location.reload();
        }
    } catch {
        alert("Ошибка")
    }
}