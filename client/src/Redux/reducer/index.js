import { combineReducers } from "redux";
import persistReducer from "redux-persist/lib/persistReducer";
import storage from "redux-persist/lib/storage";
import cartSlice from "./cartSlice";
import searchSlice from "./searchSlice";
import userSlice from "./userSlice";

const persistConfig = {
  key: "root",
  storage,
};

const reducers = combineReducers({
  cart: cartSlice,
  search: searchSlice,
  user: userSlice,
});

export const persistedReducer = persistReducer(persistConfig, reducers);
