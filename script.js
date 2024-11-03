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

    if (GetDeviceType() === "desktop") {
        ShootingStarsInterval = setInterval(CreateStar, 200);
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                clearInterval(ShootingStarsInterval);
            } else {
                ShootingStarsInterval = setInterval(CreateStar, 200);
            }
        });
    } else {
        return
    }
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
        if (MobileNavBar.classList.contains('hidden')) {
            MobileNavBar.classList.remove('hidden');
            HamburgerButton.classList.add('active');
        } else {
            MobileNavBar.classList.add('hidden');
            HamburgerButton.classList.remove('active');
        }
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

function KxoiyDzTwo(id) {
    const section = document.getElementById(id);
    const icon = document.getElementById(id + '-icon');
    section.classList.toggle('hidden');
    if (section.classList.contains('hidden')) {
        icon.innerHTML = '<i class="fas fa-plus"></i>';
    } else {
        icon.innerHTML = '<i class="fas fa-minus"></i>';
    }
}

async function fetchRepos() {
    const repos = ['convertpng.online', 'discord-bot-template-v14', 'keyboard-sounds', 'PortScanner', 'refreshrate', 'WallMaster', 'Wally'];
    const username = 'RuskyDev';
    const repoContainer = document.getElementById('repos');
    const do_not_use_this_token = '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';

    for (let repo of repos) {
        try {
            const response = await fetch(`https://api.github.com/repos/${username}/${repo}`, {
                headers: {
                    Authorization: `token ${do_not_use_this_token}`
                }
            });
            if (!response.ok) {
                throw new Error(`Error fetching ${repo}`);
            }
            const data = await response.json();

            const repoCard = `
                <div class="bg-gray-900 p-3 rounded-lg shadow-lg max-w-xs flex flex-col justify-between h-full">
                    <div>
                        <h3 class="text-white text-lg font-semibold mb-1">${data.name}</h3>
                        <p class="text-gray-300 text-sm mb-3">${data.description || 'No description available'}</p>
                    </div>
                    <div class="flex items-center justify-between mt-2">
                        <a href="${data.html_url}" target="_blank" class="text-purple-500 text-sm">
                            <i class="fas fa-external-link-alt"></i>
                        </a>
                    </div>
                </div>
            `;

            repoContainer.innerHTML += repoCard;
        } catch (error) {
            console.error(error);
            const errorCard = `
                <div class="bg-red-800 p-3 rounded-lg shadow-lg max-w-xs">
                    <h3 class="text-white text-lg font-semibold mb-1">Repo not found</h3>
                    <p class="text-gray-300 mb-3">An error occurred while fetching this repository. Please try again later.</p>
                </div>
            `;
            repoContainer.innerHTML += errorCard;
        }
    }
}
