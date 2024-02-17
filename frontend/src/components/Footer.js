import React from 'react'
import github from '../assets/images/iconGitHub.svg';
import instagram from '../assets/images/iconInstagram.svg';
import twitter from '../assets/images/iconInstagram.svg';

export default function Footer() {
  return (
    <footer className=""> 
        <div className="container footer">
          <div className="footer__socials" style={{color: "white"}}>
              <a id="socials" href="#"><img src={github} className='socials__svg'></img></a>
              <a id="socials" href="#"><img src={instagram} className='socials__svg'></img></a>
              <a id="socials" href="#"><img src={twitter} className='socials__svg'></img></a>
          </div>
          <div className="footer__text">
              <p>© 2023 SkillUp</p>
          </div>
        </div>
    </footer>

  )
}
