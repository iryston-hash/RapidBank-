'use strict';

const account1 = {
  owner: 'Armanas Bagajevas',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300, 9000, 250 , -10000 ],
  interestRate: 1.2,  
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// const displayMovements = function(movements) {
//   containerMovements.innerHTML = ''
//   movements.forEach(function(mov , i) {
//     const type = mov > 0 ? 'deposit' : 'withdrawal'
//     const html = `<div class="movements__row">
//     <div class="movements__type movements__type--${type}">
//     ${i + 1} ${type}
//     </div>
//     <div class="movements__value">${mov}</div>
//   </div>`
//   containerMovements.insertAdjacentHTML('afterbegin', html)
//   })
// } 
// displayMovements(account1.movements)

const displayMovements = function(movements) {
  containerMovements.innerHTML = ''
  movements.forEach(function(mov , i) {
    const type = mov > 0 ? 'deposit 💹' : 'withdrawal 📉'
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
      <div class="movements__value">${mov} $</div>
    </div>
    `
    containerMovements.insertAdjacentHTML('afterbegin', html)
  })
} 
displayMovements(account1.movements)

// shortning of names
const createUserNamesFun = function(accs) {
  accs.forEach(function(acc) {
    acc.userShortName = acc.owner
    .toLocaleLowerCase()
    .split(' ')
    .map(word => word[0])
    .join('')
  })
} 
createUserNamesFun(accounts);
console.log(accounts);

///////////////////////////////////////////////////////////
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300, 9000, 250 , -10000]
// const euroToUsd = 2

// // I)  1)regular fun. and  2)functional arrow variant (BETTER WAY)
// // 1)
// const  movementsUSD = movements.map(function(move) {
//   return move * euroToUsd
// })
// console.log(movementsUSD);

// // 2)
// // const movementsUSD = movements.map(move => move * euroToUsd)
// // console.log(movementsUSD);

// // II) For variant 
// const  movementsUSDFor = []
// for (const n of movements) movementsUSDFor.push(n * euroToUsd)
// console.log(movementsUSDFor);
// // 
// //------------------
// // forEach

// const movementsDesc = movements.map(
//   (mov , i) => 
// // {
//   `movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrawned'}  ${Math.abs(mov)}`
//   // if (mov > 0) {
//   //   return `movement ${i + 1}: deposited ${mov}`
//   // } else {
//   //   return `movement ${i + 1}: withdrawned ${mov}`
//   // }
// )
// console.log(movementsDesc);

// 
// -------------
//  filter

movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30]