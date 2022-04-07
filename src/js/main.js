const hamburgerButton = document.querySelector('.hamburger-button');
const hamburgerMenu = document.querySelector('.hamburger-menu');
// const hamburgerMenuLinks = document.querySelectorAll('.hamburger-menu__link');

import { openHamburgerMenu, closeHamburgerMenu } from './hamburger-menu';

hamburgerButton.addEventListener('click', () => {
    hamburgerButton.classList.toggle('open');
    hamburgerMenu.classList.toggle('show');
    hamburgerMenu.classList.contains('show') ? openHamburgerMenu(hamburgerButton, hamburgerMenu) : closeHamburgerMenu(hamburgerButton, hamburgerMenu);
});