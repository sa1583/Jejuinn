import { Avatar } from '@mui/material';
import { Box } from '@mui/system';
import { deepOrange } from '@mui/material/colors';
import ImageSlider from '../imageSlider/ImageSlider';
import { v4 as uuidv4 } from 'uuid';

export default function GuestHouseContent() {
  const images = [
    'https://cdn.pixabay.com/photo/2021/08/23/01/03/cubic-house-6566412_960_720.jpg',
    'https://cdn.pixabay.com/photo/2021/08/08/14/16/road-6531031__340.jpg',
    'https://cdn.pixabay.com/photo/2014/07/10/17/18/large-home-389271_960_720.jpg',
    'https://cdn.pixabay.com/photo/2016/11/18/17/46/house-1836070__340.jpg',
    'https://cdn.pixabay.com/photo/2017/03/28/12/10/chairs-2181947__340.jpg',
  ];

  return (
    <Box sx={{ padding: '5%' }}>
      <ImageSlider images={images} />
      <h3 style={{ color: '#FF7600' }}>게스트하우스를 소개합니다</h3>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga dicta
        repellat adipisci veniam excepturi hic ea cupiditate itaque eum
        obcaecati saepe odit assumenda, voluptatum explicabo earum mollitia
        deserunt eveniet quidem?
      </p>
    </Box>
  );
}
