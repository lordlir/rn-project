import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth/react-native";
import { auth } from "../../firebase/config";
import { authStateChange, logout, updateUserProfile } from "./authReducer";

export const authSingUpUser =
  ({ login, email, password, avatar }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(auth.currentUser, {
        displayName: login,
        photoURL: avatar,
      });

      const user = auth.currentUser;

      const payload = {
        userId: user.uid,
        userName: user.displayName,
        userEmail: user.email,
        userAvatar: user.photoURL,
      };

      dispatch(updateUserProfile(payload));

      console.log("user", user);
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };

export const authSingInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      console.log("user", user);
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };

export const authSingOutUser = () => async (dispatch, getState) => {
  try {
    await signOut(auth);
    dispatch(logout());
  } catch (error) {
    alert(error.message);
  }
};

export const getCurrentUser = () => async (dispatch, getState) => {
  try {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const payload = {
          userId: user.uid,
          userName: user.displayName,
          userEmail: user.email,
          userAvatar: user.photoURL,
        };

        dispatch(updateUserProfile(payload));
        dispatch(authStateChange({ isAuth: true }));
      }
    });
  } catch (error) {
    alert(error.message);
  }
};
