import React from 'react';
import mentor from '../assets/images/video_session.png';
import '../assets/styles/style.css';
import { Link } from 'react-router-dom';
import communityIcon from '../assets/images/fluent_people-community-32-filled.svg';
import small from '../assets/images/eva_pie-chart-fill.svg';
import startToday from '../assets/images/eva_trending-up-outline.svg';
import potential from '../assets/images/simple-icons_boosty.svg';
import arrow from '../assets/images/ph_arrow-up-right.svg';
import '../css/hero.css';
import { useSpring, animated } from 'react-spring';
import CarouselFadeExample from './CarouselFadeExample';

export default function Hero() {
  // CSS Animation
  const fadeInKeyframes = `
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  `;

  // react-spring Animation
  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1500 },
  });

  return (
    <>
      <style>{fadeInKeyframes}</style>
      <div className='container'>
        {/* CSS Animation */}
          <div className="hero_head">
            <h3 className='hero_head--text'>Welcome to your one-stop for all things OpenSource mentoring</h3>
            <p className='hero_normal--text'>Get one-on-one mentorship from  world class engineers and developers</p>
            <Link to="/mentors" className="hero_btn">
              <button>Find Mentor</button>
            </Link>
          </div>
        <CarouselFadeExample />

        {/* react-spring Animation */}
        <animated.main className="hero" style={fadeIn}>
          <section className='hero_footer'>
              <div className='hero_footer--grid'>
                <div className='hero_footer--col hero_footer--left'>
                  <h2 className='hero_footer--heading'>Why Choose Open Mentors</h2>
                  <p>Embark on your journey into the vibrant world of open source with us. Whether you're a seasoned developer or just starting out, our platform is your gateway to endless opportunities for learning, collaboration, and contribution.</p>
                  <Link to="/signIn" className="hero_btn">
                    Get started Today
                    <img src={arrow} alt="Arrow" />
                  </Link>
                </div>
                <div className='hero_footer--col hero_footer--right'>
                  <div className='hero_footer--dflex'>
                    <div className='hero_footer--col-row'>
                      <img src={communityIcon} alt="community" />
                      <h3>Why Open Source Matters</h3>
                      <p>Open source isn't just about code; it's about community, innovation, and making a positive impact on the world. By joining the open source movement, you're not only honing your skills but also becoming part of something bigger than yourself.</p>
                    </div>
                    <div className='hero_footer--col-row'>
                      <img src={small} alt="community" />
                      <h3>Start Small, Dream Big</h3>
                      <p>Every contribution, no matter how small, makes a difference in the world of open source. Begin your journey with us and witness the transformative power of collaboration..</p>
                    </div>
                  </div>
                  <div className='hero_footer--dflex'>
                    <div className='hero_footer--col-row'>
                      <img src={potential} alt="community" />
                      <h3>Unlock Your Potential:</h3>
                      <p>Ready to dive in? Explore a multitude of projects spanning various domains, each offering a unique chance to sharpen your skills, build your portfolio, and connect with like-minded individuals from around the globe.</p>
                    </div>
                    <div className='hero_footer--col-row'>
                      <img src={startToday} alt="community" />
                      <h3>Open Source, Open Doors</h3>
                      <p>Explore new horizons, expand your network, and enhance your career prospects by becoming an active participant in the open-source ecosystem. The opportunities are limitless.</p>
                    </div>
                  </div>
                </div>
            </div>
          </section>
        </animated.main>
      </div>

    </>
  );
}
