import React from 'react'
import PersonImage from '../images/person.jpg'

function Testimonial() {
    return (
        <section className="fb-landing__about fb-landing__test" id="testimonial">
            <h2 className="fb-landing__heading" data-aos="fade-down">
                What people say
            </h2>

            <div className="fb-landing__about__cards">
                <article className="fb-landing__about__card fb-landing__test__card" data-aos="flip-left">
                    <h1 className="fb-landing__test__card__quote">“</h1>
                    <blockquote>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce malesuada iaculis neque nec faucibus. Integer sed vehicula quam. Proin vel nibh nec felis ultricies iaculis et vitae erat.</blockquote>
                    <figure className="fb-landing__test__card__img">
                        <img src={PersonImage} alt="" />
                    </figure>
                    <h5>Jane Doe</h5>
                </article>

                <article className="fb-landing__about__card fb-landing__test__card" data-aos="flip-up">
                    <h1 className="fb-landing__test__card__quote">“</h1>
                    <blockquote>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce malesuada iaculis neque nec faucibus. Integer sed vehicula quam. Proin vel nibh nec felis ultricies iaculis et vitae erat.</blockquote>
                    <figure className="fb-landing__test__card__img">
                        <img src={PersonImage} alt="" />
                    </figure>
                    <h5>Jane Doe</h5>
                </article>

                <article className="fb-landing__about__card fb-landing__test__card" data-aos="flip-right">
                    <h1 className="fb-landing__test__card__quote">“</h1>
                    <blockquote>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce malesuada iaculis neque nec faucibus. Integer sed vehicula quam. Proin vel nibh nec felis ultricies iaculis et vitae erat.</blockquote>
                    <figure className="fb-landing__test__card__img">
                        <img src={PersonImage} alt="" />
                    </figure>
                    <h5>Jane Doe</h5>
                </article>
            </div>
        </section>
    )
}

export default Testimonial
