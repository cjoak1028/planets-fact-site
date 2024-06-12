# Planets Fact Site

A web application that showcases all planets of our solar system.

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
- [Acknowledgments](#acknowledgments)

## Overview

### Screenshot

![mobile gif](./screenshots/planet-facts-site-mobile.gif)
![tablet gif](./screenshots/planet-facts-site-tablet.gif)
![desktop gif](./screenshots/planet-facts-site-desktop.gif)

### Links

- Live Site URL: Live Site[https://planets-fact-site-sand.vercel.app/]

## My process

### Built with

- Semantic HTML5 markup
- SASS/SCSS
- Flexbox
- JavaScript ES6
- Mobile-first workflow

### What I learned

#### Hamburger Button + Menu

For the first time, I implemented my own set of hamburger button and menu without using a third-party framework.

With reference to [Jesse Couch's Codepen on Hamburger Icon Animations](https://codepen.io/designcouch/pen/ExvwPY), I was able to build a hamburger button that transitioned into a 'X' button upon clicking.

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

Then, I wanted the hamburger menu to have a smooth collapsing animation, so I decided to reverse-engineer Bootstrap's ['Collapse JavaScript Plugin'](https://getbootstrap.com/docs/4.3/components/collapse/#collapsehide) and ended up with the following:

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
  hamburgerMenu.classList.contains("show")
    ? openHamburgerMenu()
    : closeHamburgerMenu();
});
```

#### Media Queries in JS

I wanted the hamburger menu to automatically close when viewport size hit a larger breakpoint while it was open. I figured I needed a way to use media queries within JavaScript so that I could call the closeHamburgerMenu() method. While doing some research, I came across the MediaQueryList interface and its methods and properties.

First, I had to create the MediaQueryList object representing the query:

```js
const mediaQueryList = window.matchMedia("screen and (min-width: 47.9em)");
```

Then, I had to call the addEventListener() method on the MediaQueryList object, with a callback function that was invoked whenever the media query status changed.

Finally, using the matches property, I could call the closeHamburgerMenu() method whenever the hamburger menu was open and viewport width was above 47.9em.

This resulted in the following:

```js
// If browser is Safari
if (isSafari) {
  mediaQueryList.addListener((e) => {
    if (e.matches) {
      closeHamburgerMenu();
    }
  });
} else {
  console.log("hello!");
  mediaQueryList.addEventListener("change", () => {
    if (hamburgerMenu.classList.contains("show") && mediaQueryList.matches) {
      closeHamburgerMenu();
    }
  });
}
```

### Continued development

To further enhance my skills in building a more seamless website, I would like to apply more CSS animations and maybe use a third-party library that will provide me with more options.

### Useful resources

- [Mixin to Manage Breakpoints](https://css-tricks.com/snippets/sass/mixin-manage-breakpoints/) - This helped me configure and manage my breakpoints.
- [Testing Media Queries Programatically](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Testing_media_queries) - This helped me build my own media query tester.

## Acknowledgments

Shoutout to [Jesse Couch](https://codepen.io/designcouch) for his awesome codepen profile and hamburger menu button animations!
