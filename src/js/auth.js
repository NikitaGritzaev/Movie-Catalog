let api_url = "https://react-midterm.kreosoft.space/api";

export async function authUser() {
    let token = localStorage.getItem("jwt");
    if (!token) return {
        auth: false,
        user: {}
    };
    try {
        let response = await fetch(`${api_url}/account/profile`, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": `Bearer ${token}`
            }
        });
        let json = await response.json();

        let user = {
            auth: true,
            user: json
        };
        localStorage.setItem("user", JSON.stringify(user))
        return user;
    }
    catch (err) {
        localStorage.removeItem("jwt");
        let user = {
            auth: false,
            user: {}
        };
        localStorage.setItem("user", JSON.stringify(user))
        return user;
    }
}

export async function logoutUser() {
    let token = localStorage.getItem("jwt");
    localStorage.removeItem("jwt");
    let user = {
        auth: false,
        user: {}
    };
    localStorage.setItem("user", JSON.stringify(user));
    if (!token) return;
    try {
        let response = await fetch(`${api_url}/account/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": `Bearer ${token}`
            }
        });
    }
    finally {
        location.reload();
    }
}

export async function loginUser() {
    try {
        let login = $("#login").val();
        let password = $("#password").val();
        if (!login || !password) return;
        let response = await fetch(`${api_url}/account/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            },
            body: JSON.stringify({
                "username": login,
                "password": password
            })
        });
        if (response.ok) {
            let json = await response.json();
            localStorage.setItem("jwt", json.token);
            location.pathname = "/";
        }
        else {
            $("#warn").removeClass("d-none");
        }
    }
    catch (err) {
        alert("Ошибка входа");
    }
}

export async function registerUser() {
    let log = $("#login").val();
    let pass = $("#password").val();
    let passConfirm = $("#passwordConfirm").val();
    let email = $("#email").val();
    let name = $("#fullName").val();
    let birth = $("#birthday").val();
    let sex = $("#gender").val();

    if (pass != passConfirm ||
        !email.match(/^\S+@\S+\.\S+$/) ||
        name.length < 2 ||
        birth > Date.now()) return;
    try {
        let response = await fetch(`${api_url}/account/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
            },
            body: JSON.stringify({
                "userName": log,
                "name": name,
                "password": pass,
                "email": email,
                "birthDate": `${birth}T00:00:00.000Z`,
                "gender": sex = "Мужской" ? 0 : 1
            })
        });
        if (response.ok) {
            let json = await response.json();
            localStorage.setItem("jwt", json.token);
            location.pathname = "/";
        }
    } catch {
        alert("ошибка!")
    }
}