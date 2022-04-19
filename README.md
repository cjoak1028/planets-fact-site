# Frontend Mentor - Planets Fact Site

This is a solution to the [Planets fact site challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/planets-fact-site-gazqN8w_f). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- View each planet page and toggle between "Overview", "Internal Structure", and "Surface Geology"

### Screenshot

![mobile gif](./screenshots/planet-facts-site-mobile.gif)
![tablet gif](./screenshots/planet-facts-site-tablet.gif)
![desktop gif](./screenshots/planet-facts-site-desktop.gif)

### Links

- Solution URL: [LINK](https://github.com/cjoak1028/planets-fact-site)
- Live Site URL: [LINK](https://planets-fact-site-sand.vercel.app/)

## My process

### Built with

- Semantic HTML5 markup
- SASS/SCSS
- Flexbox
- Mobile-first workflow

### What I learned

#### Hamburger Button + Menu

For the first time, I implemented my own set of hamburger button and menu without using a third-party framework.

With reference to Jesse Couch's Codepen on Hamburger Icon Animations [https://codepen.io/designcouch/pen/ExvwPY], I was able to build a hamburger button that transitioned into a 'X' button upon clicking.

```html
<div class="hamburger-button">
  <span></span>
  <span></span>
  <span></span>
</div>
```

```scss
.hamburger-button {
  position: relative;
  width: 2.4rem;
  height: 2.4rem;
  transition: opacity 0.2s linear;
  cursor: pointer;

  @include respond-above("small") {
    display: none;
  }

  span {
    position: absolute;
    left: 0;
    height: 3px;
    width: 100%;
    background-color: $c-white;
    border-radius: 15%;

    transition: 0.25s ease-in-out;
  }

  span:nth-child(1) {
    top: 3.5px;
    transform-origin: left bottom;
  }

  span:nth-child(2) {
    top: calc(50% - 1.5px);
  }

  span:nth-child(3) {
    top: calc(2.4rem - 6.5px);
    transform-origin: left top;
  }

  &.open {
    opacity: 25%;

    span:nth-child(1) {
      transform: rotate(45deg);
      top: 2px;
      left: 2px;
    }

    span:nth-child(2) {
      width: 0%;
      opacity: 0;
    }

    span:nth-child(3) {
      transform: rotate(-45deg);
      top: 19px;
      left: 2px;
    }
  }
  ...
}
```

```js
const hamburgerButton = document.querySelector(".hamburger-button");

const openHamburgerMenu = () => {
  // Hamburger button transitions to 'X' button
  hamburgerButton.classList.add('open');
  ...
};

const closeHamburgerMenu = () => {
  // 'X' button transitions back to hamburger button
  hamburgerButton.classList.remove('open');
  ...
};
```

Then I wanted the hamburger menu to have a smooth collapsing animation, so I decided to reverse-engineer Bootstrap's 'Collapse JS Plugin' [https://getbootstrap.com/docs/4.3/components/collapse/#collapsehide] and ended up with the following:

```html
<nav class="hamburger-menu collapse">...</nav>
```

```scss
.hamburger-menu {
  &.collapse {
    &:not(.show) {
      display: none;
    }
  }

  &.collapsing {
    opacity: 0;
    height: 0;
  }
}
```

```js
const openHamburgerMenu = () => {
  hamburgerButton.classList.add("open");
  // Prevent body from scrolling when hamburger button is open
  document.body.classList.add("overflow-hidden");

  // Set menu height and opacity to 0
  hamburgerMenu.classList = "hamburger-menu collapsing";

  setTimeout(() => {
    // Set new height and opacity for transition (show menu)
    hamburgerMenu.style.height = `calc(100% - 6.8rem)`; //6.8rem is height of header
    hamburgerMenu.style.opacity = "100%";
  }, 1);

  setTimeout(() => {
    // Show menu once transition is finished
    hamburgerMenu.classList = "hamburger-menu collapse show";
    // Re-activate hamburger button
    hamburgerButton.classList.remove("disabled");
  }, 500);
};

const closeHamburgerMenu = () => {
  hamburgerButton.classList.remove("open");
  document.body.classList.remove("overflow-hidden");

  // This doesn't do much here
  hamburgerMenu.classList = "hamburger-menu collapsing";

  // 
  setTimeout(() => {
    // Set new height and opacity for transition (close menu)
    hamburgerMenu.style.height = "0";
    hamburgerMenu.style.opacity = "0";
  }, 1);

  setTimeout(() => {
    // Hide menu once transition is finished
    hamburgerMenu.classList = "hamburger-menu collapse";
    hamburgerMenu.removeAttribute("style");
    hamburgerButton.classList.remove("disabled");
  }, 500);
};

// Handle click event for hamburger button
hamburgerButton.addEventListener("click", () => {
  hamburgerMenu.classList.toggle("show");
  // Disable button during transition
  hamburgerButton.classList.add("disabled");
  hamburgerMenu.classList.contains("show") ? openHamburgerMenu() : closeHamburgerMenu();
});
```

#### MediaQueryList



### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect.

### Useful resources

- [Example resource 1](https://www.example.com) - This helped me for XYZ reason. I really liked this pattern and will use it going forward.
- [Example resource 2](https://www.example.com) - This is an amazing article which helped me finally understand XYZ. I'd recommend it to anyone still learning this concept.

<!-- ## Author

- Website - [Add your name here](https://www.your-site.com)
- Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/yourusername)
- Twitter - [@yourusername](https://www.twitter.com/yourusername)

**Note: Delete this note and add/remove/edit lines above based on what links you'd like to share.** -->

## Acknowledgments

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit.
