"use strict";
// Functional popup login
const btnLoginEl = document.getElementById("btnLogin");
const popupEl = document.querySelector(".popup");
const btnClosePopup = document.querySelector(".popup__btn-close");

btnLoginEl.addEventListener("click", function () {
  popupEl.classList.add("popup__show");
});

document.body.addEventListener("click", function (e) {
  console.log(e.target.className);
  if (e.target.className == "popup popup__show") {
    popupEl.classList.remove("popup__show");
  }
});

btnClosePopup.addEventListener("click", function () {
  popupEl.classList.remove("popup__show");
});

// Functional rotate bank card
const cardWrapper = document.querySelector(".balance__card-wrapper");
const cardFrontSide = document.querySelector(".balance__card-front");
const cardBackSide = document.querySelector(".balance__card-back");

cardWrapper.addEventListener("click", function () {
  cardFrontSide.classList.toggle("rotate-front");
  cardBackSide.classList.toggle("rotate-back");
});

// some data
const account1 = {
  userName: "Leo Messi",
  transactions: [500, 250, -300, 5000, -850, -110, -170, 1100],
  interest: 1.5,
  pin: 1111,
  cardNumber: 4404_3303_1111_0003,
  validFrom: "07 / 22",
  validEnd: "07 / 25",
  cvv: 123,
};

const account2 = {
  userName: "Bob Brown",
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
  userName: "Martin McFly",
  transactions: [600, -550, 200, 560, 850, -1010, -240, 100],
  interest: 1.3,
  pin: 1234,
  cardNumber: 4424_1107_1451_0703,
  validFrom: "05 / 21",
  validEnd: "05 / 24",
  cvv: 554,
};

const account4 = {
  userName: "Robert White",
  transactions: [1500, -250, -1300, 190, 770, 210, 550, -90],
  interest: 1.1,
  pin: 7777,
  cardNumber: 4411_3318_5561_7783,
  validFrom: "01 / 20",
  validEnd: "01 / 23",
  cvv: 897,
};

const account5 = {
  userName: "Lisa Tesco",
  transactions: [500, -250, -50, 780, 1850, 110, -220, 20],
  interest: 1.4,
  pin: 4444,
  cardNumber: 3367_6603_9911_4033,
  validFrom: "04 / 23",
  validEnd: "04 / 27",
  cvv: 509,
};

const accounts = [account1, account2, account3, account4, account5];

// Create elements transactions
const transConteiner = document.querySelector(".transactions__history");
const balanceEl = document.querySelector(".balance__cash");

const displayTransactions = function (transactions) {
  transConteiner.innerHTML = "";

  transactions.forEach(function (trans) {
    const transType = trans > 0 ? "deposit" : "withdrawal";

    const transactionRow = `
      <div class="transaction__row">
        <div>
          <p class="transaction__type transaction__${transType}">${transType}</p>
        </div>
        <p class="transaction__number">${trans} грн</p>
      </div>
    `;

    transConteiner.insertAdjacentHTML("afterbegin", transactionRow);
  });
};

displayTransactions(account1.transactions);

const createNickNames = function (accs) {
  accs.forEach((acc) => {
    acc.nickName = acc.userName
      .toLowerCase()
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  });
};

createNickNames(accounts); // side effect!!!
/*
// console.log(accounts);
// const userName = "Lisa Tesco"; // nickName = 'lt'
// const nickName = userName
//   .toLowerCase()
//   .split(" ")
//   .map((word) => word[0])
//   .join("")
//   .toUpperCase();
// console.log(nickName);
*/

const displayBalance = function (transactions) {
  const balance = transactions.reduce((acc, trans) => acc + trans, 0);
  balanceEl.textContent = `${balance} грн`;
};

displayBalance(account1.transactions);
