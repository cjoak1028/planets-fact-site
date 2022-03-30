const hamburgerButton = document.querySelector('.hamburger-button');
const hamburgerMenu = document.querySelector('.hamburger-menu');
const mobileSubMenuLinks = document.querySelectorAll('.sub-menu--mobile__link');
const tabletSubMenuLinks = document.querySelectorAll('.sub-menu--tablet__link');
const navLinks = document.querySelectorAll('.nav__link');


// Makes a group of elements selectable by giving selected class to clicked element
const makeSelectable = (elems) => {
    elems.forEach((elem) => {
        elem.addEventListener('click', (event) => {
            const selectedElem = event.target;
            // Seems inefficient
            elems.forEach((elem) => {
                if (elem !== selectedElem && elem.classList.contains('selected')) {
                    elem.classList.remove('selected');
                }
            });
            selectedElem.classList.add('selected');
        });
    });
}

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

// Makes mobile sub-menu selectable
makeSelectable(mobileSubMenuLinks);

// Makes tablet sub-menu selectable
makeSelectable(tabletSubMenuLinks);

// Makes nav-links selectable
makeSelectable(navLinks);




