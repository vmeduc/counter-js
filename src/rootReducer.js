import {
  CHANGE_THEME,
  DECREMENT,
  DISABLE_BUTTONS,
  ENABLE_BUTTONS,
  INCREMENT,
} from "./actionTypes";
import { combineReducers } from "redux";

function counterReducer(state = 0, action) {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    default:
      return state;
  }
}

function themeReducer(state = { value: "light", disabled: false }, action) {
  switch (action.type) {
    case CHANGE_THEME:
      return { ...state, value: action.payload };
    case DISABLE_BUTTONS:
      return { ...state, disabled: true };
    case ENABLE_BUTTONS:
      return { ...state, disabled: false };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  counter: counterReducer,
  theme: themeReducer,
});

export default rootReducer;
