import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import hamburger from '../assets/images/hamburger.svg';
import close from '../assets/images/close.svg';
import { useSelector, useDispatch } from 'react-redux';
import { logOutUser } from '../store/slices/userAuth/userAuthSlice';
import Cta from './Cta';

import '../css/headers.css';
import useWindowSize from '../hooks/useWindowSize';

const HomeHeader = () => {
  const dispatch = useDispatch();
  const { loginStatus, userDetails } = useSelector((state) => state.userAuth);
  const [menuOpen, setMenuOpen] = useState(false);
  const { width } = useWindowSize(); // costume hook for window size 

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const linksData = {
    userTypeMentee: [{
      link: "/profile",
      linktext: "Profile",
    }, {
      link: "/mentors",
      linktext: "Mentors",
    }, {
      link: "/meeting",
      linktext: "Meetings",
    }, {
      link: "/blogs",
      linktext: "Blogs",
    }, {
      link: "/open-source",
      linktext: "Open Source",
    }],
    userTypeMentor: [{
      link: "/profile",
      linktext: "Profile",
    }, {
      link: "/student-request",
      linktext: "Students",
    }, {
      link: "/meeting",
      linktext: "Meetings",
    },{
      link: "/blogs",
      linktext: "Blogs",
    }, {
      link: "/open-source",
      linktext: "OpenSource",
    }]
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header__content">
          <Link to="/" className="logo text-decoration-none">
            SkillUp
          </Link>

          {/* -- for larger screen ---  */}
          {loginStatus &&
            <ul className={`${width >= 768 ? "block" : "hidden"} flex`} >
              {/* if user type is mentee */}
              {/* {linksData.userTypeMentee.map((link, index) => {
                return <li key={index} className='m-2' >
                  <Link to={link.link} onClick={closeMenu} >{link.linktext}</Link>
                </li>
              })} */}

              {/* if user type is mentor */}
              {linksData.userTypeMentor.map((link, index) => {
                    return <li key={index} className='m-2'>
                      <Link to={link.link} onClick={closeMenu} >{link.linktext}</Link>
                    </li>
                  })}
            </ul>
          }

          <div className={`menu-icon ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
            <img src={menuOpen ? close : hamburger} alt="Menu" />
          </div>

          <nav className={`nav ${menuOpen ? 'open' : ''}`}>
            <div className="wrapper">

              {loginStatus ? (
                <div className="user-info">
                  <span>Welcome, User</span>
                  <Cta className="border p-2 bg-red-500" clickHandler={() => dispatch(logOutUser())}>
                    Logout
                  </Cta>
                </div>
              ) : (
                <div className="auth-links">
                  <Link  className='text-decoration-none' to="/signIn" onClick={closeMenu}>
                    <span>Login</span>
                  </Link>
                  <Link  className='text-decoration-none' to="/signUp" onClick={closeMenu}>
                    <span>Sign Up</span>
                  </Link>
                </div>
              )}

              {/* --- for smaller screen ----  */}
              {loginStatus && <>
                <ul className={`${width >= 768 ? "hidden" : "block"}`} >
                  {/* if user type is mentee */}
                  {linksData.userTypeMentee.map((link, index) => {
                    return <li key={index} >
                      <Link to={link.link} onClick={closeMenu} >{link.linktext}</Link>
                    </li>
                  })}
                  {/* if user type is mentor */}
                </ul>
              </>
              }

              <label htmlFor="menu-btn" className="btn menu-btn"><i className="fas fa-bars"></i></label>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default HomeHeader;
