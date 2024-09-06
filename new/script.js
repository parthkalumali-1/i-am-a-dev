function CreateShootingStars() {
    let ShootingStarsInterval;

    function CreateStar() {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.width = '2px';
        star.style.height = '2px';
        star.style.left = Math.random() * window.innerWidth + 'px';
        star.style.top = Math.random() * window.innerHeight + 'px';
        star.style.animation = `ShootingStars 2s linear`;

        document.body.appendChild(star);

        star.addEventListener('animationend', () => {
            star.remove();
        });
    }
    function StartShootingStars() {
        console.log("star spawning started")
        ShootingStarsInterval = setInterval(CreateStar, 200);
    }
    function StopShootingStars() {
        console.log("star spawning stopped")
        clearInterval(ShootingStarsInterval);
    }
    StartShootingStars();
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            StopShootingStars();
        } else {
            StartShootingStars();
        }
    });
}

function CreateMouseTrails(e) {
    const trail = document.createElement('div');
    trail.classList.add('trail');
    trail.style.left = e.pageX + 'px';
    trail.style.top = e.pageY + 'px';
    document.body.appendChild(trail);

    setTimeout(() => trail.remove(), 1000);
}

document.addEventListener('mousemove', CreateMouseTrails);

function MobileNavBar() {
    const HamburgerButton = document.getElementById('HamburgerButton');
    const MobileNavBar = document.getElementById('MobileNavBar');

    HamburgerButton.addEventListener('click', () => {
        MobileNavBar.classList.toggle('hidden');
        HamburgerButton.classList.toggle('active');
    });
}

function AutoCalculateAge() {
    const BirthDate = new Date(2010, 7, 7); // August 7, 2010
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
    const YearsOfExperienceDate = new Date(2018, 0, 1); // January 1, 2018
    const today = new Date();
    let years = today.getFullYear() - YearsOfExperienceDate.getFullYear();

    if (today.getMonth() < YearsOfExperienceDate.getMonth() ||
        (today.getMonth() === YearsOfExperienceDate.getMonth() && today.getDate() < YearsOfExperienceDate.getDate())) {
        years--;
    }

    return `${years}`;
}

setInterval(() => {
    const Age = document.querySelector('.age');
    if (Age) {
        Age.textContent = AutoCalculateAge();
    }
}, 1000);

setInterval(() => {
    const YearsOfExperience = document.querySelector('.yearsofexperience');
    if (YearsOfExperience) {
        YearsOfExperience.textContent = AutoCalculateYearsOfExperience();
    }
}, 1000);
