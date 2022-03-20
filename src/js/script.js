const hamburgerButton = document.querySelector('.hamburger-button');
const hamburgerMenu = document.querySelector('.hamburger-menu');

hamburgerButton.addEventListener('click', () => {
    hamburgerMenu.classList.toggle('show');

    // Show menu
    if (hamburgerMenu.classList.contains('show')) {
        hamburgerMenu.classList = 'hamburger-menu collapsing';

        setTimeout(() => {
            hamburgerMenu.style.height = 'calc(100% - 6.4rem)';
            hamburgerMenu.style.opacity = '100%';
        }, 1)

        setTimeout(() => {
            hamburgerMenu.classList = 'hamburger-menu collapse show';
            // hamburgerButton.disabled = false;
        }, 500)
    }
    // Close menu
    else {
        hamburgerButton.disabled = true;
        hamburgerMenu.classList = 'hamburger-menu collapsing';

        setTimeout(() => {
            hamburgerMenu.style.height = '0';
            hamburgerMenu.style.opacity = '0';
        }, 1)

        setTimeout(() => {
            hamburgerMenu.classList = 'hamburger-menu collapse';
            hamburgerMenu.style.height = '';
            hamburgerMenu.style.opacity = '';
            // hamburgerButton.disabled = false;
        }, 500);
    }
})