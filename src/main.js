// import { createStore } from "./store";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./rootReducer";
import {
  decrement,
  increment,
  asyncIncrement,
  changeTheme,
  disableButtons,
  enableButtons,
} from "./actions";
import thunk from "redux-thunk";

const title = document.getElementById("title");
const incButton = document.getElementById("inc-button");
const decButton = document.getElementById("dec-button");
const asyncIncButton = document.getElementById("async-inc-button");
const changeThemeButton = document.getElementById("change-theme");

function myLogger(state) {
  return function (next) {
    return function (action) {
      console.log("State", state.getState());
      console.log("Next", next);
      console.log("Action", action);
      return next(action);
    };
  };
}

let store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk, myLogger),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

incButton.addEventListener("click", () => {
  store.dispatch(increment());
});

decButton.addEventListener("click", () => {
  store.dispatch(decrement());
});

asyncIncButton.addEventListener("click", () => {
  // store.dispatch(asyncIncrement()); // Можно так

  store.dispatch(function (dispatch) {
    // А можно так
    dispatch(disableButtons());
    setTimeout(() => {
      dispatch(increment());
      dispatch(enableButtons());
    }, 1000);
  });
});

changeThemeButton.addEventListener("click", () => {
  const newTheme = document.body.classList.contains("light") ? "dark" : "light";
  store.dispatch(changeTheme(newTheme));
});

store.subscribe(() => {
  title.textContent = store.getState().counter;
  document.body.className = store.getState().theme.value;
  [incButton, decButton, asyncIncButton, changeThemeButton].forEach((btn) => {
    btn.disabled = store.getState().theme.disabled;
  });
});

store.dispatch({ type: "__INIT__" });
