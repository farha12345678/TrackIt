import { useContext } from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { PropTypes } from 'prop-types';
import { AuthContext } from './../Providers/AuthProvider';
import Loading from "../Components/Loader/Loading";

const PrivateRoutes = ({ children }) => {
    const { user, loader } = useContext(AuthContext);
    const location = useLocation();

    if (loader) {
        return <Loading />;
    }

    if (!user) {
        // Redirects to the login page and preserves the attempted URL in `state`
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children ? <div>{children}</div> : <Outlet />;
};

PrivateRoutes.propTypes = {
    children: PropTypes.node
};

export default PrivateRoutes;
