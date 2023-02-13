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
            paddingTop: '80px',
          }}
        >
          <img
            src={images.main_one2}
            alt=""
            style={{ height: '600px', marginLeft: '200px' }}
          ></img>
          <Box sx={{ fontFamily: 'SBAggroB' }}>
            <div
              style={{
                fontFamily: 'SBAggroM',
                fontSize: '25px',
                marginBottom: '5px',
              }}
            >
              반복되는 무료한 일상!
            </div>
            <div style={{ fontSize: '40px', color: '#FF7600' }}>
              제주도 게스트하우스 스탭
              <span style={{ fontFamily: 'SBAggroM', color: 'black' }}>
                으로
              </span>
            </div>
            <div
              style={{
                fontSize: '40px',
                color: '#FF7600',
                marginBottom: '20px',
              }}
            >
              한달 살기
              <span style={{ fontFamily: 'SBAggroM', color: 'black' }}>
                를 생각하고 있다면?
              </span>
            </div>
            <SearchForm />
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box className="mouse" sx={{ marginBottom: '10px' }}>
            <div className="scroll-icon ex-1">
              <span className="wheel"></span>
            </div>
          </Box>
          <div style={{ color: '#FF7600' }}>더 알아보기</div>
        </Box>
      </div>
    </div>
  );
}
