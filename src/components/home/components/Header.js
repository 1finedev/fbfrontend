import React from 'react'

function Header() {
    return (
        <header className="fb-landing__header">
            <h4 className="fb-landing__header__brand">Fortè bridge GL</h4>
            <input type="checkbox" id="fb-nav__checkbox" className="fb-nav__checkbox" />
            <label htmlFor="fb-nav__checkbox" className="fb-nav__toggle">
                <div className="fb-nav__toggle__inner"></div>
            </label>
            <div className="fb-nav__overlay"></div>
            <nav className="fb-landing__header__nav">
                <ul className="fb-landing__header__nav__list">
                    <li className="fb-landing__header__nav__item">
                        <a href="#about" className="fb-landing__header__nav__link">About</a>
                    </li>
                    <li className="fb-landing__header__nav__item">
                        <a href="#hiw" className="fb-landing__header__nav__link">How it works</a>
                    </li>
                    <li className="fb-landing__header__nav__item">
                        <a href="#testimonial" className="fb-landing__header__nav__link">Testimonial</a>
                    </li>
                    <li className="fb-landing__header__nav__item">
                        <a href="/login" className="fb-landing__header__nav__link">Login</a>
                    </li>
                    <li className="fb-landing__header__nav__item">
                        <a className="fb-btn fb-btn--sm fb-btn--accent" href="/register">Agent Signup</a>
                    </li>
                </ul>
             </nav>
        </header>
    )
}

export default Header
