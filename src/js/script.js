const hamburgerButton = document.querySelector('.hamburger-button');
const hamburgerMenu = document.querySelector('.hamburger-menu');
const subMenuLinks = document.querySelectorAll('.sub-menu__link');

// Hamburger button event handler
hamburgerButton.addEventListener('click', () => {
    hamburgerButton.classList.add('disabled');
    hamburgerButton.classList.toggle('open');
    hamburgerMenu.classList.toggle('show');

    // Show menu
    if (hamburgerMenu.classList.contains('show')) {
        hamburgerMenu.classList = 'hamburger-menu collapsing';

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

// Sub-menu link event handler
// Can this be refactored?
subMenuLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
        const selectedLink = event.target;
        // Seems inefficient
        subMenuLinks.forEach((link) => {
            if (link !== selectedLink && link.classList.contains('selected')) {
                link.classList.remove('selected');
            }
        });
        selectedLink.classList.add('selected');
    });
});




