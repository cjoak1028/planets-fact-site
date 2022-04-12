import { getData } from './model';

const hamburgerButton = document.querySelector('.hamburger-button');
const hamburgerMenu = document.querySelector('.hamburger-menu');
const planetLinks = document.querySelectorAll('.planet-link');
const navLinks = document.querySelectorAll('.nav__link');
const hamburgerMenuLinks = document.querySelectorAll('.hamburger-menu__link');
const subMenuLinks = document.querySelectorAll('.sub-menu-link');

const planetTitle = document.querySelector('.planet__title');
const planetStats = document.querySelectorAll('.planet-stat');

let prevPlanetIndex = '0';

const openHamburgerMenu = () => {
    hamburgerButton.classList.add('open');
    // Prevent body from scrolling when hamburger button is open
    document.body.classList.add('overflow-hidden');

    hamburgerMenu.classList = 'hamburger-menu collapsing';

    setTimeout(() => {
        hamburgerMenu.style.height = 'calc(100% - 6.8rem)'; //6.8rem is header height
        hamburgerMenu.style.opacity = '100%';
    }, 1);

    setTimeout(() => {
        hamburgerMenu.classList = 'hamburger-menu collapse show';
        hamburgerButton.classList.remove('disabled');
    }, 500);
};

const closeHamburgerMenu = () => {
    hamburgerButton.classList.remove('open');
    document.body.classList.remove('overflow-hidden');

    hamburgerMenu.classList = 'hamburger-menu collapsing';

    setTimeout(() => {
        hamburgerMenu.style.height = '0';
        hamburgerMenu.style.opacity = '0';
    }, 1);

    setTimeout(() => {
        hamburgerMenu.classList = 'hamburger-menu collapse';
        hamburgerMenu.removeAttribute('style');
        hamburgerButton.classList.remove('disabled');
    }, 500);
};

const init = (planetsData) => {
    // Handle click event for hamburger button
    hamburgerButton.addEventListener('click', () => {
        hamburgerMenu.classList.toggle('show');
        hamburgerButton.classList.add('disabled');
        hamburgerMenu.classList.contains('show') ? openHamburgerMenu() : closeHamburgerMenu();
    });

    // Handle click event for each planet link
    planetLinks.forEach(link => {
        link.addEventListener('click', () => {
            const targetPlanetIndex = link.getAttribute('index');
            // Prevent anything from happening if planet link is already selected
            if (targetPlanetIndex === prevPlanetIndex) return;

            // Unselect previous nav + hamburger-menu link
            navLinks[prevPlanetIndex].classList.remove('selected');
            hamburgerMenuLinks[prevPlanetIndex].classList.remove('selected');

            // Select targeted nav + hamburger-menu link
            navLinks[targetPlanetIndex].classList.add('selected');
            hamburgerMenuLinks[targetPlanetIndex].classList.add('selected');

            const currPlanetData = planetsData[targetPlanetIndex];

            // UPDATE PLANET TITLE
            planetTitle.innerHTML = currPlanetData.name;

            // SELECT OVERVIEW SUB-MENU

            // UPDATE PLANET STATS
            planetStats.forEach((stat) => {
                if (stat.classList.contains('stat-rotation')) {
                    stat.innerHTML = currPlanetData.rotation;
                } else if (stat.classList.contains('stat-revolution')) {
                    stat.innerHTML = currPlanetData.revolution;
                } else if (stat.classList.contains('stat-radius')) {
                    stat.innerHTML = currPlanetData.radius;
                } else {
                    stat.innerHTML = currPlanetData.temperature;
                };
            });

            // Navigation menu planet link for tablet+ view 
            if (link.classList.contains('nav__link')) {
                console.log('NAV PLANET LINK CLICKED!');
            }
            // Hamburger menu planet link for mobile view
            else {
                console.log('HAMBURGER MENU PLANET LINK CLICKED!');
                closeHamburgerMenu()
            }

            prevPlanetIndex = targetPlanetIndex;
        });
    });
};

getData('./data.json').then(data => {
    init(data);
}).catch(err => {
    console.error(err);
})



