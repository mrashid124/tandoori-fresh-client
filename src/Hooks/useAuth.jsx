import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';

const useAuth = () => {
    const authentication = useContext(AuthContext);
    return authentication;
};

export default useAuth;