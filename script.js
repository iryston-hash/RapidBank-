'use strict';

// Modal window
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function(e) {
  e.preventDefault()
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
// 
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal))
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


const header = document.querySelector('.header')
// const allSections = document.querySelectorAll('.section')
// console.log(allSections);
// const allBtns  = document.getElementsByTagName('button')
// console.log(allBtns); 

// Creating & inserting el's

const message = document.createElement('div')
message.classList.add('cookie-message')

// message.textContent = 'We use cookies for user experience, no personal informatio is gathered'

message.innerHTML = 'We use cookies for user experience, no personal information is gathered <button class="btn btn--close-cookie">Dismiss</button>'

// PREPEND adds elements as a firstChild of Parent element
// header.prepend(message)
// APPEND is another way around PREPEND
header.append(message)
// header.append(message.cloneNode(true))

// ---- DELETE el's
document.querySelector('.btn--close-cookie').addEventListener('click', function() {
  // old way to remove el -> message.parentElement.removeChild(message)
  message.remove()
})

