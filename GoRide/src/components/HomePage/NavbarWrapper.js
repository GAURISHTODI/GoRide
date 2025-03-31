import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './NavBar';

const NavbarWrapper = () => {
    const location = useLocation();
    const noNavbarPaths = ['/publish-ride', '/search'];

    return !noNavbarPaths.includes(location.pathname) ? <Navbar /> : null;
};

export default NavbarWrapper;