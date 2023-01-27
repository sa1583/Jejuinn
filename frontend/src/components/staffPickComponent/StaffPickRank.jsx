import { Box } from '@mui/system';
import { data } from '../../practiceApi/staffPickList';
import { v4 as uuidv4 } from 'uuid';

export default function StaffPickRank() {
  return (
    <Box sx={{ padding: '3vh', maxHeight: '60rem' }}>
      <h2>
        <span style={{ color: '#FF7600' }}>제주도</span> 명소 TOP10
      </h2>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          alignItems: 'center',
        }}
      >
        {/* 여기 나중에 api로 받아오면 10개 제한둔거 풀어야함 */}
        {data.slice(0, 10).map((article) => {
          return (
            <Box
              sx={{
                width: '100%',
                borderRadius: '39px',
                boxShadow: '0px 2px 15px 0px rgba(0,0,0,0.75)',
                display: 'flex',
                height: '4rem',
                alignItems: 'center',
              }}
              key={uuidv4()}
            >
              <img
                src={article.img_url}
                alt=""
                style={{
                  height: '90%',
                  aspectRatio: '1/1',
                  marginLeft: '0.3rem',
                  borderRadius: '39px',
                  marginRight: '1rem',
                }}
              />
              <p>{article.title}</p>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
