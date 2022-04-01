const hamburgerButton = document.querySelector('.hamburger-button');
const hamburgerMenu = document.querySelector('.hamburger-menu');
const hamburgerLinks = document.querySelectorAll('.hamburger-menu__link');

const mobileSubMenuLinks = document.querySelectorAll('.sub-menu--mobile__link');
const mobileOverviewLink = mobileSubMenuLinks[0];

const tabletSubMenuLinks = document.querySelectorAll('.sub-menu--tablet__link');
const tabletOverviewLink = tabletSubMenuLinks[0];

const navLinks = document.querySelectorAll('.nav__link');

const planetTitle = document.querySelector('.planet__title');
const planetContent = document.querySelector('.planet__content');
const planetContentSource = document.querySelector('.content-source__link');
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

let currentPlanetData = mercuryData;

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

// Render planet title
const renderPlanetTitle = planetData => {
    planetTitle.innerHTML = planetData.name;
};

// Render planet content
const renderPlanetContent = (contentType, planetData) => {
    if (contentType === 'overview') {
        planetContent.innerHTML = planetData.overview.content;
        planetContentSource.setAttribute("href", planetData.overview.source);
    } else if (contentType === 'structure') {
        planetContent.innerHTML = planetData.structure.content;
        planetContentSource.setAttribute("href", planetData.structure.source);
    } else if (contentType === 'geology') {
        planetContent.innerHTML = planetData.geology.content;
        planetContentSource.setAttribute("href", planetData.geology.source);
    };
};

// Render planet image
const renderPlanetImg = planetData => {

};

// Render planet stats
const renderPlanetStats = planetData => {
    planetRot.innerHTML = planetData.rotation;
    planetRev.innerHTML = planetData.revolution;
    planetRad.innerHTML = planetData.radius;
    planetTemp.innerHTML = planetData.temperature;
};

// Render planet data
const renderPlanetData = (planetData) => {
    renderPlanetTitle(planetData);
    renderPlanetStats(planetData);
    renderPlanetContent('overview', planetData);
    currentPlanetData = planetData;
};

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

hamburgerLinks.forEach((link) => {
    link.addEventListener('click', () => {
        // Overview sub-menu (for all views) link is selected by default
        selectLink(mobileSubMenuLinks, mobileOverviewLink);
        selectLink(tabletSubMenuLinks, tabletOverviewLink);

        // RENDER PLANET DATA
        if (link.id === 'mercury-link') {
            renderPlanetData(mercuryData);
        } else if (link.id === 'venus-link') {
            renderPlanetData(venusData);
        } else if (link.id === 'earth-link') {
            renderPlanetData(earthData);
        } else if (link.id === 'mars-link') {
            renderPlanetData(marsData);
        } else if (link.id === 'jupiter-link') {
            renderPlanetData(jupiterData);
        } else if (link.id === 'saturn-link') {
            renderPlanetData(saturnData);
        } else if (link.id === 'uranus-link') {
            renderPlanetData(uranusData);
        } else {
            renderPlanetData(neptuneData);
        };

        // CLOSE HAMBURGER MENU;
        hamburgerButton.classList.toggle('open');

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
    });
});

// Navigation link event handler
navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        // Select target link (planet)
        selectLink(navLinks, link);

        // Overview sub-menu (for all views) link is selected by default
        selectLink(mobileSubMenuLinks, mobileOverviewLink);
        selectLink(tabletSubMenuLinks, tabletOverviewLink);

        // Render planet data REFACTOR
        if (link.id === 'mercury-link') {
            renderPlanetData(mercuryData);
        } else if (link.id === 'venus-link') {
            renderPlanetData(venusData);
        } else if (link.id === 'earth-link') {
            renderPlanetData(earthData);
        } else if (link.id === 'mars-link') {
            renderPlanetData(marsData);
        } else if (link.id === 'jupiter-link') {
            renderPlanetData(jupiterData);
        } else if (link.id === 'saturn-link') {
            renderPlanetData(saturnData);
        } else if (link.id === 'uranus-link') {
            renderPlanetData(uranusData);
        } else {
            renderPlanetData(neptuneData);
        };
    });
});

// Mobile sub-menu link handler
mobileSubMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        selectLink(mobileSubMenuLinks, link);

        // Render proper content info
        (link.id === 'overview-link') && renderPlanetContent('overview', currentPlanetData);
        (link.id === 'structure-link') && renderPlanetContent('structure', currentPlanetData);
        (link.id === 'surface-link') && renderPlanetContent('geology', currentPlanetData);
    });
});

// Tablet sub-menu link handler
tabletSubMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        selectLink(tabletSubMenuLinks, link);

        // Render proper content info
        (link.id === 'overview-link') && renderPlanetContent('overview', currentPlanetData);
        (link.id === 'structure-link') && renderPlanetContent('structure', currentPlanetData);
        (link.id === 'surface-link') && renderPlanetContent('geology', currentPlanetData);
    });
});

// Function runs when reloaded
const init = () => {
    // Render Mercury data by default
    renderPlanetData(mercuryData);
};

init();




