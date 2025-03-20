const HamburgerButton = document.getElementById('HamburgerButton');
const MobileNavBar = document.getElementById('MobileNavBar');

HamburgerButton.addEventListener('click', (event) => {
    event.stopPropagation();
    if (MobileNavBar.classList.contains('hidden')) {
        MobileNavBar.classList.remove('hidden');
        HamburgerButton.classList.add('active');
    } else {
        MobileNavBar.classList.add('hidden');
        HamburgerButton.classList.remove('active');
    }
});

document.addEventListener('click', () => {
    if (!MobileNavBar.classList.contains('hidden')) {
        MobileNavBar.classList.add('hidden');
        HamburgerButton.classList.remove('active');
    }
});

const params = new URLSearchParams(window.location.search);
const redirectUrl = params.get('redirect');
if (redirectUrl) {
    window.location.href = redirectUrl;
}

const starContainer = document.body;

function GetDeviceType() {
    const UserAgent = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(UserAgent)) {
        return "tablet";
    } else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(UserAgent)) {
        return "mobile";
    }
    return "desktop";
}

function CreateShootingStars() {
    let shootingStarsInterval;

    function CreateStar() {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.width = '3px';
        star.style.height = '3px';
        star.style.left = Math.random() * window.innerWidth + 'px';
        star.style.animation = `ShootingStars 5s ease-in-out`;

        document.body.appendChild(star);

        star.addEventListener('animationend', () => {
            star.remove();
        });
    }

    function startStars() {
        shootingStarsInterval = setInterval(CreateStar, 5000);  
    }

    function stopStars() {
        clearInterval(shootingStarsInterval);
    }

    if (GetDeviceType() === "desktop") {
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                stopStars();
            } else {
                startStars();
            }
        });

        if (!document.hidden) {
            startStars();
        }
    }
}

function twinkleStar() {
    for (let i = 0; i < 8; i++) {
        let star = document.createElement("div");
        star.classList.add("sparkle-star");
        star.style.top = `${Math.random() * 100}vh`;
        star.style.left = `${Math.random() * 100}vw`;
        star.style.animationDuration = `${2 + Math.random() * 4}s`;
        starContainer.appendChild(star);
    }
}

function CreateFallingStars() {
    let fallingStarsInterval;

    function CreateStar() {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.width = '2px';
        star.style.height = '2px';
        star.style.left = Math.random() * window.innerWidth + 'px';
        star.style.top = '0px';
        star.style.animation = `FallingStars ${Math.random() * 3 + 2}s linear`;

        document.body.appendChild(star);

        star.addEventListener('animationend', () => {
            star.remove();
        });
    }

    function startFallingStars() {
        fallingStarsInterval = setInterval(CreateStar, 100);
    }

    function stopFallingStars() {
        clearInterval(fallingStarsInterval);
    }

    if (GetDeviceType() === "desktop") {
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                stopFallingStars();
            } else {
                startFallingStars();
            }
        });

        if (!document.hidden) {
            startFallingStars();
        }
    }
}

function AutoCalculateAge() {
    const BirthDate = new Date(2010, 7, 7);
    const today = new Date();
    let years = today.getFullYear() - BirthDate.getFullYear();
    let months = today.getMonth() - BirthDate.getMonth();

    if (today.getDate() < BirthDate.getDate()) {
        months--;
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    return `${years}`;
}

function AutoCalculateYearsOfExperience() {
    const YearsOfExperienceDate = new Date(2020, 0, 1);
    const today = new Date();
    let years = today.getFullYear() - YearsOfExperienceDate.getFullYear();

    if (today.getMonth() < YearsOfExperienceDate.getMonth() ||
        (today.getMonth() === YearsOfExperienceDate.getMonth() && today.getDate() < YearsOfExperienceDate.getDate())) {
        years--;
    }

    return `${years}`;
}

function UpdateAge() {
    const Age = document.querySelector('.age');
    if (Age) {
        Age.textContent = AutoCalculateAge();
    }
    requestAnimationFrame(UpdateAge);
}

function UpdateYearsOfExperience() {
    const YearsOfExperience = document.querySelector('.yearsofexperience');
    if (YearsOfExperience) {
        YearsOfExperience.textContent = AutoCalculateYearsOfExperience();
    }
    requestAnimationFrame(UpdateYearsOfExperience);
}

requestAnimationFrame(UpdateAge);
requestAnimationFrame(UpdateYearsOfExperience);

function setupFlyingButton(buttonId, targetHref) {
    const button = document.getElementById(buttonId);
    if (!button) return;

    if (GetDeviceType() !== "desktop") {
        button.addEventListener("click", function () {
            window.location.href = targetHref;
        });
        return;
    }

    button.addEventListener("click", function (e) {
        e.currentTarget.disabled = true;
        document.body.classList.add("hidden-cursor");

        const plane = document.createElement("div");
        plane.className = "paper-plane";
        plane.innerHTML = "✈️";

        const buttonRect = button.getBoundingClientRect();
        const startX = buttonRect.left + buttonRect.width / 2 - 12;
        const startY = buttonRect.top + buttonRect.height / 2 - 12;
        plane.style.left = `${startX}px`;
        plane.style.top = `${startY}px`;
        document.body.appendChild(plane);

        const targetLink = document.querySelector(`a[href="${targetHref}"]`);
        if (!targetLink) {
            plane.remove();
            return;
        }

        const targetRect = targetLink.getBoundingClientRect();
        const endX = targetRect.left + targetRect.width / 2 - 12;
        const endY = targetRect.top + targetRect.height / 2 - 12;

        setTimeout(() => {
            plane.style.left = `${endX}px`;
            plane.style.top = `${endY}px`;
        }, 50);

        setTimeout(() => {
            plane.remove();
            targetLink.click();
        }, 1000);
    });
}

setupFlyingButton("LearnMore", "about.html");
setupFlyingButton("CheckThemOutHere", "projects.html");

if (GetDeviceType() === "desktop") {
    CreateShootingStars();
    twinkleStar();
}