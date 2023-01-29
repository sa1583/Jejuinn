import { Box } from '@mui/system';
import { data } from '../../practiceApi/staffPickList';
import { v4 as uuidv4 } from 'uuid';
import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
export default function WorkListBox() {
  // 결과 페이지의 컴포넌트 클릭하면 디테일 페이지로 이동
  const navigate = useNavigate();
  
  return (
    <Box 
    sx={{
      width: '100%',
      borderRadius: '39px',
      boxShadow: '0px 2px 15px 0px rgba(0,0,0,0.75)',
    }}>
    <Box sx={{ padding:'3vh'}}>


      <h2>
        <span style={{ color: '#FF7600' }}>{data.length}건</span>의 검색결과
      </h2>
      <Box sx={{ width: '100%', maxHeight: '60rem', overflowY: 'scroll' }}>
        <ImageList variant="masonry" cols={3} gap={8}>
          {data.map((item) => (
            <ImageListItem key={uuidv4()}>
              <img
                src={`${item.img_url}?w=248&fit=crop&auto=format`}
                srcSet={`${item.img_url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
                onClick={() => navigate(`/worklist/detail/${item.id}`)}
              />
              <ImageListItemBar title={item.title} />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Box>

      </Box>
  );
}