const hamburgerButton = document.querySelector('.hamburger-button');
const hamburgerMenu = document.querySelector('.hamburger-menu');
const hamburgerLinks = document.querySelectorAll('.hamburger-menu__link');

const mobileSubMenuLinks = document.querySelectorAll('.sub-menu--mobile__link');
const mobileOverviewLink = mobileSubMenuLinks[0];

const tabletSubMenuLinks = document.querySelectorAll('.sub-menu--tablet__link');
const tabletOverviewLink = tabletSubMenuLinks[0];

const navLinks = document.querySelectorAll('.nav__link');

const planetImg = document.getElementById('planet__img');

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

// const planets = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];

// require does not run on the browser so it is compiled and thus cannot take a runtime variable
const mercuryPlanetImg = require('../assets/planet-mercury.svg');
const mercuryInternalImg = require('../assets/planet-mercury-internal.svg');
const mercuryGeologyImg = require('../assets/geology-mercury.png');

const venusPlanetImg = require('../assets/planet-venus.svg');
const venusInternalImg = require('../assets/planet-venus-internal.svg');
const venusGeologyImg = require('../assets/geology-venus.png');

const earthPlanetImg = require('../assets/planet-earth.svg');
const earthInternalImg = require('../assets/planet-earth-internal.svg');
const earthGeologyImg = require('../assets/geology-earth.png');

const marsPlanetImg = require('../assets/planet-mars.svg');
const marsInternalImg = require('../assets/planet-mars-internal.svg');
const marsGeologyImg = require('../assets/geology-mars.png');

const jupiterPlanetImg = require('../assets/planet-jupiter.svg');
const jupiterInternalImg = require('../assets/planet-jupiter-internal.svg');
const jupiterGeologyImg = require('../assets/geology-jupiter.png');

const saturnPlanetImg = require('../assets/planet-saturn.svg');
const saturnInternalImg = require('../assets/planet-saturn-internal.svg');
const saturnGeologyImg = require('../assets/geology-saturn.png');

const uranusPlanetImg = require('../assets/planet-uranus.svg');
const uranusInternalImg = require('../assets/planet-uranus-internal.svg');
const uranusGeologyImg = require('../assets/geology-uranus.png');

const neptunePlanetImg = require('../assets/planet-neptune.svg');
const neptuneInternalImg = require('../assets/planet-neptune-internal.svg');
const neptuneGeologyImg = require('../assets/geology-neptune.png');

// console.log(mercuryImg);

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
        (link !== targetLink && isSelected(link)) && link.classList.remove('selected');
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
        renderPlanetInternalImg(planetData);
    } else if (contentType === 'geology') {
        planetContent.innerHTML = planetData.geology.content;
        planetContentSource.setAttribute("href", planetData.geology.source);
    };
};

// Render planet image
const renderPlanetImg = (planetData) => {
    let imgSrc;
    const planetName = planetData.name.toLowerCase();

    switch (planetName) {
        case 'mercury':
            imgSrc = mercuryPlanetImg;
            break;
        case 'venus':
            imgSrc = venusPlanetImg;
            break;
        case 'earth':
            imgSrc = earthPlanetImg;
            break
        case 'mars':
            imgSrc = marsPlanetImg;
            break
        case 'jupiter':
            imgSrc = jupiterPlanetImg;
            break
        case 'saturn':
            imgSrc = saturnPlanetImg;
            break
        case 'uranus':
            imgSrc = uranusPlanetImg;
            break
        case 'neptune':
            imgSrc = neptunePlanetImg;
    }

    // Set new attribute properties to planet image
    planetImg.src = imgSrc;
    planetImg.alt = planetName;
    // Add planet class for resizing
    planetImg.classList = `planet__img ${planetName}`;
};

// Render planet image
const renderPlanetInternalImg = (planetData) => {
    let imgSrc;
    const planetName = planetData.name.toLowerCase();

    switch (planetName) {
        case 'mercury':
            imgSrc = mercuryInternalImg;
            break;
        case 'venus':
            imgSrc = venusInternalImg;
            break;
        case 'earth':
            imgSrc = earthInternalImg;
            break
        case 'mars':
            imgSrc = marsInternalImg;
            break
        case 'jupiter':
            imgSrc = jupiterInternalImg;
            break
        case 'saturn':
            imgSrc = saturnInternalImg;
            break
        case 'uranus':
            imgSrc = uranusInternalImg;
            break
        case 'neptune':
            imgSrc = neptuneInternalImg;
    }

    // Set new attribute properties to planet image
    planetImg.src = imgSrc;
    planetImg.alt = planetName + ' internal';
    // Add planet class for resizing
    planetImg.classList = `planet__img ${planetName}`;
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
    renderPlanetImg(planetData);
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




