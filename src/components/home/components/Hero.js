import React from 'react'
import HeroImage from '../images/hero-img.gif'
import { Globe } from 'react-feather'

function Hero() {
    return (
        <section className="fb-landing__hero">
            <div className="fb-landing__hero__left">
                <p className="fb-landing__hero__info" data-aos="fade-down">Trusted by OVER 100K merchants worldwide
                    {/* <i data-feather="globe"></i> */}
                    <Globe className="feather" />
                </p>
                <h1 className="fb-landing__hero__heading" data-aos="fade">
                    Ship goods from turkey to Nigeria or anywhere else in the world
                </h1>
                <p className="fb-landing__hero__sub-text">Dead simple digitalized shipping, that just works</p>
                <div className="fb-landing__hero__track-form">
                    <input type="text" placeholder="Enter tracking code" />
                    <button className="fb-btn fb-btn--sm fb-btn--accent">Track</button>
                </div>
            </div>
            <div className="fb-landing__hero__right">
                <figure className="fb-landing__hero__right__img">
                    <img src={HeroImage} alt="" />
                </figure>
            </div>
        </section>
    )
}

export default Hero
