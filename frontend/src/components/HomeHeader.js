import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import hamburger from '../assets/images/hamburger.svg';
import close from '../assets/images/close.svg';
import { useSelector, useDispatch } from 'react-redux' // we will be getting redux states & also update states via this two functions. :: useSelector helps getting state values & useDispatch helps setting up state values
import { loginUser, logOutUser } from '../store/slices/userAuth/userAuthSlice';
import Cta from './Cta';


export default function Home_Header() {
    const dispatch = useDispatch();
    // -- redux states ---
    const { loginStatus } = useSelector((state) => state.userAuth);

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
                            {loginStatus ?
                                <>
                                    <Cta className="bg-red-400 btn__cta" clickHandler={()=>{dispatch(logOutUser())}}  >
                                    Logout
                                    </Cta>
                                </> :
                                <>
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
                                </>
                            }
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
