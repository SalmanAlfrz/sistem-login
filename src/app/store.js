import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../components/authSlice";
import logger from "redux-logger";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});