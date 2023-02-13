import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { images } from '../../assets/images';
import './Main.css';

export default function MainTwo() {
  const navigate = useNavigate();

  const goWorkList = () => {
    navigate(`/worklist`);
  };

  const goNextPage = () => {
    navigate('#sectionTwo');
  };

  return (
    <div>
      <div
        style={{
          width: '100%',
          height: '92vh',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#FF7600',
        }}
      >
        <Box
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: '60px',
            marginLeft: '130px',
          }}
        >
          <div
            style={{
              fontFamily: 'GmarketSansLight',
              fontSize: '4.4rem',
              color: 'white',
              paddingBottom: '8px',
            }}
          >
            <div style={{ height: '90px' }}>야, 너두</div>
            <div style={{ height: '90px' }}>할 수 있어</div>
            <div
              style={{
                marginTop: '10px',
                fontFamily: 'GmarketSansBold',
                fontSize: '7rem',
              }}
            >
              제주인
            </div>
            <Button
              onClick={goWorkList}
              sx={{
                width: '20vh',
                height: '6vh',
                background: '#FFFFFF',
                borderRadius: '5px',
                color: '#FF7600',
                '&:hover': {
                  background: '#FFFFFF',
                },
                border: 'none',
                fontSize: '1.8vh',
                marginTop: '2vh',
                fontWeight: 'Bold',
              }}
            >
              제주인 되어보기 &nbsp;&gt;
            </Button>
          </div>
          <img
            src={images.main_two2}
            alt=""
            style={{ height: '600px', marginLeft: '50px' }}
          ></img>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: '30px',
          }}
        >
          <Box
            className="mouse"
            sx={{ marginBottom: '10px' }}
            onClick={goNextPage}
          >
            <div className="scroll-icon ex-1">
              <span className="wheel"></span>
            </div>
          </Box>
          <div style={{ color: 'white' }}>더 알아보기</div>
        </Box>
      </div>
    </div>
  );
}
