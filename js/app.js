const toggleMode = () => {
    const elements = document.querySelectorAll(".mode");
    elements.forEach((ele) => {
        ele.classList.toggle("light");
        ele.classList.toggle("dark");
    });
}