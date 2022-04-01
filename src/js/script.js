const hamburgerButton = document.querySelector('.hamburger-button');
const hamburgerMenu = document.querySelector('.hamburger-menu');

const mobileSubMenuLinks = document.querySelectorAll('.sub-menu--mobile__link');
const mobileOverviewLink = mobileSubMenuLinks[0];
const mobileStructureLink = mobileSubMenuLinks[1];
const mobileSurfaceLink = mobileSubMenuLinks[2];

const tabletSubMenuLinks = document.querySelectorAll('.sub-menu--tablet__link');
const tabletOverviewLink = tabletSubMenuLinks[0];
const tabletStructureLink = tabletSubMenuLinks[1];
const tabletSurfaceLink = tabletSubMenuLinks[2];

const navLinks = document.querySelectorAll('.nav__link');

const planetTitle = document.querySelector('.planet__title');
const planetContent = document.querySelector('.planet__content');
const planetRot = document.querySelector('.stat__rotation');
const planetRev = document.querySelector('.stat__revolution');
const planetRad = document.querySelector('.stat__radius');
const planetTemp = document.querySelector('.stat__temp');

const planetData = require('../../data.json');
const mercuryData = planetData[0];
const venusData = planetData[1];
const earthData = planetData[2];
const marsData = planetData[3];
const jupiterData = planetData[4];
const saturnData = planetData[5];
const uranusData = planetData[6];
const neptuneData = planetData[7];

// HELPER FUNCTIONS
// To check whether element is selected or not
const isSelected = (elem) => {
    return elem.classList.contains('selected');
};

// Selects targetLink by adding selected class to targetLink 
// and removing selected class from any other links
const selectLink = (links, targetLink) => {
    links.forEach(link => {
        link !== targetLink && isSelected(link) && link.classList.remove('selected');
    });
    targetLink.classList.add('selected');
};

// Renders planet data
const renderPlanetData = planetData => {
    planetTitle.innerHTML = planetData.name;
    planetRot.innerHTML = planetData.rotation;
    planetRev.innerHTML = planetData.revolution;
    planetRad.innerHTML = planetData.radius;
    planetTemp.innerHTML = planetData.temperature;
}

// Hamburger button event handler
hamburgerButton.addEventListener('click', () => {
    hamburgerButton.classList.add('disabled');
    hamburgerButton.classList.toggle('open');
    hamburgerMenu.classList.toggle('show');

    // Show menu
    if (hamburgerMenu.classList.contains('show')) {
        hamburgerMenu.classList = 'hamburger-menu collapsing';

        // Make body unscrollable
        document.body.classList.add('hamburger-menu-open');


        setTimeout(() => {
            hamburgerMenu.style.height = 'calc(100% - 6.8rem)'; //6.8rem is header height
            hamburgerMenu.style.opacity = '100%';
        }, 1);

        setTimeout(() => {
            hamburgerMenu.classList = 'hamburger-menu collapse show';
            hamburgerButton.classList.remove('disabled');
        }, 500);
    }
    // Close menu
    else {
        hamburgerMenu.classList = 'hamburger-menu collapsing';

        // Make body scrollable
        document.body.classList.remove('hamburger-menu-open');

        setTimeout(() => {
            hamburgerMenu.style.height = '0';
            hamburgerMenu.style.opacity = '0';
        }, 1)

        setTimeout(() => {
            hamburgerMenu.classList = 'hamburger-menu collapse';
            hamburgerMenu.style.height = '';
            hamburgerMenu.style.opacity = '';
            hamburgerButton.classList.remove('disabled');
        }, 500);
    };
});

// Navigation link event handler
navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
        const targetLink = event.target;

        // Select target link (planet)
        selectLink(navLinks, targetLink);

        // Overview sub-menu (for all views) link is selected by default
        selectLink(mobileSubMenuLinks, mobileOverviewLink);
        selectLink(tabletSubMenuLinks, tabletOverviewLink);

        // Render planet data
        if (targetLink.classList.contains('nav__link--mercury')) {
            renderPlanetData(mercuryData);
        } else if (targetLink.classList.contains('nav__link--venus')) {
            renderPlanetData(venusData);
        } else if (targetLink.classList.contains('nav__link--earth')) {
            renderPlanetData(earthData);
        } else if (targetLink.classList.contains('nav__link--mars')) {
            renderPlanetData(marsData);
        } else if (targetLink.classList.contains('nav__link--jupiter')) {
            renderPlanetData(jupiterData);
        } else if (targetLink.classList.contains('nav__link--saturn')) {
            renderPlanetData(saturnData);
        } else if (targetLink.classList.contains('nav__link--uranus')) {
            renderPlanetData(uranusData);
        } else {
            renderPlanetData(neptuneData);
        };
    });
});




