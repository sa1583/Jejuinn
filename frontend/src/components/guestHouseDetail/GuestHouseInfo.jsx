import { Box } from '@mui/system';
import { v4 as uuidv4 } from 'uuid';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';

export default function GuestHouseInfo() {
  const hashTags = ['파티', '오션뷰', '조식', '서핑', '친목'];

  return (
    <div style={{ padding: '3vh 3vh' }}>
      <Box
        sx={{
          justifyContent: 'center',
          display: 'inline-flex',
          flexWrap: 'wrap',
          paddingBottom: '20px',
        }}
      >
        {hashTags.map((hashTag) => {
          return (
            <Box
              key={uuidv4()}
              sx={{
                display: 'inline',
                padding: '5px 10px',
                margin: '5px',
                color: 'white',
                backgroundColor: '#FF7600',
                borderRadius: '39px',
                boxShadow: '0px 2px 74px 2px rgba(0, 0, 0, 0.1)',
              }}
            >
              # {hashTag}
            </Box>
          );
        })}
      </Box>
      <br />

      <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
        <PhoneAndroidIcon sx={{ color: '#FF7600', padding: '5px' }} />
        <p>010-1234-1234</p>
      </Box>
      <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
        <EmailIcon sx={{ color: '#FF7600', padding: '5px' }} />
        <p>aldkjfl@gmail.com</p>
      </Box>
      <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
        <HomeIcon sx={{ color: '#FF7600', padding: '5px' }} />
        <p>제주특별자치도 제주시 구좌읍 행원로</p>
      </Box>
      <h3 style={{ color: '#FF7600' }}>현재 모집 공고 리스트</h3>
      <p>다은이꺼 가져오면 되지 않을까...</p>
    </div>
  );
}
