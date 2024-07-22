import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const UserProtectedRoute = ({ element, ...rest }) => {
    const user = useSelector(state => state.auth.user);

    if (!user) {
        return <Navigate to="/" replace />;
    }

    return element;
};

export default UserProtectedRoute;