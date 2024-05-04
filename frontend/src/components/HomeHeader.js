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
  const userType = useSelector((state) => state.userRole.role);
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
    }]
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header__content">
          <Link to="/" className="logo text-decoration-none">
            OpenMentors
          </Link>

          {/* -- for larger screen ---  */}
            <ul className={`${width >= 768 ? "block" : "hidden"} flex`} >
              {/* if user type is mentee */}
              {loginStatus &&
                (userType === "Mentee" ? (
                  linksData.userTypeMentee.map((link, index) => (
                    <li key={index} className='m-2'>
                      <Link to={link.link} onClick={closeMenu}>{link.linktext}</Link>
                    </li>
                  ))
                ) : (
                  userType === "Mentor" && (
                    linksData.userTypeMentor.map((link, index) => (
                      <li key={index} className='m-2'>
                        <Link to={link.link} onClick={closeMenu}>{link.linktext}</Link>
                      </li>
                    ))
                  )
                ))
              }
              <li className='m-2'>
                <Link to="/open-source" onClick={closeMenu} >Projects</Link>
              </li>
              <li className='m-2'>
                <Link to="/blogs" onClick={closeMenu} >Blogs</Link>
              </li>
            </ul>
          <div className={`menu-icon ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
            <img src={menuOpen ? close : hamburger} alt="Menu" />
          </div>

          <nav className={`nav ${menuOpen ? 'open' : ''}`}>
            <div className="wrapper">

              {loginStatus ? (
                <div className="user-info">
                  <Cta btnClass="bg-transparent text-white font-semibold hover:text-sky-400 py-2 px-4 border border-red-600	 hover:border-transparent rounded" clickHandler={() => dispatch(logOutUser())}>
                    Logout
                  </Cta>
                </div>
              ) : (
                <div className="auth-links">
                  <Link className='text-decoration-none' to="/signIn" onClick={closeMenu}>
                    <span>Login</span>
                  </Link>
                  <Link className='text-decoration-none' to="/signUp" onClick={closeMenu}>
                    <span>Sign Up</span>
                  </Link>
                </div>
              )}

              {/* --- for smaller screen ----  */}
                <ul className={`${width >= 768 ? "hidden" : "block"}`} >
                  {/* if user type is mentee */}
                  {loginStatus &&
                    (userType === "Mentee"

                      ? linksData.userTypeMentee.map((link, index) => (
                          <li key={index}>
                            <Link to={link.link} onClick={closeMenu}>
                              {link.linktext}
                            </Link>
                          </li>
                        ))
                      :(
                        linksData.userTypeMentor.map((link, index) => (
                          <li key={index} className="m-2">
                            <Link to={link.link} onClick={closeMenu}>
                              {link.linktext}
                            </Link>
                          </li>
                        )))
                    )
                  }
                  <li className='m-2'>
                    <Link to="/open-source" onClick={closeMenu} >Projects</Link>
                  </li>
                  <li className='m-2'>
                    <Link to="/blogs" onClick={closeMenu} >Blogs</Link>
                  </li>
                </ul>
              <label htmlFor="menu-btn" className="btn menu-btn"><i className="fas fa-bars"></i></label>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default HomeHeader;
