import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
export default function ImageSlider({ images }) {
  return (
    <Carousel
      autoPlay
      interval="3000"
      transitionTime="500"
      infiniteLoop="true"
      thumbWidth={40}
    >
      {images.map((image) => {
        return (
          <div className="slide" key={image}>
            <img src={image} alt="임의지 엌" />
          </div>
        );
      })}
    </Carousel>
  );
}
