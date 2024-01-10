import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import hamburger from '../assets/images/hamburger.svg';
import close from '../assets/images/close.svg';
import { useSelector, useDispatch } from 'react-redux' // we will be getting redux states & also update states via this two functions. :: useSelector helps getting state values & useDispatch helps setting up state values

export default function Home_Header() {

    // -- redux states ---
    const { loginStatus, userDetails } = useSelector((state) => state.userAuth);
  
    // useEffect(()=>{
    //   console.log(loginStatus, userDetails);
    // },[])
    
    const [clicked, setClicked] = useState(false)
    const handleClick = () => {
        if (clicked) {
            setClicked(false)
        }
        else {
            setClicked(true)
        }
    }

    return (
        <>
            {/* <header className="heade">
            <nav className='nav'>
                <ul className="nav__links">
                    <li className='logo'>
                        <a href="#">SkillUp</a>
                    </li>
                    <li className='nav__right'>
                        <Link to="/signIn">
                            <button id="" className='secondary-cta'>Log In</button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/signUp">
                            <button id="btn__cta">Sign Up</button>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header> */}

            <header className="header">
                <nav className='nav container'>
                    <ul className="mentor__links">
                        <Link to="/" className='logo'>SkillUp</Link>
                        <div id="nav__left" className={clicked ? "#nav__left active" : "#nav__left"}>
                            <li className='nav__right'>
                                <Link to="/signIn">
                                    <button id="" className='secondary-cta'>Log In</button>
                                </Link>

                            </li>

                            <li className='nav__right'>
                                <Link to="/signUp">
                                    <button id="btn__cta">Sign Up</button>
                                </Link>
                            </li>
                        </div>
                        <div className='menu'>
                            <button className="menu__button"><img src={!clicked ? hamburger : close} alt='menu' onClick={handleClick} /></button>
                        </div>

                    </ul>
                </nav>
            </header>


        </>
    )
}
