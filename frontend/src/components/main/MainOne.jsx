import Box from '@mui/material/Box';
import SearchForm from '../../components/main/SearchForm';
import { images } from '../../assets/images';
import './Main.css';

export default function MainOne() {
  return (
    <div>
      <div
        style={{
          width: '100%',
          height: '92vh',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgb(255 118 0 / 4%)',
        }}
      >
        <Box
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: '40px',
          }}
        >
          <img src={images.main_one} style={{ height: '700px' }}></img>
          <Box sx={{ fontFamily: 'SBAggroB', marginRight: '30px' }}>
            <div style={{ fontSize: '30px', marginBottom: '5px' }}>
              반복되는 무료한 일상!
            </div>
            <div style={{ fontSize: '50px', color: '#FF7600' }}>
              제주도 게스트하우스 스탭
              <span style={{ color: 'black' }}>으로</span>
            </div>
            <div
              style={{
                fontSize: '50px',
                color: '#FF7600',
                marginBottom: '20px',
              }}
            >
              한달 살기
              <span style={{ color: 'black' }}>를 생각하고 있다면?</span>
            </div>
            <SearchForm />
          </Box>
        </Box>
        <br />
        <Box className="mouse">
          <div className="scroll-icon ex-1">
            <span className="wheel"></span>
          </div>
        </Box>
      </div>
    </div>
  );
}
