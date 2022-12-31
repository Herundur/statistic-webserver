const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
});

const hiddenElementsRight = document.querySelectorAll(".rightFadeIn");
const hiddenElementsLeft = document.querySelectorAll(".leftFadeIn");
hiddenElementsRight.forEach((el) => observer.observe(el));
hiddenElementsLeft.forEach((el) => observer.observe(el));