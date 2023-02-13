import { Box } from '@mui/system';
import ImageSlider from '../imageSlider/ImageSlider';

export default function GuestHouseContent({ guestHouse, images }) {
  return (
    <Box sx={{ p: '5%' }}>
      <ImageSlider items={images} />
      <h2 style={{ color: '#FF7600' }}>소개글</h2>
      <div dangerouslySetInnerHTML={{ __html: guestHouse?.introduction }} />
      <br />
    </Box>
  );
}
