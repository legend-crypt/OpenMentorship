import React, {useState} from 'react';
import { Link } from "react-router-dom";
import hamburger from '../assets/images/hamburger.svg';
import close from '../assets/images/close.svg';

function Header() {
    const [clicked, setClicked] = useState(false)

    const handleClick = () => {
        if (clicked) {
            setClicked(false)
        }
        else{
            setClicked(true)
        }
    }
  return (
            <header className="header">
                <nav className='nav container'>
                    <ul className="mentor__links">
                            <Link to="/" className='logo'>SkillUp</Link>
                            <div id="nav__left" className={clicked? "#nav__left active": "#nav__left"}>
                                <li className='nav__right'><Link>Mentors</Link></li>                        <li className='nav__right'><Link>Meetings</Link></li>
                            </div>
                            <div className='menu'>
                                <button className="menu__button"><img src={!clicked ? hamburger: close} alt='menu' onClick={handleClick}/></button>
                            </div>

                    </ul>
                </nav>
            </header>

  )
}

export default Header