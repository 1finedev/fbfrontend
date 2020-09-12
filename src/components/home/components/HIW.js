import React from 'react'
import AirplaneImage from '../images/airplane.png'

function HIW() {
    return (
        <section class="fb-landing__hiw" id="hiw">
            <h2 class="fb-landing__heading" data-aos="fade-down" style={{textAlign: 'center'}}>
                How it works
            </h2>
            <div class="fb-landing__hiw__main">
                <div class="fb-landing__hiw__left">
                    <ul class="fb-landing__hiw__list">
                        <li class="fb-landing__hiw__item" data-aos="fade-up">
                            <h4>Drop Shipment</h4>
                            <p>An agent drops your shipment at any of our offices worldwide</p>
                        </li>
                        <li class="fb-landing__hiw__item" data-aos="fade-up" data-aos-delay="200">
                            <h4>Package shipment</h4>
                            <p>We carefully package, weigh and record your shipment, so you can start tracking</p>
                        </li>
                        <li class="fb-landing__hiw__item" data-aos="fade-up" data-aos-delay="400">
                            <h4>Ship Package</h4>
                            <p>Your package is put on the next cargo and delivered within 7 days</p>
                        </li>
                        <li class="fb-landing__hiw__item" data-aos="fade-up" data-aos-delay="600">
                            <h4>Pickup Package</h4>
                            <p>Once your shipment arrives, we send you a notification, so you can pick it up</p>
                        </li>
                    </ul>
                </div>
                <div class="fb-landing__hiw__right" data-aos="fade-right">
                    <figure class="fb-landing__hiw__right__img">
                        <img src={AirplaneImage} alt="" />
                    </figure>
                </div>
            </div>
        </section>
    )
}

export default HIW
