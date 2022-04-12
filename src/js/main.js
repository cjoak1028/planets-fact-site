const hamburgerButton = document.querySelector('.hamburger-button');
const hamburgerMenu = document.querySelector('.hamburger-menu');
const planetLinks = document.querySelectorAll('.planet-link');

const openHamburgerMenu = () => {
    hamburgerMenu.classList = 'hamburger-menu collapsing';
    // Prevent body from scrolling when hamburger button is open
    document.body.classList.add('overflow-hidden');

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
    hamburgerMenu.classList = 'hamburger-menu collapsing';
    document.body.classList.remove('overflow-hidden');

    setTimeout(() => {
        hamburgerMenu.style.height = '0';
        hamburgerMenu.style.opacity = '0';
    }, 1);

    setTimeout(() => {
        hamburgerMenu.classList = 'hamburger-menu collapse';
        hamburgerMenu.style.height = '';
        hamburgerMenu.style.opacity = '';
        hamburgerButton.classList.remove('disabled');
    }, 500);
};

hamburgerButton.addEventListener('click', () => {
    hamburgerMenu.classList.toggle('show');
    hamburgerButton.classList.toggle('open');
    hamburgerButton.classList.add('disabled');
    hamburgerMenu.classList.contains('show') ? openHamburgerMenu() : closeHamburgerMenu();
});

planetLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Navigation menu planet link for tablet+ view 
        if (link.classList.contains('nav__link')) {
            console.log('NAV PLANET LINK CLICKED!');
        }
        // Hamburger menu planet link for mobile view
        else {
            console.log('HAMBURGER MENU PLANET LINK CLICKED!');
            closeHamburgerMenu()
        }
    });
});



