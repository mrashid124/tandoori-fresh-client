import React from 'react';
import { Outlet } from 'react-router-dom';
const AuthLayout = () => {
    return (
        <div className="container w-11/12 mx-auto px-10 md:pt-16 lg:pt-24">
            
            <Outlet></Outlet>
        </div>
    );
};

export default AuthLayout;