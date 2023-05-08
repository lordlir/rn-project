import Auth from "../components/Auth";
import Home from "../Screens/Home/Home";

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return <Auth />;
  }
  return <Home />;
};
