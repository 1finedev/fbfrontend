import React, { useState } from 'react';
import cargo1 from './../assets/cargo1.jpg';
import cargo2 from './../assets/cargo2.jpg';
import cargo3 from './../assets/cargo3.jpg';
import cargo4 from './../assets/cargo4.jpg';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';

const items = [
  {
    src: cargo4,
    altText: 'Slide 1',
    caption: ' Forte Bridge Global Logistics'
  },
  {
    src: cargo3,
    altText: 'Slide 2',
    caption: 'Fast and convenient service to the World!'
  },
  {
    src: cargo2,
    altText: 'Slide 3',
    caption: 'Speed & Goods Security!'
  },
  {
    src: cargo1,
    altText: 'Slide 4',
    caption: 'Fast response and 24/7 client support'
  }
];

const Slideshow = props => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = newIndex => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map(item => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img
          className="d-block img-fluid h-60"
          src={item.src}
          alt={item.altText}
        />
        <CarouselCaption
          captionText={item.caption}
          captionHeader={item.caption}
        />
      </CarouselItem>
    );
  });

  return (
    <Carousel activeIndex={activeIndex} next={next} previous={previous}>
      <CarouselIndicators
        items={items}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
      />
      {slides}
      <CarouselControl
        direction="prev"
        directionText="Previous"
        onClickHandler={previous}
      />
      <CarouselControl
        direction="next"
        directionText="Next"
        onClickHandler={next}
      />
    </Carousel>
  );
};

export default Slideshow;
