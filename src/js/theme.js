export function themeButton() {
    let btn = $("#themeButton");
    let mode = localStorage.getItem("mode");
    if (mode == "dark") {
        btn.attr("src", "/img/night.png")
    }
    else {
        btn.attr("src", "/img/light.png")
        localStorage.setItem("mode", "light");
    }

    btn.on("click", function() {
        let mode = localStorage.getItem("mode");
        if (mode == "dark") {
            localStorage.setItem("mode", "light");
            btn.attr("src", "/img/light.png");
            setTheme(false);
        }
        else {
            localStorage.setItem("mode", "dark");
            btn.attr("src", "/img/night.png");
            setTheme(true);
        }
    })
    btn.attr("hidden", false);
    setTheme(mode == "dark");
}

export function setTheme(dark = false) {
    if (dark) {
        $("body").removeClass("bg-light").addClass("bg-black");
        return;
    }
    $("body").removeClass("bg-black").addClass("bg-light");
}