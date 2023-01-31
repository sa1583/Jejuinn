import { Box } from '@mui/system';
import ImageSlider from '../imageSlider/ImageSlider';
import { v4 as uuidv4 } from 'uuid';
import GuestHouseReviewCreate from './GuestHouseReviewCreate';
import GuestHouseReviewList from './GuestHouseReviewList';
import WhiteBox from '../whiteBox/WhiteBox';

export default function GuestHouseContent() {
  const images = [
    'https://cdn.pixabay.com/photo/2021/08/23/01/03/cubic-house-6566412_960_720.jpg',
    'https://cdn.pixabay.com/photo/2021/08/08/14/16/road-6531031__340.jpg',
    'https://cdn.pixabay.com/photo/2014/07/10/17/18/large-home-389271_960_720.jpg',
    'https://cdn.pixabay.com/photo/2016/11/18/17/46/house-1836070__340.jpg',
    'https://cdn.pixabay.com/photo/2017/03/28/12/10/chairs-2181947__340.jpg',
  ];
  const comments = [
    {
      img: 'Jin',
      name: 'LeeYeJin',
      comment: '사장님이 넘 친절하세요~~',
    },
    {
      img: 'Min',
      name: 'JangJeongMin',
      comment: '숙소 뷰가 끝내줘요~~~',
    },
  ];

  return (
    <Box sx={{ padding: '5%' }}>
      <ImageSlider images={images} />
      <h2 style={{ color: '#FF7600' }}>소개글</h2>
      <p style={{ fontSize: '1.1rem' }}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga dicta
        repellat adipisci veniam excepturi hic ea cupiditate itaque eum
        obcaecati saepe odit assumenda, voluptatum explicabo earum mollitia
        deserunt eveniet quidem? Lorem ipsum dolor, sit amet consectetur
        adipisicing elit. Quibusdam placeat maxime maiores nihil cumque optio
        beatae consequuntur ratione ducimus, rerum, iusto et doloribus, natus
        earum repellat sit expedita velit excepturi.
      </p>
      <br />

      <h2 style={{ color: '#FF7600' }}>리뷰</h2>
      <WhiteBox cpn={<GuestHouseReviewCreate />} />
      <div
        style={{
          width: '98%',
          borderBottom: '1px solid #DEDEDE',
          margin: '20px auto',
          borderRadius: '50px',
        }}
      ></div>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {comments.map((comment) => {
          return (
            <WhiteBox
              key={uuidv4()}
              cpn={<GuestHouseReviewList comment={comment} />}
            />
          );
        })}
      </Box>
    </Box>
  );
}
