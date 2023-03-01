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

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  movements.forEach((value, i) => {
    //ternary operator
    const type = value > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      
      <div class="movements__value">${value}€</div>
  </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = acc => {
  acc.balance = acc.movements.reduce((acc, i) => {
    return acc + i;
  });
  labelBalance.textContent = `${acc.balance} €`;
};

// calcDisplayBalance(account1.movements);

const calcDisplaySummary = acc => {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov);
  labelSumIn.textContent = `${incomes}€`;
  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((curVal, i, arr) => {
      return curVal >= 1;
    })
    .reduce((acc, int) => acc + int);
  labelSumInterest.textContent = `${Math.abs(interest)}€`;
};
// calcDisplaySummary(account1.movements);

const createUserNames = arr => {
  arr.forEach(currentValue => {
    currentValue.username = currentValue.owner
      .toLowerCase()
      .split(' ')
      .map(currentWordLetter => {
        return currentWordLetter[0];
      })
      .join('');
  });
};

const result = createUserNames(accounts);
console.log(accounts);

const updateUI = acc => {
  displayMovements(acc.movements);
  calcDisplayBalance(acc);
  calcDisplaySummary(acc);
};

//Login Event handler
let currentAccount;

btnLogin.addEventListener('click', function (event) {
  event.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);
  // "?" this is called optional chaining
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //Display UI and Welcome messgae
    labelWelcome.textContent = `Welcome Back ${currentAccount.owner.split(
      '  '
    )}`;
    containerApp.style.opacity = 100;

    //clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    //update ui
    updateUI(currentAccount);
  }
});

//Transfering amount to another account

btnTransfer.addEventListener('click', function (event) {
  event.preventDefault();
  const amountToTransfer = Number(inputTransferAmount.value);
  const transferAccount = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  console.log(amountToTransfer, transferAccount);

  if (
    amountToTransfer > 0 &&
    transferAccount &&
    currentAccount.balance >= amountToTransfer &&
    // "?" used for if transferAccount exits
    transferAccount?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amountToTransfer);
    transferAccount.movements.push(amountToTransfer);
    //update ui
    updateUI(currentAccount);
  }
});

//Calculating balance and displaying it on Bankist app using reduce function

//////////////////////////////////////////

// const balance = movements.reduce((acc, current, index, arr) => {
//   console.log(`Iteration ${index} : ${acc}`);
//   return acc + current;
// }, 1);
// console.log(balance);

// //finding max value in array using reduce

// const max = movements.reduce((i, j) => {
//   if (i > j) return i;
//   else return j;
// });
// console.log(max);

// //calculating dogs age and converting it human age using all array method

// const calcAverageHumanAge = takesDogsAgeArray => {
//   //converting to human ages from dog ages
//   const humanAges = takesDogsAgeArray.map(i => (i <= 2 ? 2 * i : 16 + i * 4));
//   const adultDogs = humanAges.filter(i => i >= 18);
//   console.log(`Adult Dogs ${adultDogs}`);
//   //calculating the average
//   const average = adultDogs.reduce((i, j) => i + j / adultDogs.length);
//   console.log(`Average is ${average}`);
// };
// calcAverageHumanAge([4, 8, 4, 6, 9, 10, 25, 2, 1]);

// const account = accounts.find(acc => acc.owner === 'Jonas');
// console.log(account);
