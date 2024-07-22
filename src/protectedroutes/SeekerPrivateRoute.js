import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Userprotectedroute = ({ element, ...rest }) => {
    const user = useSelector(state => state.auth.user);
    const userRole = user ? user.role : null;

    if (userRole !== 'Seeker') {
        return <Navigate to="/" replace />;
    }

    return element;
};

export default Userprotectedroute;


