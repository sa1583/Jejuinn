import { Box } from '@mui/system';
import { images } from '../../assets/images';

export default function MainThree() {
  return (
    <div
      style={{
        width: '100%',
        height: '92vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        // paddingTop: '170px',
        alignItems: 'center',
        backgroundColor: 'rgb(255 118 0 / 4%)',
      }}
    >
      <div style={{ paddingLeft: '45px' }}>
        <div
          style={{
            fontFamily: 'SBAggroL',
            fontSize: '50px',
            paddingBottom: '5px',
          }}
        >
          <span
            style={{
              fontFamily: 'SBAggroB',
              fontSize: '70px',
              color: '#FF7600',
            }}
          >
            제주인
          </span>
          이 뭐징?
        </div>
        <div
          style={{
            fontFamily: 'SBAggroL',
            fontSize: '35px',
            // paddingTop: '30px',
          }}
        >
          <span style={{ fontFamily: 'SBAggroM', color: '#FF7600' }}>
            제주도 게스트하우스 스탭
          </span>
          을 부르는 우리들만의 이름이에요!
        </div>
      </div>
      <div>
        <div>
          <Box
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img
              src={images.main_three}
              alt=""
              style={{ height: '400px' }}
            ></img>
            <div
              style={{
                fontFamily: 'GmarketSansBold',
                fontSize: '22px',
                color: '#FF7600',
              }}
            >
              <h1 style={{ marginTop: 0, marginBottom: 0 }}>jeju + inn </h1>
              <span
                style={{
                  fontFamily: 'GmarketSansLight',
                  fontSize: '35px',
                  color: 'black',
                }}
              >
                <strong>제주</strong>에 있는 나만의 <strong>숙소</strong>에서
              </span>
              <h1 style={{ marginBottom: 0 }}>jeju + 人 </h1>
              <span
                style={{
                  fontFamily: 'GmarketSansLight',
                  fontSize: '35px',
                  color: 'black',
                }}
              >
                <strong>제주 사람</strong>이 되어보아요!
              </span>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
}
