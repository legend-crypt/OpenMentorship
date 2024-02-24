// CarouselFadeExample.js
import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import exampleImage1 from '../components/ExampleCarouselImage1.png';
import exampleImage2 from '../components/ExampleCarouselImage2.png';
import exampleImage3 from '../components/ExampleCarouselImage3.png';
import '../css/carousel.css'; // Add your CSS file path



function CarouselFadeExample() {
  return (
    <Carousel fade className="custom-carousel">
      {/* First Slide */}
      <Carousel.Item>
        <img src={exampleImage1} alt="First slide" />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>

      {/* Second Slide */}
      <Carousel.Item>
        <img src={exampleImage2} alt="Second slide" />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>

      {/* Third Slide */}
      <Carousel.Item>
        <img src={exampleImage3} alt="Third slide" />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselFadeExample;
