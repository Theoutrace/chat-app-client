import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth-reducer";
import chatReducer from "./reducers/chat-reducer";

const Store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
  },
});

export default Store;
