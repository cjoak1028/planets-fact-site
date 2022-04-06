const hamburgerButton = document.querySelector('.hamburger-button');
const hamburgerMenu = document.querySelector('.hamburger-menu');
const hamburgerLinks = document.querySelectorAll('.hamburger-menu__link');

const mobileSubMenuLinks = document.querySelectorAll('.sub-menu--mobile__link');
const mobileOverviewLink = mobileSubMenuLinks[0];

const tabletSubMenuLinks = document.querySelectorAll('.sub-menu--tablet__link');
const tabletOverviewLink = tabletSubMenuLinks[0];

const overviewLinks = document.querySelectorAll('.overview-link');
const structureLinks = document.querySelectorAll('.structure-link');
const surfaceLinks = document.querySelectorAll('.surface-link');

const navLinks = document.querySelectorAll('.nav__link');

const planetImg = document.getElementById('planet__img');
const planetGeoImg = document.getElementById('planet__geo-img');

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

// Unselect selected link by removing 'selected' class
const removeSelectedLink = (links) => {
    links.forEach(link => {
        isSelected(link) && link.classList.remove('selected');
    });
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
        renderPlanetImg(planetData);
    } else if (contentType === 'structure') {
        planetContent.innerHTML = planetData.structure.content;
        planetContentSource.setAttribute("href", planetData.structure.source);
        renderPlanetInternalImg(planetData);
    } else if (contentType === 'geology') {
        planetContent.innerHTML = planetData.geology.content;
        planetContentSource.setAttribute("href", planetData.geology.source);
        renderPlanetImg(planetData);
        renderPlanetGeologyImg(planetData);
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
    // Add hide class to geo image just in case it's shown
    planetGeoImg.classList = 'planet__geo-img hide';
};

// Render planet internal image
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
    // Add hide class to geo image just in case it's shown
    planetGeoImg.classList = 'planet__geo-img hide';
};

// Render planet geology image
const renderPlanetGeologyImg = (planetData) => {
    let imgSrc;
    const planetName = planetData.name.toLowerCase();

    switch (planetName) {
        case 'mercury':
            imgSrc = mercuryGeologyImg;
            break;
        case 'venus':
            imgSrc = venusGeologyImg;
            break;
        case 'earth':
            imgSrc = earthGeologyImg;
            break
        case 'mars':
            imgSrc = marsGeologyImg;
            break
        case 'jupiter':
            imgSrc = jupiterGeologyImg;
            break
        case 'saturn':
            imgSrc = saturnGeologyImg;
            break
        case 'uranus':
            imgSrc = uranusGeologyImg;
            break
        case 'neptune':
            imgSrc = neptuneGeologyImg;
    }

    // Set new attribute properties to planet image
    planetGeoImg.src = imgSrc;
    planetGeoImg.alt = planetName + ' geology';
    // Remove hide class to show image
    planetGeoImg.classList.remove('hide');
}

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
        // RENDER PLANET DATA
        if (link.id === 'mercury-link') {
            renderPlanetData(mercuryData);
            mobileSubMenuLinks.forEach((link) => {
                link.classList = 'sub-menu--mobile__link mercury';
            });
            tabletSubMenuLinks.forEach((link) => {
                link.classList = 'sub-menu--tablet__link mercury';
            });
            selectLink(navLinks, navLinks[0]);
        } else if (link.id === 'venus-link') {
            renderPlanetData(venusData);
            mobileSubMenuLinks.forEach((link) => {
                link.classList = 'sub-menu--mobile__link venus';
            });
            tabletSubMenuLinks.forEach((link) => {
                link.classList = 'sub-menu--tablet__link venus';
            });
            selectLink(navLinks, navLinks[1]);
        } else if (link.id === 'earth-link') {
            renderPlanetData(earthData);
            mobileSubMenuLinks.forEach((link) => {
                link.classList = 'sub-menu--mobile__link earth';
            });
            tabletSubMenuLinks.forEach((link) => {
                link.classList = 'sub-menu--tablet__link earth';
            });
            selectLink(navLinks, navLinks[2]);
        } else if (link.id === 'mars-link') {
            renderPlanetData(marsData);
            mobileSubMenuLinks.forEach((link) => {
                link.classList = 'sub-menu--mobile__link mars';
            });
            tabletSubMenuLinks.forEach((link) => {
                link.classList = 'sub-menu--tablet__link mars';
            });
            selectLink(navLinks, navLinks[3]);
        } else if (link.id === 'jupiter-link') {
            renderPlanetData(jupiterData);
            mobileSubMenuLinks.forEach((link) => {
                link.classList = 'sub-menu--mobile__link jupiter';
            });
            tabletSubMenuLinks.forEach((link) => {
                link.classList = 'sub-menu--tablet__link jupiter';
            });
            selectLink(navLinks, navLinks[4]);
        } else if (link.id === 'saturn-link') {
            renderPlanetData(saturnData);
            mobileSubMenuLinks.forEach((link) => {
                link.classList = 'sub-menu--mobile__link saturn';
            });
            tabletSubMenuLinks.forEach((link) => {
                link.classList = 'sub-menu--tablet__link saturn';
            });
            selectLink(navLinks, navLinks[5]);
        } else if (link.id === 'uranus-link') {
            renderPlanetData(uranusData);
            mobileSubMenuLinks.forEach((link) => {
                link.classList = 'sub-menu--mobile__link uranus';
            });
            tabletSubMenuLinks.forEach((link) => {
                link.classList = 'sub-menu--tablet__link uranus';
            });
            selectLink(navLinks, navLinks[6]);
        } else {
            renderPlanetData(neptuneData);
            mobileSubMenuLinks.forEach((link) => {
                link.classList = 'sub-menu--mobile__link neptune';
            });
            tabletSubMenuLinks.forEach((link) => {
                link.classList = 'sub-menu--tablet__link neptune';
            });
            selectLink(navLinks, navLinks[7]);
        };

        // Overview sub-menu (for all views) link is selected by default
        selectLink(mobileSubMenuLinks, mobileOverviewLink);
        selectLink(tabletSubMenuLinks, tabletOverviewLink);

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

        // Render planet data REFACTOR
        if (link.id === 'mercury-link') {
            renderPlanetData(mercuryData);
            mobileSubMenuLinks.forEach((link) => {
                link.classList = 'sub-menu--mobile__link mercury';
            });
            tabletSubMenuLinks.forEach((link) => {
                link.classList = 'sub-menu--tablet__link mercury';
            });
        } else if (link.id === 'venus-link') {
            renderPlanetData(venusData);
            mobileSubMenuLinks.forEach((link) => {
                link.classList = 'sub-menu--mobile__link venus';
            });
            tabletSubMenuLinks.forEach((link) => {
                link.classList = 'sub-menu--tablet__link venus';
            });
        } else if (link.id === 'earth-link') {
            renderPlanetData(earthData);
            mobileSubMenuLinks.forEach((link) => {
                link.classList = 'sub-menu--mobile__link earth';
            });
            tabletSubMenuLinks.forEach((link) => {
                link.classList = 'sub-menu--tablet__link earth';
            });
        } else if (link.id === 'mars-link') {
            renderPlanetData(marsData);
            mobileSubMenuLinks.forEach((link) => {
                link.classList = 'sub-menu--mobile__link mars';
            });
            tabletSubMenuLinks.forEach((link) => {
                link.classList = 'sub-menu--tablet__link mars';
            });
        } else if (link.id === 'jupiter-link') {
            renderPlanetData(jupiterData);
            mobileSubMenuLinks.forEach((link) => {
                link.classList = 'sub-menu--mobile__link jupiter';
            });
            tabletSubMenuLinks.forEach((link) => {
                link.classList = 'sub-menu--tablet__link jupiter';
            });
        } else if (link.id === 'saturn-link') {
            renderPlanetData(saturnData);
            mobileSubMenuLinks.forEach((link) => {
                link.classList = 'sub-menu--mobile__link saturn';
            });
            tabletSubMenuLinks.forEach((link) => {
                link.classList = 'sub-menu--tablet__link saturn';
            });
        } else if (link.id === 'uranus-link') {
            renderPlanetData(uranusData);
            mobileSubMenuLinks.forEach((link) => {
                link.classList = 'sub-menu--mobile__link uranus';
            });
            tabletSubMenuLinks.forEach((link) => {
                link.classList = 'sub-menu--tablet__link uranus';
            });
        } else {
            renderPlanetData(neptuneData);
            mobileSubMenuLinks.forEach((link) => {
                link.classList = 'sub-menu--mobile__link neptune';
            });
            tabletSubMenuLinks.forEach((link) => {
                link.classList = 'sub-menu--tablet__link neptune';
            });
        };

        // Overview sub-menu (for all views) link is selected by default
        selectLink(mobileSubMenuLinks, mobileOverviewLink);
        selectLink(tabletSubMenuLinks, tabletOverviewLink);
    });
});

// Mobile sub-menu link handler
mobileSubMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        selectLink(mobileSubMenuLinks, link);

        if (link.id === 'mobile-overview-link') {
            selectLink(tabletSubMenuLinks, tabletSubMenuLinks[0]);
            renderPlanetContent('overview', currentPlanetData);
        } else if (link.id === 'mobile-structure-link') {
            selectLink(tabletSubMenuLinks, tabletSubMenuLinks[1]);
            renderPlanetContent('structure', currentPlanetData);
        } else {
            selectLink(tabletSubMenuLinks, tabletSubMenuLinks[2]);
            renderPlanetContent('geology', currentPlanetData);
        }
    });
});

// Tablet sub-menu link handler
tabletSubMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        selectLink(tabletSubMenuLinks, link);

        if (link.id === 'tablet-overview-link') {
            selectLink(mobileSubMenuLinks, mobileSubMenuLinks[0]);
            renderPlanetContent('overview', currentPlanetData);
        } else if (link.id === 'tablet-structure-link') {
            selectLink(mobileSubMenuLinks, mobileSubMenuLinks[1]);
            renderPlanetContent('structure', currentPlanetData);
        } else {
            selectLink(mobileSubMenuLinks, mobileSubMenuLinks[2]);
            renderPlanetContent('geology', currentPlanetData);
        }
    });
});

// matchMedia mediaQuery
// Removes hamburger menu when screen size goes above small screen size
let x = window.matchMedia("(min-width: 47.9em)");
x.addEventListener('change', () => {
    if (x.matches) {
        console.log('hello');
        hamburgerMenu.classList.remove('show');
        hamburgerButton.classList.remove('open');
    }
})


// Function runs when reloaded
const init = () => {
    // Render Mercury data by default
    renderPlanetData(mercuryData);

};

init();




