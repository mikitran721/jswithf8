// import { createStore } from "https://cdn.skypack.dev/redux";

/* ------MY REDUX------- */
function createStore(reducer) {
  let state = reducer(undefined, {});
  const subscribers = [];
  //   console.log(state);
  return {
    getState() {
      return state;
    },
    dispatch(action) {
      //   console.log(action);
      state = reducer(state, action);
      console.log(subscribers);
      subscribers.forEach((subscriber) => subscriber());
    },
    subscribe(subscriber) {
      //   console.log(subscriber);
      subscribers.push(subscriber);
    },
  };
}

/* ------MY APP------- */

const initState = 0;
// reducer
function bankReducer(state = initState, action) {
  switch (action.type) {
    case "DEPOSIT":
      return state + action.payload;
    case "WITHDRAW":
      return state - action.payload;
    default:
      return state;
  }
}

// store
// window.store giup cap nhat qua console
// const store = (window.store = createStore(reducer));
const store = createStore(bankReducer);
window.store = store; //de chay dc o console browser

// Action
function actionDeposit(payload) {
  return {
    type: "DEPOSIT",
    payload,
  };
}
function actionWithdraw(payload) {
  return {
    type: "WITHDRAW",
    payload,
  };
}

// DOM events
const deposit = document.querySelector("#deposit");
const withdraw = document.querySelector("#withdraw");

// Event handle
deposit.onclick = function () {
  store.dispatch(actionDeposit(10));
  //   console.log(store.getState());
};
withdraw.onclick = function () {
  store.dispatch(actionWithdraw(10));
  //   console.log(store.getState());
};

function render() {
  const output = document.querySelector("#output");
  output.innerText = store.getState();
}

store.subscribe(function () {
  console.log("State moi update xong");
  render();
});

render();

// console.log(store);
