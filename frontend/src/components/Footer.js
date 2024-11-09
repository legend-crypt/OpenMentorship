import React from "react";
import githubIcon from "../assets/images/iconGitHub.svg";
import instagramIcon from "../assets/images/iconInstagram.svg";
import twitterIcon from "../assets/images/iconTwitter.svg";
import "../css/footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      {/* <div className="container footer">
          <div className="footer__socials" style={{color: "white"}}>
              <a id="socials" href="#"><img src={githubIcon} className='socials__svg'></img></a>
              <a id="socials" href="#"><img src={instagramIcon} className='socials__svg'></img></a>
              <a id="socials" href="#"><img src={twitterIcon} className='socials__svg'></img></a>
          </div>
          <div className="footer__text">
              <p>© 2024 SkillUp</p>
          </div>
        </div> */}
      {/* <div className="icon-container">
          <a href="https://www.instagram.com/konadulord/">
            <img src={instagramIcon} alt="Instagram Icon" width={30} />
          </a>
          <p>Instagram</p>
        </div>
        <div className="icon-container">
          <a href="https://twitter.com/konadulord">
            <img src={twitterIcon} alt="Twitter Icon" width={30} />
          </a>
          <p>Twitter</p>
        </div> */}
    </footer>
  );
};

export default Footer;
