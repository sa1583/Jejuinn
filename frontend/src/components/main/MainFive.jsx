import { Box } from '@mui/system';
import { images } from '../../assets/images';

export default function MainFive() {
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
          backgroundColor: 'rgb(255 118 0 / 4%)',
        }}
      >
        <div
          style={{
            fontFamily: 'SBAggroM',
            fontSize: '50px',
            paddingBottom: '8px',
          }}
        >
          <span style={{ fontFamily: 'SBAggroM', color: '#FF7600' }}>
            제주인 생활&nbsp;
          </span>
          나랑 잘 맞을지 모르겠다면?
        </div>
        <div
          style={{
            fontFamily: 'SBAggroM',
            fontSize: '25px',
            paddingBottom: '30px',
          }}
        >
          이런 분들에게 추천해요!
        </div>
        <div
          style={{
            display: 'flex',
            fontFamily: 'SBAggroM',
            fontSize: '20px',
            color: '#FF7600',
          }}
        >
          <Box
            sx={{
              paddingBottom: 5,
              borderRadius: 3,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img src={images.stress} alt="" style={{ height: '350px' }}></img>
            <span>돈은 없지만</span>
            <span>여행은 하고 싶어!</span>
          </Box>
          <Box
            sx={{
              paddingBottom: 5,
              borderRadius: 3,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img src={images.home} alt="" style={{ height: '350px' }}></img>
            <span>일분 일초가 아까운 여행말고</span>
            <span>살아보는 여행을 원해요!</span>
          </Box>
          <Box
            sx={{
              paddingBottom: 5,
              borderRadius: 3,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img src={images.together} alt="" style={{ height: '350px' }}></img>
            <span>새로운 사람들과</span>
            <span>어울리는 걸 좋아해요!</span>
          </Box>
          <Box
            sx={{
              paddingBottom: 5,
              borderRadius: 3,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img src={images.free} alt="" style={{ height: '350px' }}></img>
            <span>새로운 시작 전 남는 기간</span>
            <span>새로운 경험을 해보고 싶어요!</span>
          </Box>
        </div>
      </div>
    </div>
  );
}
