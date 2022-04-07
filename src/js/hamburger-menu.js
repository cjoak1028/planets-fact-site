export const openHamburgerMenu = (hamburgerButton, hamburgerMenu) => {
    hamburgerButton.classList.add('disabled');
    hamburgerMenu.classList = 'hamburger-menu collapsing';

    // Make body unscrollable
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

export const closeHamburgerMenu = (hamburgerButton, hamburgerMenu) => {
    hamburgerButton.classList.add('disabled');
    hamburgerMenu.classList = 'hamburger-menu collapsing';

    // Make body scrollable
    document.body.classList.remove('overflow-hidden');

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