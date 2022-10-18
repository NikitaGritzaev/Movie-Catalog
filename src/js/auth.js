async function authUser() {
    let token = localStorage.getItem("jwt");
    if (!token) return false;
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
    catch(err) {
        return {
            auth: false,
            user: {

            }
        };
    }
    return response.ok;
}

async function logoutUser() {
    localStorage.removeItem("jwt");
    try {
        let response = await fetch(`${api_url}/account/logout`, {
            method: 'POST',
            headers: {
            "Content-Type": "application/json",
            "Accept": "*/*"
            }
        });
    }
    finally {
        location.reload();
    }
}

async function loginUser(login, password) {
    try {
        let response = await fetch(`${api_url}/account/login`, {
            method: 'POST',
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
        }
    }
    catch(err) {
        alert("Ошибка входа");
    }
}