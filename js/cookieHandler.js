const setCookie = (cookieName, cookieValue, expirationDays) => {
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