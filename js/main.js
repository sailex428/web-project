const MODE = "mode";
const DARK = "dark";
const LIGHT = "light";
const pathNames = ["ki-kunst", "urheberrechte", "ki-tools", "impressum"];

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

const handleModeOnRefresh = () => {
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
    const switchInput = document.getElementById("switch__input");
    if (switchInput !== null) {
        switchInput.checked = elements[0].classList.contains(DARK);
    }
}

const fetchComponent = (pathToComponent, componentName) => {
    fetch(pathToComponent)
        .then(response => response.text())
        .then(navbarData => {
            const element = document.getElementById(componentName + '-placeholder');
            if (element !== null) {
                element.innerHTML = navbarData;
            }
            handleModeOnRefresh();
            handleNavbarHighlighting();
        });
}

const handleNavbarHighlighting = () => {
    const pathName = document.location.pathname;

    pathNames.forEach(path => {
        const ele = document.getElementById(path);
        if (ele === null) {
            return;
        }
        if (pathName.includes(path)) {

            if (!ele.classList.contains("active")) {
                ele.classList.add("active");
            }

        } else {
            if (ele.classList.contains("active")) {
                ele.classList.remove("active")
            }
        }
    })
} 

addEventListener("DOMContentLoaded", () => {
    fetchComponent('../components/navbar.html', "navbar");
    fetchComponent('../components/footer.html', "footer");

});
