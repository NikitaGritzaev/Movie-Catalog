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

export async function changeProfile(email, avatarLink, name, birth, sex) {
    let token = localStorage.getItem("jwt");
    let user = localStorage.getItem("user");
    if (!token) return false;

    if (name.length < 4 ||
        name.length > 64 ||
        !name.match(/^[а-яА-ЯёЁa-zA-Z0-9\-_ ]+$/) ||
        !email.match(/^\S+@\S+\.\S+$/) ||
        !email.match(/^\S+@\S+\.\S+$/) ||
        birth == "Invalid Date" ||
        birth > Date.now() ||
        birth < new Date("1900-01-01")) return false;

    try {
        await checkImage(avatarLink);
    }
    catch {
        avatarLink = null;
    }
    
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
                "gender": sex == "Мужской" ? 1 : 0
            })
        });
        return response.ok;
    } 
    catch {
        return false;
    }
}

export function checkImage(url) {
    return new Promise(function (resolve, reject) {
        if (!url) reject(false);
        let testImage = $("<img>").attr("src", url);
        testImage.on("load", () => resolve(true));
        testImage.on("error", () => reject(false));
    })
    
}
