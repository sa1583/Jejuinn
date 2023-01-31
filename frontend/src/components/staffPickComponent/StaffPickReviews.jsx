import { Box } from '@mui/system';
import { ImageList, ImageListItem } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import { useNavigate } from 'react-router-dom';
export default function StaffPickReviews({
  spotReviews,
  selectedSpot,
  deleteSelected,
}) {
  const navigate = useNavigate();
  const goDetail = (id) => {
    navigate(`detail/${id}`);
  };
  return (
    <Box sx={{ padding: '3vh' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h2>
          <span style={{ color: '#FF7600' }}>{selectedSpot?.name}</span>의 리뷰
        </h2>

        <ArrowCircleLeftOutlinedIcon
          onClick={deleteSelected}
          sx={{ cursor: 'pointer' }}
          fontSize="large"
        />
      </Box>
      <Box sx={{ width: '100%', maxHeight: '60rem', overflowY: 'scroll' }}>
        <ImageList variant="masonry" cols={4} gap={8}>
          {spotReviews.map((item) => (
            <ImageListItem key={uuidv4()}>
              <img
                src={`${item.img_url}?w=248&fit=crop&auto=format`}
                srcSet={`${item.img_url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt="리뷰"
                loading="lazy"
                uid={item.uid}
                onClick={() => goDetail(item.uid)}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Box>
  );
}
