import { Box, styled, Button, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WhiteBox from '../whiteBox/WhiteBox';
import MyMainApply from './MyMainApply';
import MyMainArticle from './MyMainArticle';
import MyMainLike from './MyMainLike';

export default function MyMain() {
  return (
    <>
      <Box sx={{ paddingY: '3%', paddingX: '3%' }}>
        <div>
          내가 지원한 모집 공고
          <IconButton>
            <ExpandMoreIcon />
          </IconButton>
          <hr />
          <WhiteBox cpn={<MyMainApply />}></WhiteBox>
        </div>
        <div>
          내가 관심있는 글
          <IconButton>
            <ExpandMoreIcon />
          </IconButton>
          <hr />
          <WhiteBox cpn={<MyMainLike />}></WhiteBox>
        </div>
        <div>
          내가 작성한 글
          <IconButton>
            <ExpandMoreIcon />
          </IconButton>
          <hr />
          <WhiteBox cpn={<MyMainArticle />}></WhiteBox>
        </div>
      </Box>
    </>
  );
}
