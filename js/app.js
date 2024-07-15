const MODE = "mode";
const DARK = "dark";
const LIGHT = "light";

const toggleMode = () => {
    const elements = getModeElements();
    console.log("elements", elements);
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

const setCookie = (cookieName, cookieValue, expirationDays) => {
    console.log("setCookie", cookieName, cookieValue);
    document.cookie = cookieName + "=" + cookieValue +
        ";expires=" + calcExpirationCookie(expirationDays) + ";path=/";
}

const getCookie = (cookieName) => {
    let name = cookieName + "=";
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookieName.length; i++) {
        let currentCookie = cookies[i];
        if (currentCookie === undefined) {
            continue;
        }
        while (currentCookie.charAt(0) === ' ') {
            currentCookie = currentCookie.substring(1);
        }
        if (currentCookie.indexOf(name) === 0) {
            return currentCookie.substring(name.length, currentCookie.length);
        }
    }
    return "";
}

const calcExpirationCookie = (expirationDays) => {
    const currentDate = new Date();
    currentDate.setTime(currentDate.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
    return currentDate.toUTCString();
}

const getModeElements = () => {
    return document.querySelectorAll("." + MODE);
}

const onContentLoaded = () => {
    const elements = getModeElements();
    elements.forEach((ele) => {
        const mode = getCookie("mode");
        ele.classList.add(mode !== "" ? mode : DARK);
    })
    document.getElementById("switch__input").checked = elements[0].classList.contains(DARK);
}

addEventListener("DOMContentLoaded", () => {
    onContentLoaded();
});
