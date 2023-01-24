import { Box } from '@mui/system';
import { data } from '../../practiceApi/staffPickList';
import { v4 as uuidv4 } from 'uuid';
import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material';

export default function StaffPickList() {
  return (
    <Box sx={{ padding: '3vh' }}>
      <h2>
        <span style={{ color: '#FF7600' }}>{data.length}건</span>의 검색결과
      </h2>
      {/* <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2%',
        }}
      >
        {data.map((article) => {
          return (
            <div
              style={{
                width: '32%',
                marginBottom: '2vh',
                display: 'flex',
                flexDirection: 'column',
                // alignItems: 'center',
              }}
              key={uuidv4()}
            >
              <img
                src={article.img_url}
                alt=""
                style={{
                  width: '100%',
                  aspectRatio: '1/1.25',
                  borderRadius: '20px',
                  boxShadow: '1px 2px 10px 0px rgba(0,0,0,0.75)',
                }}
              />

              <h2 style={{ marginTop: '0.5rem' }}>{article.title}</h2>
            </div>
          );
        })}
      </Box> */}
      <Box sx={{ width: '100%', maxHeight: '60rem', overflowY: 'scroll' }}>
        <ImageList variant="masonry" cols={3} gap={8}>
          {data.map((item) => (
            <ImageListItem key={item.img_url}>
              <img
                src={`${item.img_url}?w=248&fit=crop&auto=format`}
                srcSet={`${item.img_url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
              />
              <ImageListItemBar title={item.title} />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Box>
  );
}
