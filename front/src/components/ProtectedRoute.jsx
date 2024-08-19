import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { verifyTokenAction } from "../redux/slices/atuhSlice";
const ProtectedRoute = () => {
  const navigation = useNavigate();
  const authenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyTokenAction());
  },[dispatch, authenticated]);
 
  useEffect(() => {
    if (!authenticated) {
      navigation("/login");
    }
  }, [authenticated, navigation]);

  return <Outlet />;
};

export default ProtectedRoute;