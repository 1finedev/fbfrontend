import React from 'react'
import { Globe, Zap, Cpu } from 'react-feather'
// import moduleName from 'react-'

function About() {
    return (
        <section class="fb-landing__about" id="about">
            <h2 class="fb-landing__heading" data-aos="fade-down">
                Why Fortè bridge
            </h2>

            <div class="fb-landing__about__cards">
                <article class="fb-landing__about__card"data-aos="fade-right">
                    <div class="fb-landing__about__card__icon">
                        {/* <i data-feather="globe"></i> */}
                        <Globe className="feather" />
                    </div>
                    <h4 class="fb-landing__about__card__title ">World wide shipping</h4>
                    <p>
                        We ship worldwide to any country in the world, location doesn’t hinder our efficiency
                    </p>
                </article>
                <article class="fb-landing__about__card" data-aos="fade" data-aos-duration="2000">
                    <div class="fb-landing__about__card__icon">
                        {/* <i data-feather="zap"></i> */}
                        <Zap className="feather" />
                    </div>
                    <h4 class="fb-landing__about__card__title">Fast shipping</h4>
                    <p>
                        Our shipping speed top notch, you can get your goods within 7 days of posting
                    </p>
                </article>
                <article class="fb-landing__about__card" data-aos="fade-left">
                    <div class="fb-landing__about__card__icon">
                        {/* <i data-feather="cpu"></i> */}
                        <Cpu className="feather" />
                    </div>
                    <h4 class="fb-landing__about__card__title">World wide shipping</h4>
                    <p>
                        You can always track where your goods are and automatically get notified when it arrives
                    </p>
                </article>
            </div>
        </section>
    )
}

export default About
