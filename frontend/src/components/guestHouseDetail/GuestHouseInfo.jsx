import { Box } from '@mui/system';
import { v4 as uuidv4 } from 'uuid';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';

export default function GuestHouseInfo({ guestHouse }) {
  const hashTags = guestHouse?.guestHouseTypes;

  return (
    <div style={{ display: 'block', padding: '3vh 3vh', marginBottom: '3vh' }}>
      <p
        style={{
          color: '#FF7600',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          marginTop: 0,
          marginLeft: '5px',
          marginBottom: '10px',
        }}
      >
        기본정보
      </p>
      <Box
        sx={{
          width: '100%',
          display: 'inline-flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          paddingBottom: '5px',
        }}
      >
        {hashTags?.map((hashTag) => {
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
        <PhoneAndroidIcon sx={{ color: '#FF7600', paddingRight: '15px' }} />
        <p style={{ fontSize: '1.2rem' }}>{guestHouse?.phone}</p>
      </Box>
      <Box sx={{ display: 'flex', direction: 'row', alignItems: 'center' }}>
        <EmailIcon sx={{ color: '#FF7600', paddingRight: '15px' }} />
        <p style={{ fontSize: '1.2rem', margin: 0 }}>{guestHouse?.email}</p>
      </Box>
      <Box sx={{ display: 'flex', direction: 'row', alignItems: 'flex-start' }}>
        <HomeIcon
          sx={{
            color: '#FF7600',
            paddingTop: '19.200px',
            paddingRight: '15px',
          }}
        />
        <p style={{ fontSize: '1.2rem', marginBottom: '10px' }}>
          {guestHouse?.address}
        </p>
      </Box>
    </div>
  );
}
