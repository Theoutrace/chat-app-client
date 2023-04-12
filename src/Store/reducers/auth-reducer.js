import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "auth",
  initialState: { email: null, login: false, name: null, token: null },
  reducers: {
    login(state, action) {
      state.email = action.payload.email;
      state.login = true;
      state.token = action.payload.token;
    },

    logout(state, action) {
      state.email = null;
      state.login = false;
      state.token = null;
    },
  },
});

export const AuthActions = AuthSlice.actions;
export default AuthSlice.reducer;
