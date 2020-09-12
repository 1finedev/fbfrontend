import React from 'react'

function Footer() {
    return (
        <footer className="fb-landing__footer">
            <nav className="fb-landing__footer__nav">
                <div className="fb-landing__footer__nav__section">
                    <h4 data-aos="fade-up">Useful Links</h4>
                    <ul className="fb-landing__footer__nav__list">
                        <li className="fb-landing__footer__nav__item" data-aos="fade-up">
                            <a href="" className="fb-landing__footer__nav__link">Track shipment</a>
                        </li>
                        <li className="fb-landing__footer__nav__item" data-aos="fade-up">
                            <a href="/register" className="fb-landing__footer__nav__link">Become an agent</a>
                        </li>
                    </ul>
                </div>
                <div className="fb-landing__footer__nav__section">
                    <h4 data-aos="fade-up">Office Locations</h4>
                    <ul className="fb-landing__footer__nav__list">
                        <li className="fb-landing__footer__nav__item" data-aos="fade-up">
                            <span>Lorem, Ipsuim address 1, Turkey</span>
                        </li>
                        <li className="fb-landing__footer__nav__item" data-aos="fade-up">
                            <span>Lorem, Ipsuim address 2, Lagos, Nigeria</span>
                        </li>
                    </ul>
                </div>
                <div className="fb-landing__footer__nav__section">
                    <h4 data-aos="fade-up">Accredited Agents</h4>
                    <ul className="fb-landing__footer__nav__list" data-aos="fade-up">
                        <li className="fb-landing__footer__nav__item">
                            <span>Person 1, <a href="mailto:personemail@gmail.com" className="fb-landing__footer__nav__link">personemail@gmail.com</a>, <a href="" className="fb-landing__footer__nav__link">+907847849</a></span>
                        </li>
                        <li className="fb-landing__footer__nav__item" data-aos="fade-up">
                            <span>Person 2, <a href="mailto:personemail@gmail.com" className="fb-landing__footer__nav__link">personemail@gmail.com</a>, <a href="" className="fb-landing__footer__nav__link">+907847849</a></span>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="fb-landing__footer__copy">
                &copy; 2020 Fortè bridge Global Logistics
            </div>
        </footer>
    )
}

export default Footer
