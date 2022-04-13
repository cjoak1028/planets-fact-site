import { getData } from './model';

const hamburgerButton = document.querySelector('.hamburger-button');
const hamburgerMenu = document.querySelector('.hamburger-menu');
const planetLinks = document.querySelectorAll('.planet-link');
const navLinks = document.querySelectorAll('.nav__link');
const hamburgerMenuLinks = document.querySelectorAll('.hamburger-menu__link');
const subMenuLinks = document.querySelectorAll('.sub-menu-link');
const subMenuMobileLinks = document.querySelectorAll('.sub-menu--mobile__link');
const subMenuTabletLinks = document.querySelectorAll('.sub-menu--tablet__link');

const planetTitle = document.querySelector('.planet__title');
const planetStats = document.querySelectorAll('.planet-stat');

let currPlanet = 'mercury';
let currPlanetIndex = '0';
let currSubMenuIndex = '0';

const openHamburgerMenu = () => {
    hamburgerButton.classList.add('open');
    // Prevent body from scrolling when hamburger button is open
    document.body.classList.add('overflow-hidden');

    hamburgerMenu.classList = 'hamburger-menu collapsing';

    setTimeout(() => {
        hamburgerMenu.style.height = `calc(100% - 6.8rem)`; //6.8rem is height of header
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
            const prevPlanet = currPlanet;
            const targetPlanetIndex = link.getAttribute('index');
            // Prevent anything from happening if planet link is already selected
            if (targetPlanetIndex === currPlanetIndex) return;

            // Unselect previously selected nav and hamburger-menu links
            navLinks[currPlanetIndex].classList.remove('selected');
            hamburgerMenuLinks[currPlanetIndex].classList.remove('selected');

            // Select newly slected nav and hamburger-menu links
            navLinks[targetPlanetIndex].classList.add('selected');
            hamburgerMenuLinks[targetPlanetIndex].classList.add('selected');

            currPlanetIndex = targetPlanetIndex;

            const currPlanetData = planetsData[targetPlanetIndex];
            currPlanet = currPlanetData.name.toLowerCase();

            // Pass currPlanet to subMenuLinks by setting their classes
            // This is the basis of setting appropriate background color depending on value of currPlanet
            subMenuLinks.forEach(link => {
                link.classList.remove(prevPlanet);
                link.classList.add(currPlanet);
            })

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

            // Hamburger menu planet link for mobile view
            if (link.classList.contains('hamburger-menu__link')) {
                // Close hamburger menu when hamburger menu link is clicked
                closeHamburgerMenu();
            }
        });
    });

    subMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            const targetSubMenuIndex = link.getAttribute('index');
            if (targetSubMenuIndex === currSubMenuIndex) return;

            // Unselect previously selected content link
            subMenuMobileLinks[currSubMenuIndex].classList.remove('selected');
            subMenuTabletLinks[currSubMenuIndex].classList.remove('selected');

            // Select newly selected content link
            subMenuMobileLinks[targetSubMenuIndex].classList.add('selected');
            subMenuTabletLinks[targetSubMenuIndex].classList.add('selected');

            currSubMenuIndex = targetSubMenuIndex;

            const currPlanetData = planetsData[currPlanetIndex];
        });
    });
};

getData('./data.json').then(data => {
    init(data);
}).catch(err => {
    console.error(err);
})



