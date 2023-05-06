import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Login } from "../pages";
const LoggedInRoutes = () => {
  const { user } = useSelector((state) => state.user);
  return user ? <Outlet /> : <Login />;
};

export default LoggedInRoutes;
