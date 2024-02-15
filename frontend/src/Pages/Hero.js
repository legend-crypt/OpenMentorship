import React from 'react'
import mentor from '../assets/images/video_session.png';
import '../assets/styles/style.css';
import { Link } from 'react-router-dom';
import HomeHeader from '../components/HomeHeader';
import Footer from '../components/Footer';
import community_icon from '../assets/images/fluent_people-community-32-filled.svg';
import small from '../assets/images/eva_pie-chart-fill.svg';
import start_today from '../assets/images/eva_trending-up-outline.svg';
import potential from '../assets/images/simple-icons_boosty.svg';
import arrow from '../assets/images/ph_arrow-up-right.svg';

export default function Hero() {
  return (
    <div>
        <HomeHeader />

        <div className='container'>
            <main className="hero">
                <section className="hero__text">
                    <h1 id='hero--heading_text'>Welcome to your one-stop for all things <br />Open Source</h1>
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
        <section className='hero_footer'>
                <div className="container">
                    <div className='hero_footer--dflex'>
                        <div className='hero_footer--col hero_footer--left'>
                            <h2 className='hero_footer--heading'>Why Choose Open Mentors</h2>
                            <p>Embark on your journey into the vibrant world of open source with us. Whether you're a seasoned developer or just starting out, our platform is your gateway to endless opportunities for learning, collaboration, and contribution.</p>
                            <button class='hero_btn'>Get started Today<img src={arrow}/></button>
                        </div>
                        <div className='hero_footer--col hero_footer--right'>
                            <div className='hero_footer--dflex'>
                                <div className='hero_footer--col-row'>
                                    <img src={community_icon} alt="community"/>
                                    <h3>Why Open Source Matters</h3>
                                    <p>Open source isn't just about code; it's about community, innovation, and making a positive impact on the world. By joining the open source movement, you're not only honing your skills but also becoming part of something bigger than yourself.</p>
                                </div>
                                <div className='hero_footer--col-row'>
                                    <img src={small} alt="community"/>
                                    <h3>Start Small, Dream Big</h3>
                                    <p>Every contribution, no matter how small, makes a difference in the world of open source. Begin your journey with us and witness the transformative power of collaboration..</p>
                                </div>
                            </div>
                            <div className='hero_footer--dflex'>
                                <div className='hero_footer--col-row'>
                                    <img src={potential} alt="community"/>
                                    <h3>Unlock Your Potential:</h3>
                                    <p>Ready to dive in? Explore a multitude of projects spanning various domains, each offering a unique chance to sharpen your skills, build your portfolio, and connect with like-minded individuals from around the globe.</p>
                                </div>
                                <div className='hero_footer--col-row'>
                                    <img src={start_today} alt="community"/>
                                    <h3>Open Source, Open Doors</h3>
                                    <p>Explore new horizons, expand your network, and enhance your career prospects by becoming an active participant in the open-source ecosystem. The opportunities are limitless.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </section>
        <Footer />
    </div>
  )
}
