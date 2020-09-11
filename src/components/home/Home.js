import React, { useEffect } from 'react';
// import Slideshow from './Slideshow';
// import './home.css';
import './landing.css';
import Header from './components/Header'
import Hero from './components/Hero';
import About from './components/About';
import HIW from './components/HIW';
import Testimonial from './components/Testimonial';
import Footer from './components/Footer';

const Home = () => {

  document.body.classList.remove("log");
  
  useEffect(() => {
    const appHeader = document.querySelector(".app-header");
    appHeader.remove();
    window.AOS.init({
        duration: 1000
    });
  }, []);

  return (
    <div>
      <Header />
      <Hero />
      <About />
      <HIW />
      <Testimonial />
      <Footer />
    </div>
  );
};

export default Home;
