import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { images } from '../../assets/images';
export default function ImageSlider({ items }) {
  return (
    <Carousel
      autoPlay
      interval="3000"
      transitionTime="500"
      infiniteLoop="true"
      thumbWidth={40}
    >
      {items?.map((item) => {
        return (
          <div className="slide" key={item} style={{ width: '10rem' }}>
            <img
              src={`${images.defalut_url}${item.imgPath}`}
              alt="임의지 엌"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        );
      })}
    </Carousel>
  );
}
