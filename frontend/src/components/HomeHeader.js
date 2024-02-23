import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import hamburger from '../assets/images/hamburger.svg';
import close from '../assets/images/close.svg';
import { useSelector, useDispatch } from 'react-redux';
import { logOutUser } from '../store/slices/userAuth/userAuthSlice';
import Cta from './Cta';

import '../css/headers.css';

const HomeHeader = () => {
  const dispatch = useDispatch();
  const { loginStatus } = useSelector((state) => state.userAuth);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__content">
          <Link to="/" className="logo">
            SkillUp
          </Link>

          <div className={`menu-icon ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
            <img src={menuOpen ? close : hamburger} alt="Menu" />
          </div>

          <nav className={`nav ${menuOpen ? 'open' : ''}`}>
            <div className="wrapper">
                
                {loginStatus ? (
                <div className="user-info">
                    <span>Welcome, User</span>
                    <Cta className="bg-red-400" clickHandler={() => dispatch(logOutUser())}>
                    Logout
                    </Cta>
                </div>
                ) : (
                <div className="auth-links">
                    <Link to="/signIn" onClick={closeMenu}>
                    <span>Login</span>
                    </Link>
                    <Link to="/signUp" onClick={closeMenu}>
                    <Cta>Sign Up</Cta>
                    </Link>
                </div>
                )}
                <label htmlFor="menu-btn" className="btn menu-btn"><i className="fas fa-bars"></i></label>
            </div>
            </nav>

            </div>
      </div>
    </header>
  );
};

export default HomeHeader;
