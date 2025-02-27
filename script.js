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

console.log(`
    ____            _          
   |  _ \\ _   _ ___| | ___   _ 
   | |_) | | | / __| |/ / | | |
   |  _ <| |_| \\__ \\   <| |_| |
   |_| \\_\\__,_|___/_|\\_\\__, |
                         |___/  
 © ${new Date().getFullYear()} RuskyDev - https://rusky.is-a.dev\n

Don't even think about inspecting elements on my site or stealing my code. If you want to fork this website, visit the repo at https://github.com/RuskyDev/ruskydev.github.io Just make sure to give me credit.\n
`);

const params = new URLSearchParams(window.location.search);
const redirectUrl = params.get('redirect');
if (redirectUrl) {
    window.location.href = redirectUrl;
}

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
        star.style.width = '4px';
        star.style.height = '4px';
        star.style.left = Math.random() * window.innerWidth + 'px';
        star.style.top = Math.random() * window.innerHeight + 'px';
        star.style.animation = `ShootingStars 2s linear`;

        document.body.appendChild(star);

        star.addEventListener('animationend', () => {
            star.remove();
        });
    }

    function startStars() {
        shootingStarsInterval = setInterval(CreateStar, 200);
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

    return `${years}.${months.toString()}`;
}

function AutoCalculateYearsOfExperience() {
    const YearsOfExperienceDate = new Date(2021, 0, 1);
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

CreateShootingStars();
