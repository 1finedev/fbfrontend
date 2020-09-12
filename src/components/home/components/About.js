import React from 'react'
import { Globe, Zap, Cpu } from 'react-feather'
// import moduleName from 'react-'

function About() {
    return (
        <section className="fb-landing__about" id="about">
            <h2 className="fb-landing__heading" data-aos="fade-down">
                Why Fortè bridge
            </h2>

            <div className="fb-landing__about__cards">
                <article className="fb-landing__about__card"data-aos="fade-right">
                    <div className="fb-landing__about__card__icon">
                        <Globe className="feather" />
                    </div>
                    <h4 className="fb-landing__about__card__title ">World wide shipping</h4>
                    <p>
                        We ship worldwide to any country in the world, location doesn’t hinder our efficiency
                    </p>
                </article>
                <article className="fb-landing__about__card" data-aos="fade" data-aos-duration="2000">
                    <div className="fb-landing__about__card__icon">
                        <Zap className="feather" />
                    </div>
                    <h4 className="fb-landing__about__card__title">Fast shipping</h4>
                    <p>
                        Our shipping speed top notch, you can get your goods within 7 days of posting
                    </p>
                </article>
                <article className="fb-landing__about__card" data-aos="fade-left">
                    <div className="fb-landing__about__card__icon">
                        <Cpu className="feather" />
                    </div>
                    <h4 className="fb-landing__about__card__title">World wide shipping</h4>
                    <p>
                        You can always track where your goods are and automatically get notified when it arrives
                    </p>
                </article>
            </div>
        </section>
    )
}

export default About
