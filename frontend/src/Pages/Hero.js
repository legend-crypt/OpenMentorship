import React from 'react'
import mentor from '../assets/images/video_session.png';
import '../assets/styles/style.css';
import { Link } from 'react-router-dom';
import HomeHeader from '../components/HomeHeader';
import Footer from '../components/Footer';

export default function Hero() {
  return (
    <div>
        <HomeHeader />

        <div className='container'>
            <main className="hero">
                <section className="hero__text">
                    <h1 id='hero--heading_text'>Welcome to your one-stop for all things <br />mentoring</h1>
                    <p id='hero--normal_text'>Get one-on-one mentorship from  world class engineers and developers</p>
                    <Link to="/mentors"><button id="btn__cta">Find A Mentor</button></Link>
                </section>
                <div className='hero_sub--section row'>
                    <ul className='hero_sub--list'>
                        <li className='hero--list'>- Have one-on-one video chat  with world class experts</li>
                        <li className='hero--list'>- Schedule meetings with multiple experts</li>
                        <li className='hero--list'>- Withdraw from meetings whenever you like</li>
                    </ul>
                    <div className='hero_sub--section-image'><img src={mentor} alt="Smiling Woman"/></div>

                </div>
                
            </main>
        </div>
        <Footer />
    </div>
  )
}
