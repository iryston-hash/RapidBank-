'use strict';

const account1 = {
  owner: 'Armanas Bagajevas',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300, 9000, 250, -10000],
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

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit 💹' : 'withdrawal 📉';
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov} €</div>
    </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
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
  displayMovements(acc.movements);
  calcPrintBalance(acc);
  calcPrintSummary(acc);
};

// reducing balance to one value
const calcPrintBalance = function (acc) {
  acc.balance = acc.movements.reduce((accum, val) => accum + val, 0);
  labelBalance.textContent = `${acc.balance} €`;
};

// display summary of balanace
const calcPrintSummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((accum, mov) => accum + mov, 0);
  labelSumIn.textContent = `${incomes} €`;

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
  labelSumInterest.textContent = `${interest} €`;
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
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('login');

  currentAccount = accounts.find(
    acc => acc.userShortName === inputLoginUsername.value
  );
  console.log(currentAccount);
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
    updateUI(currentAccount);
  }
});

//  delete Account

btnClose.addEventListener('click', function(e){
  e.preventDefault()
  if (
    inputCloseUsername.value === currentAccount.userShortName && Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(acc => acc.userShortName === currentAccount.userShortName)
    console.log(index);
    accounts.splice(index, 1)
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = ''
})

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
