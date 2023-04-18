"use strict";
// some data
const account1 = {
  userName: "Ліза Назаренко",
  userNameEng: "Lisa Nazarenko",
  transactions: [500, 250, -300, 5000, -850, -110, -170, 1100],
  interest: 1.5,
  pin: 1111,
  cardNumber: 4404330311110003,
  validFrom: "07 / 22",
  validEnd: "07 / 25",
  cvv: 123,
};

const account2 = {
  userName: "Олександр Стус",
  userNameEng: "Oleksandr Stus",
  transactions: [200, -250, 300, 2000, -1850, 110, 230, -100],
  interest: 1.3,
  // pin: 0000, why 0000 do not working in strict mode
  pin: 1234,
  cardNumber: 4422_3345_1341_4303,
  validFrom: "03 / 22",
  validEnd: "03 / 25",
  cvv: 231,
};

const account3 = {
  userName: "Володимир Мирний",
  userNameEng: "Volodymyr Mirnyi",
  transactions: [600, -550, 200, 560, 850, -1010, -240, 100],
  interest: 1.3,
  pin: 1234,
  cardNumber: 4424_1107_1451_0703,
  validFrom: "05 / 21",
  validEnd: "05 / 24",
  cvv: 554,
};

const account4 = {
  userName: "Андрій Шевченко",
  userNameEng: "Andriy Shevchenko",
  transactions: [1500, -250, -1300, 190, 770, 210, 550, -90],
  interest: 1.1,
  pin: 7777,
  cardNumber: 4411_3318_5561_7783,
  validFrom: "01 / 20",
  validEnd: "01 / 23",
  cvv: 897,
};

const account5 = {
  userName: "Ольга Тимошенко",
  userNameEng: "Olga Tymoshenko",
  transactions: [500, -250, -50, 780, 1850, 110, -220, 20],
  interest: 1.4,
  pin: 4444,
  cardNumber: 3367_6603_9911_4033,
  validFrom: "04 / 23",
  validEnd: "04 / 27",
  cvv: 509,
};

const accounts = [account1, account2, account3, account4, account5];

// variables
// popup elements
const btnLoginEl = document.getElementById("btnLogin");
const popupEl = document.querySelector(".popup");
const btnClosePopup = document.querySelector(".popup__btn-close");
const popupBtnText = document.querySelector(".btn-text");

// inputs elements
const loginName = document.querySelector(".login__input-name");
const loginPin = document.querySelector(".login__input-pin");
const popupBtn = document.querySelector(".popup__btn");

// bank card elements
const cardWrapper = document.querySelector(".balance__card-wrapper");
const cardFrontSide = document.querySelector(".balance__card-front");
const cardBackSide = document.querySelector(".balance__card-back");

// transactions
const transConteiner = document.querySelector(".transactions__history");
const balanceEl = document.querySelector(".balance__cash");

// total values
const depositeMoney = document.querySelector("#received");
const withdrawalMoney = document.querySelector("#deduced");
const interestMoney = document.querySelector("#interest");

// card number
const cardNumber = document.querySelector(".balance__card-number");
const balanceValidFrom = document.querySelector(".valid-from");
const balanceValidEnd = document.querySelector(".valid-end");
const ownerCard = document.querySelector(".balance__card-owner");
const cvvNubmer = document.querySelector(".balance__card-cvv");
const welcome = document.querySelector(".header__welcome");

// choise current user
let activeAccount;

// Functional popup login
btnLoginEl.addEventListener("click", function () {
  if (popupBtnText.textContent === "Вийти") {
    // balanceValidFrom.textContent = "00 / 00";
    // balanceValidEnd.textContent = "00 / 00";
    // ownerCard.textContent = "Your Name";
    // cvvNubmer.textContent = "000";
    welcome.textContent = "Ласкаво просимо!";
    popupBtnText.textContent = "Вхід";
    document.querySelector(".wrapper").style.display = "none";
    document.querySelector(".greeting").style.display = "block";
    // cardNumber.textContent = "**** **** **** ****";
  } else {
    popupEl.classList.add("popup__show");
  }
  // page reload !????
});

document.body.addEventListener("click", function (e) {
  if (e.target.className == "popup popup__show") {
    popupEl.classList.remove("popup__show");
  }
});

btnClosePopup.addEventListener("click", function () {
  popupEl.classList.remove("popup__show");
});

// Functional rotate bank card
cardWrapper.addEventListener("click", function () {
  cardFrontSide.classList.toggle("rotate-front");
  cardBackSide.classList.toggle("rotate-back");
});

// Create elements transactions
const displayTransactions = function (transactions) {
  transConteiner.innerHTML = "";

  transactions.forEach(function (trans) {
    const transType = trans > 0 ? "Депозит" : "Вивод коштів";

    const transactionRow = `
      <div class="transaction__row">
        <div>
          <p class="transaction__type transaction__deposite">${transType}</p>
        </div>
        <p class="transaction__number">${trans} грн</p>
      </div>
    `;

    transConteiner.insertAdjacentHTML("afterbegin", transactionRow);
  });
};

// display balance
const displayBalance = function (transactions) {
  const balance = transactions.reduce((acc, trans) => acc + trans, 0);
  balanceEl.textContent = `${balance} грн`;
};

// display total values
const displayTotal = function (account) {
  const depositesTotal = account.transactions
    .filter((trans) => trans > 0)
    .reduce((acc, trans) => acc + trans, 0);
  depositeMoney.textContent = `${depositesTotal} грн`;

  const withdrawalsTotal = account.transactions
    .filter((trans) => trans < 0)
    .reduce((acc, trans) => acc + trans, 0);

  withdrawalMoney.textContent = `${Math.abs(withdrawalsTotal)} грн`;

  const interestTotal = account.transactions
    .filter((trans) => trans > 0)
    .map((depos) => (depos * account.interest) / 100)
    .filter((interst) => interst >= 5)
    .reduce((acc, interest) => acc + interest, 0);
  interestMoney.textContent = `${interestTotal} грн`;
};

// display info obout bank card
const displayCardNumber = function (account) {
  const arr = String(account.cardNumber).split("");
  for (let i = 3; i < arr.length - 1; i += 4) {
    arr[i] += "_";
  }
  arr.join("").replaceAll("_", " ");
  cardNumber.textContent = `${arr.join("").replaceAll("_", " ")}`;

  balanceValidFrom.textContent = `${activeAccount.validFrom}`;
  balanceValidEnd.textContent = `${activeAccount.validEnd}`;
  ownerCard.textContent = `Mr(-s) ${activeAccount.userNameEng}`;
  cvvNubmer.textContent = `${activeAccount.cvv}`;
  welcome.textContent = `Вітаємо, ${activeAccount.userName.split(" ")[0]}!`;
};

// Input in app
popupBtn.addEventListener("click", function (e) {
  e.preventDefault();
  let updateName =
    loginName.value.split("")[0].toUpperCase() + loginName.value.slice(1);

  activeAccount = accounts.find(
    (account) => account.userName.split(" ")[0] === updateName
  );

  if (activeAccount?.pin === Number(loginPin.value)) {
    console.log("YEssss!!!");
    // hidden popup
    popupEl.classList.remove("popup__show");
    popupBtnText.textContent = "Вийти";

    // display transactions
    displayTransactions(activeAccount.transactions);

    // display card
    displayCardNumber(activeAccount);

    // display balance
    displayBalance(activeAccount.transactions);

    // display total operations
    displayTotal(activeAccount);
  }

  document.querySelector(".wrapper").style.display = "block";
  document.querySelector(".greeting").style.display = "none";

  loginName.value = "";
  loginPin.value = "";
});
