import React from 'react';
import '../css/style.css';
import { Link } from 'react-router-dom';
import communityIcon from '../assets/images/fluent_people-community-32-filled.svg';
import small from '../assets/images/eva_pie-chart-fill.svg';
import startToday from '../assets/images/eva_trending-up-outline.svg';
import potential from '../assets/images/simple-icons_boosty.svg';
import arrow from '../assets/images/ph_arrow-up-right.svg';
import '../css/hero.css';
import { useSpring, animated } from 'react-spring';
import CarouselFadeExample from './CarouselFadeExample';
import img from "../assets/images/hero.svg";
import { useSelector } from 'react-redux';


export default function Hero() {
  const userLogin = useSelector((state) => state.userAuth.loginStatus)

  // CSS Animation
  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1500 },
  });

  return (
    <>
      <div className='container'>
        <div className="min-h-[70vh] flex flex-col md:flex-row md:justify-between items-center mt-16">
          <div className=" md:w-2/4 text-center">
            <h2 className="text-5xl font-semibold leading-tight">
              OpenSource with
              <br/>
              <span className="text-blue-500"> OpenMentors</span>
            </h2>
            <p className=" text-lightText mt-5 text-start">
              Unlock Your Potential with Open Mentors: Dive into a world of personalized mentorship and skill-building opportunities. Our innovative eLearning platform connects you with top-tier engineers and developers for tailored one-on-one guidance.
            </p>
            <Link to="/mentors" className="hero_btn">
                <button>Find Mentor</button>
            </Link>
          </div>
        <div className=" w-full md:w-2/4">
          <img src={img} alt="img" />
        </div>
      </div>
        <animated.main className="hero" style={fadeIn}>
          <section className='hero_footer'>
              <div className='hero_footer--grid'>
                <div className='hero_footer--col hero_footer--left'>
                  <h2 className='hero_footer--heading'>Why Choose Open Mentors</h2>
                  <p>Embark on your journey into the vibrant world of open source with us. Whether you're a seasoned developer or just starting out, our platform is your gateway to endless opportunities for learning, collaboration, and contribution.</p>
                  <Link to={userLogin ? '/blogs': '/signIn'} className="hero_btn">
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
