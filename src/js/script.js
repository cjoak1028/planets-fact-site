const hamburgerButton = document.querySelector('.hamburger-button');
const hamburgerMenu = document.querySelector('.hamburger-menu');

hamburgerButton.addEventListener('click', () => {
    hamburgerButton.classList.toggle('clicked');
    hamburgerMenu.classList.toggle('hidden');
})