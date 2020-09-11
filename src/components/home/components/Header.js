import React from 'react'

function Header() {
    return (
        <header class="fb-landing__header">
            <h4 class="fb-landing__header__brand">Fortè bridge GL</h4>
            <input type="checkbox" id="fb-nav__checkbox" class="fb-nav__checkbox" />
            <label for="fb-nav__checkbox" class="fb-nav__toggle">
                <div class="fb-nav__toggle__inner"></div>
            </label>
            <div class="fb-nav__overlay"></div>
            <nav class="fb-landing__header__nav">
                <ul class="fb-landing__header__nav__list">
                    <li class="fb-landing__header__nav__item">
                        <a href="#about" class="fb-landing__header__nav__link">About</a>
                    </li>
                    <li class="fb-landing__header__nav__item">
                        <a href="#hiw" class="fb-landing__header__nav__link">How it works</a>
                    </li>
                    <li class="fb-landing__header__nav__item">
                        <a href="#testimonial" class="fb-landing__header__nav__link">Testimonial</a>
                    </li>
                    <li class="fb-landing__header__nav__item">
                        <a href="/login" class="fb-landing__header__nav__link">Login</a>
                    </li>
                    <li class="fb-landing__header__nav__item">
                        <a class="fb-btn fb-btn--sm fb-btn--accent-light" href="/register">Agent Signup</a>
                    </li>
                </ul>
             </nav>
        </header>
    )
}

export default Header
