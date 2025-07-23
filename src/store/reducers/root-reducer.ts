import { combineReducers } from "@reduxjs/toolkit";
import speechReducer from "./audio-reducer";

const rootReducer = combineReducers({
  speech: speechReducer,
});

export default rootReducer;
