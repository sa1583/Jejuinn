import { Box } from '@mui/system';
import { images } from '../../assets/images';

export default function MainFour() {
  return (
    <div>
      <div
        style={{
          width: '100%',
          height: '92vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
        }}
      >
        <div
          style={{
            fontFamily: 'SBAggroM',
            fontSize: '50px',
            paddingBottom: '8px',
          }}
        >
          꼭
          <span style={{ fontFamily: 'SBAggroM', color: '#FF7600' }}>
            {' '}
            제주
          </span>
          여야만 하는 이유!
        </div>
        <div
          style={{
            fontFamily: 'SBAggroM',
            fontSize: '25px',
            paddingBottom: '30px',
          }}
        >
          제주도 게스트하우스만의{' '}
          <span style={{ fontFamily: 'SBAggroM', color: '#FF7600' }}>
            특별한 문화
          </span>
          를 소개합니다
        </div>
        <div
          style={{
            display: 'flex',
            fontFamily: 'SBAggroM',
          }}
        >
          <Box
            sx={{
              paddingBottom: 5,
              margin: 2,
              borderRadius: 3,
              backgroundColor: 'white',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '20px',
            }}
            boxShadow="rgba(0, 0, 0, 0.15) 0px 2px 8px"
          >
            <img src={images.clean} alt="" style={{ height: '380px' }}></img>
            <span>게스트하우스의</span>
            <span>여러가지 일손을 돕고</span>
          </Box>
          <Box
            sx={{
              paddingBottom: 5,
              margin: 2,
              borderRadius: 3,
              backgroundColor: 'white',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '20px',
            }}
            boxShadow="rgba(0, 0, 0, 0.15) 0px 2px 8px"
          >
            <img src={images.home} alt="" style={{ height: '380px' }}></img>
            <span>무료로 숙식을</span>
            <span>제공받을 수 있어요!</span>
          </Box>
        </div>
        <p style={{ paddingTop: '20px', color: 'grey' }}>
          * 경우에 따라 소액의 급여를 받고 하는 경우도 있어요!
        </p>
      </div>
    </div>
  );
}
