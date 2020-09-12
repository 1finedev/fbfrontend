import React from 'react'

function Footer() {
    return (
        <footer class="fb-landing__footer">
            <nav class="fb-landing__footer__nav">
                <div class="fb-landing__footer__nav__section">
                    <h4 data-aos="fade-up">Useful Links</h4>
                    <ul class="fb-landing__footer__nav__list">
                        <li class="fb-landing__footer__nav__item" data-aos="fade-up">
                            <a href="" class="fb-landing__footer__nav__link">Track shipment</a>
                        </li>
                        <li class="fb-landing__footer__nav__item" data-aos="fade-up">
                            <a href="" class="fb-landing__footer__nav__link">Become an agent</a>
                        </li>
                    </ul>
                </div>
                <div class="fb-landing__footer__nav__section">
                    <h4 data-aos="fade-up">Office Locations</h4>
                    <ul class="fb-landing__footer__nav__list">
                        <li class="fb-landing__footer__nav__item" data-aos="fade-up">
                            <span>Lorem, Ipsuim address 1, Turkey</span>
                        </li>
                        <li class="fb-landing__footer__nav__item" data-aos="fade-up">
                            <span>Lorem, Ipsuim address 2, Lagos, Nigeria</span>
                        </li>
                    </ul>
                </div>
                <div class="fb-landing__footer__nav__section">
                    <h4 data-aos="fade-up">Accredited Agents</h4>
                    <ul class="fb-landing__footer__nav__list" data-aos="fade-up">
                        <li class="fb-landing__footer__nav__item">
                            <span>Person 1, <a href="mailto:personemail@gmail.com" class="fb-landing__footer__nav__link">personemail@gmail.com</a>, <a href="" class="fb-landing__footer__nav__link">+907847849</a></span>
                        </li>
                        <li class="fb-landing__footer__nav__item" data-aos="fade-up">
                            <span>Person 2, <a href="mailto:personemail@gmail.com" class="fb-landing__footer__nav__link">personemail@gmail.com</a>, <a href="" class="fb-landing__footer__nav__link">+907847849</a></span>
                        </li>
                    </ul>
                </div>
            </nav>
            <div class="fb-landing__footer__copy">
                &copy; 2020 Fortè bridge Global Logistics
            </div>
        </footer>
    )
}

export default Footer
