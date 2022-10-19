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
        return {
            auth: true,
            user: json
        };
    }
    catch (err) {
        localStorage.removeItem("jwt");
        return {
            auth: false,
            user: {}
        };
    }
}

export async function logoutUser() {
    let token = localStorage.getItem("jwt");
    localStorage.removeItem("jwt");
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
            location.reload();
        }
    }
    catch (err) {
        alert("Ошибка входа");
    }
}

export async function registerUser(log, pass, passConfirm, email, name, birth, sex) {
    if (pass != passConfirm ||
        !email.match("/^\S+@\S+\.\S+$/") ||
        name.length < 2 ||
        birth > Date.now() ||
        (sex != 0 && sex != 1)) return;
    try {
        let response = await fetch(`${api_url}/account/profile`, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
            },
            body: JSON.stringify({
                "userName": log,
                "name": name,
                "password": pass,
                "email": email,
                "birthDate": birth,
                "gender": sex
            })
        });
        if (response.ok) {
            let json = await response.json();
            localStorage.setItem("jwt", json.token);
        }
    } catch {
        alert("ошибка!")
    }
}