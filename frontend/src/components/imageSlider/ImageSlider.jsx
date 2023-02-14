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
      showStatus={false}
    >
      {items?.map((item) => {
        return (
          <div
            className="slide"
            key={item}
            style={{
              width: '100%',
              aspectRatio: '1/1',
              borderRadius: '39px',
              overflow: 'hidden',
            }}
          >
            <img
              src={`${images.defalut_url}${item.imgPath}`}
              alt="명소 사진"
              style={{
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>
        );
      })}
    </Carousel>
  );
}
