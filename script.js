'use strict';
const nav = document.querySelector('.nav');

// ---- Modal window
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
// ----
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
// ---- Cookie Message
const header = document.querySelector('.header');
const cookieMsg = document.createElement('div');
cookieMsg.classList.add('cookie-message');
cookieMsg.innerHTML = `Website is using cookies for User experience purposes. Personal information is not gathered.<button class="btn btn--close-cookie">Dismiss</button>`;
header.append(cookieMsg);
const cookieMsgClose = document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    cookieMsg.remove();
  });
const cookieMsgBgColorEL = document
  .querySelector('.cookie-message')
  .addEventListener('mouseover', function () {
    cookieMsg.style.background = 'white';
  });
const cookieMsgBgMouseOver = document
  .querySelector('.cookie-message')
  .addEventListener('mouseout', function () {
    cookieMsg.style.background = '#ffcd0331';
  });
// ----

// ---- smooth scroll
// const btnScrollTo = document.querySelector('.btn--scroll-to');
// const section1 = document.getElementById('section--1');
// const btnScrollToEL = btnScrollTo.addEventListener('click', function (e) {
//   const coords1 = section1.getBoundingClientRect();
//   window.scrollTo({
//     left: coords1.left + window.scrollX,
//     top: coords1.top + window.scrollY,
//     behavior: 'smooth',
//   });
// });

// ----- EVENT DELEGATION (with Scroll)
// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   console.log(e.target);
//   e.preventDefault();
//   if (e.target.classList.contains('nav__link')) {
//     const id = e.target.getAttribute('href');
//     document.querySelector(id).scrollIntoView({
//       behavior: 'smooth',
//     });
//   }
// });

const navScroll = document
  .querySelector('.nav__links')
  .addEventListener('click', function (e) {
    e.preventDefault();
    if (e.target.classList.contains('nav__link')) {
      const id = e.target.getAttribute('href');
      document.querySelector(id).scrollIntoView({
        behavior: 'smooth',
      });
    }
  });

// ----- Tabs
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);

  // guard clause
  if (!clicked) return;
  // active state tabs
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  clicked.classList.add('operations__tab--active');
  // content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});
// -----

// -----
// downwards
const h1 = document.querySelector('h1');
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children);
h1.firstElementChild.style.color = 'black';
h1.lastElementChild.style.color = 'black';

// upwards
// console.log(h1.parentNode);
// console.log(h1.parentElement);
// h1.closest('.header').style.backgroundColor = 'Black'

// Siblings
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);
// ----- DOM Traversing
// console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) el.style.transform = 'scale(1)';
// });
// // -----

// ----- Menu fade ani. (aDL('mouseenter')#does not bubble), Passing args to Event handler

//  Passing args , refactor
const navHoverFun = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const sibs = link.closest('.nav').querySelectorAll('.nav__link');
    sibs.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
  }
};
nav.addEventListener('mouseover', navHoverFun.bind(0.5));
nav.addEventListener('mouseout', navHoverFun.bind(1));

// nav.addEventListener('mouseover', function (e) {
//   navHoverFun(e, 0.5);
// });
// nav.addEventListener('mouseout', function (e) {
//   navHoverFun(e, 1);
// });

// nav.addEventListener('mouseover', function (e) {
//   if (e.target.classList.contains('nav__link')) {
//     const link = e.target;
//     const sibs = link.closest('.nav').querySelectorAll('.nav__link');
//     sibs.forEach(el => {
//       if (el !== link) el.style.opacity = 0.5;
//     });
//   }
// });

// nav.addEventListener('mouseout', function (e) {
//   if (e.target.classList.contains('nav__link')) {
//     const link = e.target;
//     const sibs = link.closest('.nav').querySelectorAll('.nav__link');
//     sibs.forEach(el => {
//       if (el !== link) el.style.opacity = 1;
//     });
//   }
// });
// -----

// ----- SCROLL
// const btnScrollTo = document.querySelector('.btn--scroll-to');
// const section1 = document.querySelector('#section--1');

// btnScrollTo.addEventListener('click', function (e) {
//   const s1coords = section1.getBoundingClientRect();
//   console.log('Coords X/Y', window.scrollX, scrollY);
//   console.log(
//     'Height/Width vp',
//     document.documentElement.clientHeight,
//     document.documentElement.clientWidth
//   );
//   console.log('s1', s1coords);
//   console.log('rect', e.target.getBoundingClientRect());

//   // precise scrolling old scool way
//   // window.scrollTo(s1coords.left + window.scrollX, s1coords.top + window.scrollY);
//   window.scrollTo({
//     left: s1coords.left + window.scrollX,
//     top: s1coords.top + window.scrollY,
//   });
// });

//  newier way

// const btnScrollTo = document.querySelector('.btn--scroll-to');
// const section1 = document.querySelector('#section--1');

// const btnScrollToE = btnScrollTo.addEventListener('click', function (e) {
//   const s1coords = section1.getBoundingClientRect();
//   window.scrollTo({
//     left: s1coords.left + window.screenX,
//     top: s1coords.top + window.screenY
//   })
// });
// -----

// random number
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// const randomColorEL = document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log(e.target);
// });
