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
const mercuryLink = navLinks[0];

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
    }
}

// Render planet image
const renderPlanetImg = planetData => {

}

// Render planet stats
const renderPlanetStats = planetData => {
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

let currentPlanetData;

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
            renderPlanetTitle(mercuryData);
            renderPlanetStats(mercuryData);
            renderPlanetContent('overview', mercuryData);
            currentPlanetData = mercuryData;
        } else if (targetLink.classList.contains('nav__link--venus')) {
            renderPlanetTitle(venusData);
            renderPlanetStats(venusData);
            renderPlanetContent('overview', venusData);
            currentPlanetData = venusData;
        } else if (targetLink.classList.contains('nav__link--earth')) {
            renderPlanetTitle(earthData);
            renderPlanetStats(earthData);
            renderPlanetContent('overview', earthData);
            currentPlanetData = earthData;
        } else if (targetLink.classList.contains('nav__link--mars')) {
            renderPlanetTitle(marsData);
            renderPlanetStats(marsData);
            renderPlanetContent('overview', marsData);
            currentPlanetData = marsData;
        } else if (targetLink.classList.contains('nav__link--jupiter')) {
            renderPlanetTitle(jupiterData);
            renderPlanetStats(jupiterData);
            renderPlanetContent('overview', jupiterData);
            currentPlanetData = jupiterData;
        } else if (targetLink.classList.contains('nav__link--saturn')) {
            renderPlanetTitle(saturnData);
            renderPlanetStats(saturnData);
            renderPlanetContent('overview', saturnData);
            currentPlanetData = saturnData;
        } else if (targetLink.classList.contains('nav__link--uranus')) {
            renderPlanetTitle(uranusData);
            renderPlanetStats(uranusData);
            renderPlanetContent('overview', uranusData);
            currentPlanetData = uranusData;
        } else {
            renderPlanetTitle(neptuneData);
            renderPlanetStats(neptuneData);
            renderPlanetContent('overview', neptuneData);
            currentPlanetData = neptuneData;
        };
    });
});

tabletSubMenuLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        const targetLink = event.target;

        // Select clicked sub-menu link
        selectLink(tabletSubMenuLinks, targetLink);

        // Render proper content info
        (targetLink === tabletOverviewLink) && renderPlanetContent('overview', currentPlanetData);
        (targetLink === tabletStructureLink) && renderPlanetContent('structure', currentPlanetData);
        (targetLink === tabletSurfaceLink) && renderPlanetContent('geology', currentPlanetData);
    })
})

const init = () => {
    // Render Mercury data by default
    selectLink(navLinks, mercuryLink);
    selectLink(tabletSubMenuLinks, tabletOverviewLink);
    selectLink(mobileSubMenuLinks, mobileOverviewLink);
    currentPlanetData = mercuryData;
    renderPlanetTitle(mercuryData);
    renderPlanetStats(mercuryData);
    renderPlanetContent('overview', mercuryData);
}

init();




