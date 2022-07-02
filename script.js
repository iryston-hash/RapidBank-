'use strict';

// Modal window
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
//
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

// ----
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

// smooth scroll
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  console.log(e.target.getBoundingClientRect());
  console.log('Coords X/Y', window.scrollX);
});
