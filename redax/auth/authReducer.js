import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  userName: null,
  userEmail: null,
  userAvatar: null,
  isAuth: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      userName: payload.userName,
      userEmail: payload.userEmail,
      userAvatar: payload.userAvatar,
    }),

    logout: (state, { payload }) => ({
      ...initialState,
    }),

    authStateChange: (state, { payload }) => {
      return {
        ...state,
        isAuth: payload.isAuth,
      };
    },
  },
});
export const { updateUserProfile, logout, authStateChange } = authSlice.actions;

export const selectUserId = (state) => state.auth.userId;
export const selectUserName = (state) => state.auth.userName;
export const selectUserEmail = (state) => state.auth.userEmail;
export const selectUserAvatar = (state) => state.auth.userAvatar;
export const selectIsAuth = (state) => state.auth.isAuth;
