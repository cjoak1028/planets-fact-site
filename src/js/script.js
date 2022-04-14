import { getData } from './model';

const hamburgerButton = document.querySelector('.hamburger-button');
const hamburgerMenu = document.querySelector('.hamburger-menu');
const planetLinks = document.querySelectorAll('.planet-link');
const navLinks = document.querySelectorAll('.nav__link');
const hamburgerMenuLinks = document.querySelectorAll('.hamburger-menu__link');
const subMenuLinks = document.querySelectorAll('.sub-menu-link');
const subMenuMobileLinks = document.querySelectorAll('.sub-menu--mobile__link');
const subMenuTabletLinks = document.querySelectorAll('.sub-menu--tablet__link');

const planetImage = document.querySelector('.planet__img');
const planetGeoImage = document.querySelector('.planet__geo-img');
const planetTitle = document.querySelector('.planet__title');
const planetContent = document.querySelector('.planet__content');
const planetContentSource = document.querySelector('.content-source__link');
const planetStats = document.querySelectorAll('.planet-stat');

// Check whether browser is Safari or not
var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

const mediaQueryList = window.matchMedia("screen and (min-width: 47.9em)");

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

    // Closes hamburger menu when screen size hits above small media query while menu is open
    if (isSafari) {
        mediaQueryList.addListener((e) => {
            if (e.matches) {
                closeHamburgerMenu();
            }
        })
    } else {
        mediaQueryList.addEventListener('change', () => {
            if (smallMediaQuery.matches) {
                closeHamburgerMenu();
            };
        });
    };

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
            });

            // Pass currPlanet as a class to planet image to apply sizing properties
            planetImage.classList.remove(prevPlanet);
            planetImage.classList.add(currPlanet);

            // UPDATE PLANET TITLE
            planetTitle.innerHTML = currPlanetData.name;

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
            };

            /////// REFACTOR (SEEMS SIMILAR TO SUBMENU LINK HANDLER) ////////
            // Select OVERVIEW sub-menu by default (if not selected)
            if (currSubMenuIndex !== 0) {
                // Unselect previously selected sub-menu
                subMenuMobileLinks[currSubMenuIndex].classList.remove('selected');
                subMenuTabletLinks[currSubMenuIndex].classList.remove('selected');
                // Select overview sub-menu
                subMenuMobileLinks[0].classList.add('selected');
                subMenuTabletLinks[0].classList.add('selected');
                currSubMenuIndex = 0;
            };

            planetImage.src = currPlanetData.images.planet;
            planetGeoImage.classList.add('hide');
            planetContent.innerHTML = currPlanetData.overview.content;
            planetContentSource.href = currPlanetData.overview.source;
            //////////////////////////////////////////////////////////////////
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

            if (link.classList.contains('overview-link')) {
                planetImage.src = currPlanetData.images.planet;
                planetGeoImage.classList.add('hide');
                planetContent.innerHTML = currPlanetData.overview.content;
                planetContentSource.href = currPlanetData.overview.source;
            } else if (link.classList.contains('structure-link')) {
                planetImage.src = currPlanetData.images.internal;
                planetGeoImage.classList.add('hide');
                planetContent.innerHTML = currPlanetData.structure.content;
                planetContentSource.href = currPlanetData.structure.source;
            } else {
                planetImage.src = currPlanetData.images.planet;
                planetGeoImage.src = currPlanetData.images.geology;
                planetGeoImage.classList.remove('hide');
                planetContent.innerHTML = currPlanetData.geology.content;
                planetContentSource.href = currPlanetData.geology.source;
            };
        });
    });
};

getData('./data.json').then(data => {
    init(data);
}).catch(err => {
    console.error(err);
});



