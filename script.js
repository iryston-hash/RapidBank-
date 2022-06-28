'use strict';

const account1 = {
  owner: 'Armanas Bagajevas',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300, 9000, 250, -10000],
  interestRate: 1.2,
  pin: 1111,
  movementsDates: [
    '2021-11-18T21:31:17.178Z',
    '2021-12-23T07:42:02.383Z',
    '2022-01-28T09:15:04.904Z',
    '2022-04-01T10:17:24.185Z',
    '2022-05-08T14:11:59.604Z',
    '2022-05-27T17:01:17.194Z',
    '2022-07-11T23:36:17.929Z',
    '2022-07-12T10:51:36.790Z',
    '2022-06-11T23:36:17.929Z',
    '2022-06-25T10:51:36.790Z',
    '2022-06-20T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'lt-LT',
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2021-11-18T21:31:17.178Z',
    '2021-12-23T07:42:02.383Z',
    '2021-01-28T09:15:04.904Z',
    '2021-04-01T10:17:24.185Z',
    '2021-05-08T14:11:59.604Z',
    '2022-05-27T17:01:17.194Z',
    '2022-06-11T23:36:17.929Z',
    '2022-06-25T10:51:36.790Z',
    '2022-08-26T10:51:36.790Z',
    '2022-08-30T10:51:36.790Z',
    '2022-09-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2021-11-18T21:31:17.178Z',
    '2021-12-23T07:42:02.383Z',
    '2021-01-28T09:15:04.904Z',
    '2021-04-01T10:17:24.185Z',
    '2021-05-08T14:11:59.604Z',
    '2022-05-27T17:01:17.194Z',
    '2022-06-11T23:36:17.929Z',
    '2022-06-25T10:51:36.790Z',
    '2022-08-26T10:51:36.790Z',
    '2022-08-30T10:51:36.790Z',
    '2022-09-12T10:51:36.790Z',
  ],
  currency: 'GBP',
  locale: 'en-GB',
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2021-11-18T21:31:17.178Z',
    '2021-12-23T07:42:02.383Z',
    '2021-01-28T09:15:04.904Z',
    '2021-04-01T10:17:24.185Z',
    '2021-05-08T14:11:59.604Z',
    '2022-05-27T17:01:17.194Z',
    '2022-06-11T23:36:17.929Z',
    '2022-06-25T10:51:36.790Z',
    '2022-08-26T10:51:36.790Z',
    '2022-08-30T10:51:36.790Z',
    '2022-09-12T10:51:36.790Z',
  ],
  currency: 'USD',
  locale: 'en-US',
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
//

// -----------
// dates & functions of transactions
const formatMovementsDate = function (date) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  // console.log(daysPassed);
  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yestarday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();
  // return `${day}/${month}/${year}`;
};
// -----------
//

// displayMovements(account1.movements)
const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';
  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit 💹' : 'withdrawal 📉';
    // date
    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementsDate(date);
    // const day = `${date.getDate()}`.padStart(2, 0);
    // const month = `${date.getMonth() + 1}`.padStart(2, 0);
    // const year = date.getFullYear();
    // const displayDate = `${day}/${month}/${year}`;

    // const calcDaysPassed = (date1, date2) => Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);
    //
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div> 
      <div class="movements__date">${displayDate}</div>
      <div class="movements__value">${mov.toFixed(2)} €</div>
    </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// const displayMovements = function (movements, sort = false) {
//   containerMovements.innerHTML = '';
//   const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

//   movs.forEach(function (mov, i) {
//     const type = mov > 0 ? 'deposit 💹' : 'withdrawal 📉';
//     const html = `
//     <div class="movements__row">
//       <div class="movements__type movements__type--${type}">${
//       i + 1
//     } ${type}</div>
//       <div class="movements__value">${mov.toFixed(2)} €</div>
//     </div>
//     `;
//     containerMovements.insertAdjacentHTML('afterbegin', html);
//   });
// };
// shortning of names
const createUserNamesFun = function (accs) {
  accs.forEach(function (acc) {
    acc.userShortName = acc.owner
      .toLocaleLowerCase()
      .split(' ')
      .map(word => word[0])
      .join('');
  });
};
createUserNamesFun(accounts);
// console.log(accounts);

const updateUI = function (acc) {
  displayMovements(acc);
  calcPrintBalance(acc);
  calcPrintSummary(acc);
};

// reducing balance to one value
const calcPrintBalance = function (acc) {
  acc.balance = acc.movements.reduce((accum, val) => accum + val, 0);
  labelBalance.textContent = `${acc.balance.toFixed(2)} €`;
};

// display summary of balanace
const calcPrintSummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((accum, mov) => accum + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)} €`;

  const outcomes = acc.movements
    .filter(mov => mov < 0)
    .reduce((accum, mov) => accum + mov, 0);
  labelSumOut.textContent = `${Math.abs(outcomes)} €`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((accum, int) => accum + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)} €`;
};

//  REDUCE MAXIMUM VALUE
const movements = [5000, 3400, -150, -790, -3210, -1000, 8500, -30];

const euroToUsd = 1.5;
const totalDepositUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * euroToUsd)
  .reduce((accum, mov) => accum + mov, 0);
// console.log(totalDepositUSD);
// ||||||||||||
// const totalDepositUSD = movements.filter(mov => mov > 0).map(mov => mov * euroToUsd).reduce((accum,mov) => accum + mov, 0)
// console.log(totalDepositUSD);

// EVENT HANDLERS
let currentAccount;

// always login
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

const dateapi = new Date();
const dateapiOptions = {
  weekday: 'long',
  hour: 'numeric',
  minute: 'numeric',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
};
labelDate.textContent = new Intl.DateTimeFormat(
  'locale',
  dateapiOptions
).format(dateapi);
// ----------------------
// DATE API
// const nows = new Date();
// const options = {
//   hour: 'numeric',
//   minute: 'numeric',
//   day: 'numeric',
//   month: 'numeric', // 'numeric' , 'long', '2-digit'
//   year: 'numeric',
//   weekday: 'long',
// };
// // const locale = navigator.language
// // console.log(locale);
// labelDate.textContent = new Intl.DateTimeFormat(currentAccount, options).format(nows);
// ----------------------
//

// DATE
// const now = new Date();
// const options = {
//   hour: 'numeric',
//   minute: 'numeric',
//   day: 'numeric',
//   month: 'numeric', // 'numeric' , 'long', '2-digit'
//   year: 'numeric',
//   weekday: 'long',
// };

// const locale = navigator.language;
// console.log(locale);
// labelDate.textContent = new Intl.DateTimeFormat(
//   currentAccount.locale,
//   options
// ).format(now);

// labelDate.textContent = new Intl.DateTimeFormat('locale', options).format(now)

// const day = `${now.getDate()}`.padStart(2, 0);
// const month = `${now.getMonth() + 1}`.padStart(2, 0);
// const year = now.getFullYear();
// const hour = `${now.getHours()}`.padStart(2, 0);
// const minutes = `${now.getMinutes()}`.padStart(2, 0);
// labelDate.textContent = `${day} / ${month} / ${year}, ${hour}:${minutes}`;
//
//
// ----------------
// INTL NUMBERS
// const x = Math.floor(Math.random() * 30);
// const optionss = {
//   style: 'currency',
//   unit: 'kilometer-per-hour',
//   currency: 'EUR'
// };
// console.log('Lithunia | ', new Intl.NumberFormat('lt-LT', optionss).format(x));
// console.log('Russia | ', new Intl.NumberFormat('ru-Ru', optionss).format(x));
// ----------------
//
//

//
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  // console.log('login');

  currentAccount = accounts.find(
    acc => acc.userShortName === inputLoginUsername.value
  );
  // console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(' ')[0]
    }`;
  }
  // clear inputs
  inputLoginUsername.value = inputLoginPin.value = '';
  inputLoginPin.blur();
  containerApp.style.opacity = 100;
  // displayMovements(currentAccount.movements);
  // calcPrintBalance(currentAccount);
  // calcPrintSummary(currentAccount);
  updateUI(currentAccount);
  startLogOutTimer()
});

//  transfer
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.userShortName === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.userShortName !== currentAccount.userShortName
  ) {
    console.log('transfer ok');
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    // add transfer time date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());
    //
    updateUI(currentAccount);
  }
});

//  delete Account

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.userShortName &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.userShortName === currentAccount.userShortName
    );
    console.log(index);
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

// loan
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // movement add
    currentAccount.movements.push(amount);
    // add loan date
    currentAccount.movementsDates.push(new Date().toISOString());
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

//  SORTING balance
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(acc.movements, !sorted);
  sorted = !sorted;
});

// ----------------------
// LOG OFF TIMER
const startLogOutTimer = function () {
  let time = 100;

  setInterval(function () {
    const min = time / 60
    const sec = time % 60

    labelTimer.textContent = `${min}:${sec}`

    time--;
``
  }, 1000);
};



// ----------------------

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
// const movements = [5000, 3400, -150, -790, -3210, -1000, 8500, -30]

// // FILTER variant (✔)
// const depos = movements.filter(function(mov) {
//   return mov > 0
// })
// console.log(movements);
// console.log(depos);

// // forEach variant (X)
// const deposFor = []
// for(const move of movements) if (move > 0) deposFor.push(move)
// console.log(deposFor);

// // const withdrawals = movements.filter(function(mov) {
// //   return mov < 0
// // })
// // console.log(withdrawals);

// // using arrow function
// const  withdrawals = movements.filter(mov => mov < 0 )
// console.log(withdrawals);

// //
// const  withdrawalsFor = []
// for (const mov of movements)
// if (mov < 0) withdrawalsFor.push(mov)
// console.log(withdrawalsFor);

//
// --------- REDUCE ---------
// # reduce has accumulator as first parameter #

// // Arrow fun. variant
// const balance = movements.reduce((acc, val) => acc + val, 0)
// console.log(balance);

// // regular function
// const balance0 = movements.reduce(function(accum, val) {
//   return accum + val
// },0)
// console.log(balance0);

// // same using FOR loop
// let balanceFor = 0
// for (const n of movements) balanceFor += n
// console.log(balanceFor);

// const balance = movements.reduce((accum,val) => accum + val,0)
// console.log(balance);

// FIND  method finds the first element and returns it.

const firstWithdrawal = movements.find(mov => mov < 0);

const account = accounts.find(acc => acc.owner === 'Armanas Bagajevas');
// console.log(account);

// SOME checks for current condition
const someDepos = movements.some(m => m > 2000);
// console.log(someDepos);
//  checks for all conditions
// console.log(movements.every(mov => mov > 0));
// console.log(account4.movements.every(mov => mov > 0));

// FLAT & FLATMAP (combines flat method with map method)
const arr = [[1, 2, 3, 3], [4, 5, 6], 7, 8];
// console.log(arr.flat());

const arrDeep = [
  [[2, 3, 4], 3],
  [0, 0, 0, 7],
  [2, 3],
];
// console.log(arrDeep.flat(2));

// const accMov = accounts.map(acc => acc.movements)
// const flatMovements =  accMov.flat()
// console.log(flatMovements);
// // adding all values
// // const overallBalance = flatMovements.reduce((acc,mov) => acc + mov, 0)
// console.log(overallBalance);

//FLAT,  Chaining all actions before
// const overallBalance = accounts
//   .map(acc => acc.movements)
//   .flat()
//   .reduce((accum, mov) => accum + mov, 0);
// console.log(overallBalance);

// FLATMAP
const overallBalance = accounts
  .flatMap(acc => acc.movements)
  .reduce((accum, mov) => accum + mov, 0);
// console.log(overallBalance);

//
// SORTING ARRAYS (mutates)
// SORTING strings
const owners = ['ala', 'ada', 'aa', 'assa', 'anna'];
// console.log(owners);
// console.log(owners.sort());

// SORTING numbers

// Ascending.
// console.log(movements);
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (b > a) return -1;
// });
// console.log(movements);

// =>>>>> SHORT VERSION OF SORT <<<<<=
//  ... => (a - b) -> automatically returns the values , no need to write 'return' manually. because we using arrow function.

movements.sort((a, b) => a - b);
// console.log(movements);

// Descending.
// movements.sort((a, b) => {
//   if (a > b) return -1;
//   if (b > a) return 1;
// });
// console.log(movements);

// =>>>>> SHORT VERSION OF SORT <<<<<=
movements.sort((a, b) => b - a);
// console.log(movements);

// MORE WAYS to create [ARRAYS] & FILL Method

// regular
// console.log([1, 2, 3]);
// // array construction
// console.log(new Array(1, 2, 3, 4));

// //  ARRAY CONSTRUCTION FUNCTION , creates 7 empty array elements with FILL Method.

// const x = new Array(7);
// x.fill(25, 0, 7);
// console.log(x);

// // ARRAR.FROM , can convert array like elements into actual arrays

// const y = Array.from({ length: 7 }, () => 10);
// console.log(y);

// // programatically better than the new Array example.
// const z = Array.from({ length: 7 }, (_, i) => i + 1);
// console.log(z);

// converting NodeList into Array

// I) Variant
// labelBalance.addEventListener('click', function () {
//   const movementsUI = Array.from(
//     document.querySelectorAll('.movements__value')
//   );
//   console.log(movementsUI.map(el => el.textContent.replace('€', '')));
// });

// II) Variant

// labelBalance.addEventListener('click', function () {
//   const movementsUI = Array.from(
//     document.querySelectorAll('.movements__value'),
//     el => Number(el.textContent.replace('€', ''))
//   );
//   console.log(movementsUI);
// });

// // III) bonus variant with SPREAD operator , you need to use map separatelly then.

// const movementsUI2 = [...document.querySelectorAll('.movements__value')]

// NUMBERS

// STRING to NUMBER

// console.log(Number('23'));
// console.log(+'22');

// // Parsing
// console.log(Number.parseInt('30px', 10));
// console.log(Number.parseFloat('2.5rem'));
// console.log(parseFloat('2.5rem'));

// // NaN
// console.log(Number.isNaN(3));

// // Best way to check if an element is a Number is using (.isFinite) method

// console.log(Number.isFinite(22));

// // isInteger
// console.log(Number.isInteger(22.3));
// console.log(Number.isInteger(22.0));

//
// MATH and Rounding
// console.log(Math.sqrt());

// console.log(Math.max(22,33,44,55));
// console.log(Math.max(22,'33',44,55));
// console.log(Math.min(22,33,44,55));

// // Math RANDOM
// console.log(Math.trunc(Math.random() * 10) + 1);

// const intRandom = (min, max) => Math.trunc(Math.random() * (max - min) + 1) + min
// console.log(intRandom(10,20));

// Rounding integers , all these methods do coartion type on auto.

// console.log(Math.round(23.4));
// console.log(Math.round('23.4'));
// console.log(Math.ceil(23.4));

// console.log(Math.floor(23.6));
// console.log(Math.trunc(23.6));

// console.log(Math.floor(-23.6));
// console.log(Math.round(-23.7));
// console.log(Math.trunc(-23.6));

// //
// // Round decimals

// // toFixed will always return STRING
// console.log((2.7).toFixed(0));
// console.log(+(2.7).toFixed(3));
// console.log(+(2.735).toFixed(3));

// REMAINDER OPERATOR
// console.log(6 % 2);
// const isEven = n => n % 2 === 0
// console.log(isEven(8));
// console.log(isEven(514));
// console.log(isEven(321));

// labelBalance.addEventListener('click', function() {
//   [...document.querySelectorAll('.movements__row')].forEach(function(row,i){
//     if (i % 2 === 0) row.style.backgroundColor = 'grey'
//     if (i % 3 === 0) row.style.backgroundColor = 'orange'
//   })
// })

// NUMERIC SEPARATORS _
// const diameter =  287_460_000_000
// console.log(diameter);

// const cents = 350_50
// console.log(cents);

//-----------------------------------------

// // DATE
// const currentTime =  new Date()
// // console.log(currentTime);

// // console.log(account2.movementsDates[0]);
// console.log(new Date (account2.movementsDates[0]));

// console.log(new Date(2022, 7, 17, 20, 59, 26));

// console.log(new Date(0));

// // milliseconds(time-stamp) in days
// console.log(new Date(7 * 24 * 60 * 60 * 1000));

// Working with dates

// const future = new Date(2022, 7, 17, 20, 59, 26);
// console.log(future);
// console.log(future.getFullYear());
// console.log(future.getMonth());
// console.log(future.getDay());
// console.log(future.getHours());
// console.log(future.getMinutes());
// console.log(future.getSeconds());
// console.log(future.toISOString());
// console.log(future.getTime());

// // time stamp
// console.log(new Date(1660762766000));

// console.log(Date.now());

// // Set

// future.setFullYear(3000);
// console.log(future);

// // -------------------------------------
// const future = new Date(2033, 10, 20, 15, 23);
// // console.log(+future);

// const calcDaysPassed = (date1, date2) =>
//   Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);
// const days1 = calcDaysPassed(
//   new Date(2037, 3, 4),
//   new Date(2037, 3, 14, 10, 8)
// );
// // console.log(days1);

// -------------------------------------
// // setTimeout function
// const pieIngredients = ['apples', 'oranges', 'choco'];
// const pieTimer = setTimeout(
//   () =>
//     console.log(`Your pie is ready,

// ingredients used are: ${pieIngredients}`),
//   2000,
//   ...pieIngredients
// );
// if (pieIngredients.includes('appless')) clearTimeout(pieTimer)
// -------------------------------------
//
//
// -------------------------------------
// // setInterval
// setInterval(function () {
//   const now = new Date();
//   console.log(now);
// },1000);
// -------------------------------------
