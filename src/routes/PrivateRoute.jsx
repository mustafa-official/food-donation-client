import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import ReactLoading from "react-loading";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading)
    return (
      <div className="flex min-h-[calc(100vh-80px)] justify-center items-center">
        <ReactLoading type="spin" color="#ffff" height={30} width={30} />
      </div>
    );

  if (user) {
    return children;
  }
  return (
    <Navigate state={location.pathname} replace={true} to="/login"></Navigate>
  );
};

export default PrivateRoute;
PrivateRoute.propTypes = {
  children: PropTypes.node,
};
