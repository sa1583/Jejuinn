import { Box } from '@mui/system';
import ImageSlider from '../imageSlider/ImageSlider';
import { v4 as uuidv4 } from 'uuid';
import GuestHouseReviewCreate from './GuestHouseReviewCreate';
import GuestHouseReviewList from './GuestHouseReviewList';
import WhiteBox from '../whiteBox/WhiteBox';

export default function GuestHouseContent({ guestHouse, images }) {
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
      <ImageSlider items={images} />
      <h2 style={{ color: '#FF7600' }}>소개글</h2>
      <p style={{ fontSize: '1.1rem' }}>{guestHouse?.introduction}</p>
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
