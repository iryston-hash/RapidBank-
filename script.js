'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
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

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
// SLICE METHOD
const arr = ['a','b','d','c','f']
// console.log(arr.slice(1)); 
// console.log(arr.slice(-1)); 
// console.log(arr.slice(2,-1));
// 
// console.log(arr);
// we can use spread operator as an alternative
// console.log([...arr]);

// SPLICE - @mutates@ the original array , unline SLICE
// console.log(arr.splice(2));
// arr.splice(-1)
// arr.splice(2,3)
// console.log(arr);

// ---- REVERSE ---- @mutates@ original array
// const arr1 = ['a','b','d','c','f']
// const arr2 = ['1','2','3','4','5']
// console.log(arr2);
// console.log(arr2.reverse());
// console.log(arr2);

// // CONCAT does not @mutate@ org arr
// const letters = arr1.concat(arr2)
// console.log(letters);
// console.log([...arr , ...arr2]);

// //  JOIN turn arr into string 
// console.log(letters.join(' - '));

// //  ---- new AT method

// const arr3 = [20,10,30]
// console.log('I |' , arr3[0]);
// console.log('II |' ,arr3[arr3.length - 1]);
// console.log('III |', arr3.at(-1));
// console.log('IV |', arr3.slice(-1)[0]);
// 

// ---- Loop forEach ---- 
 
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// I variant 
// for (const move of movements) {
  for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`opperation - Deposit No(${i + 1}) have been Dposited = ${movement} €`);
  } else {
    console.log(`opperation - Withdraw No(${i + 1}) of = ${Math.abs(movement)}  €`);
  }
}

console.log('----------');
// II  variant !
movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`opperation - Deposit No(${i + 1}) = ${mov} €`);
  } else {
    console.log(`opperation - Withdraw No(${i + 1}) = ${Math.abs(mov)} €`);
  }
})











// for (const move of movements) {
//   if(move > 0) {
//     console.log(`${move} have been deposited`);
//   } else {
//     console.log(`${Math.abs(move)} have been withdrewned`);
//   }
// }

// console.log('===============');

// movements.forEach(function (move) {
//   if (move > 0) {
//     console.log(`${move} have been deposited`);
//   } else {
//     console.log(`${Math.abs(move)} have been withdrewned`);
//   }
// }) 
