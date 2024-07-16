const MODE = "mode";
const DARK = "dark";
const LIGHT = "light";

const toggleMode = () => {
    const elements = getModeElements();
    elements.forEach((ele) => {
        ele.classList.toggle(LIGHT);
        ele.classList.toggle(DARK);
    });
    setCookie(
        "mode",
        elements[0].classList.contains(DARK) ? DARK : LIGHT,
        365
    );
}

const getModeElements = () => {
    return document.querySelectorAll("." + MODE);
}

const onContentLoaded = () => {
    const elements = getModeElements();
    const mode = getCookie("mode");
    elements.forEach((ele) => {
        if (mode === "") {
            ele.classList.add(DARK);
        } else {
            ele.classList.remove(DARK);
            ele.classList.add(mode);
        }
    })
    document.getElementById("switch__input").checked = elements[0].classList.contains(DARK);
}

addEventListener("DOMContentLoaded", () => {
    onContentLoaded();
});
