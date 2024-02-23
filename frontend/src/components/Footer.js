import React from 'react';
import githubIcon from '../assets/images/iconGitHub.svg';
import instagramIcon from '../assets/images/iconInstagram.svg';
import twitterIcon from '../assets/images/iconTwitter.svg';
import '../css/footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="footer-icons">
        <div className="icon-container">
          <a href="https://github.com/example">
            <img src={githubIcon} alt="GitHub Icon" width={30} />
          </a>
          <p>GitHub</p>
        </div>
        <div className="icon-container">
          <a href="https://instagram.com/example">
            <img src={instagramIcon} alt="Instagram Icon" width={30} />
          </a>
          <p>Instagram</p>
        </div>
        <div className="icon-container">
          <a href="https://twitter.com/example">
            <img src={twitterIcon} alt="Twitter Icon" width={30} />
          </a>
          <p>Twitter</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
