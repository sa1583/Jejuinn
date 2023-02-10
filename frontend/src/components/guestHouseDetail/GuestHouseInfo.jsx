import { Box } from '@mui/system';
import { v4 as uuidv4 } from 'uuid';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';

export default function GuestHouseInfo({ guestHouse }) {
  const hashTags = ['파티', '오션뷰', '조식', '서핑', '친목'];

  return (
    <div style={{ display: 'block', padding: '3vh 3vh', marginBottom: '3vh' }}>
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

      <Box sx={{ display: 'flex', direction: 'row', alignItems: 'center' }}>
        <PhoneAndroidIcon sx={{ color: '#FF7600', padding: '5px' }} />
        <p>{guestHouse?.phone}</p>
      </Box>
      <Box sx={{ display: 'flex', direction: 'row', alignItems: 'center' }}>
        <EmailIcon sx={{ color: '#FF7600', padding: '5px' }} />
        <p>{guestHouse?.email}</p>
      </Box>
      <Box sx={{ display: 'flex', direction: 'row', alignItems: 'center' }}>
        <HomeIcon sx={{ color: '#FF7600', padding: '5px' }} />
        <p>{guestHouse?.address}</p>
      </Box>
    </div>
  );
}
